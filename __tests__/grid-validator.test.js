import { GridValidator } from '../utils/grid-validator.js'
import { GridUtils } from '../utils/grid-utils.js'

describe('GridValidator', () => {
  describe('validateGridStructure', () => {
    it('should throw an error for a non-array grid', () => {
      expect(() => GridValidator.validateGridStructure(null)).toThrow(
        GridValidator.ERROR_MESSAGES.INVALID_GRID
      )
    })

    it('should throw an error for an empty grid', () => {
      expect(() => GridValidator.validateGridStructure([])).toThrow(
        GridValidator.ERROR_MESSAGES.INVALID_GRID
      )
    })

    it('should throw an error for a grid with uneven rows', () => {
      const grid = [['@', '-'], ['x']]
      expect(() => GridValidator.validateGridStructure(grid)).toThrow(
        GridValidator.ERROR_MESSAGES.UNEVEN_ROWS
      )
    })

    it('should pass for a well-formed grid', () => {
      const grid = [
        ['@', '-', 'x'],
        ['-', '-', '-'],
      ]
      expect(() => GridValidator.validateGridStructure(grid)).not.toThrow()
    })
  })

  describe('validateSpecialChar', () => {
    beforeEach(() => {
      jest.spyOn(GridUtils, 'findPoints')
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should throw an error if the special character is missing', () => {
      const grid = [
        ['-', '-'],
        ['-', '-'],
      ]
      jest.spyOn(GridUtils, 'findPoints').mockReturnValue([])

      expect(() =>
        GridValidator.validateSpecialChar(grid, '@', {
          missingError: GridValidator.ERROR_MESSAGES.NO_START,
          multipleError: GridValidator.ERROR_MESSAGES.MULTIPLE_STARTS,
        })
      ).toThrow(GridValidator.ERROR_MESSAGES.NO_START)
    })

    it('should throw an error if the special character is duplicated', () => {
      const grid = [
        ['@', '-'],
        ['@', '-'],
      ]
      jest.spyOn(GridUtils, 'findPoints').mockReturnValue([
        [0, 0],
        [1, 0],
      ])

      expect(() =>
        GridValidator.validateSpecialChar(grid, '@', {
          missingError: GridValidator.ERROR_MESSAGES.NO_START,
          multipleError: GridValidator.ERROR_MESSAGES.MULTIPLE_STARTS,
        })
      ).toThrow(GridValidator.ERROR_MESSAGES.MULTIPLE_STARTS)
    })

    it('should return the correct point if the character is present and unique', () => {
      const grid = [
        ['@', '-'],
        ['-', '-'],
      ]
      const point = [0, 0]
      jest.spyOn(GridUtils, 'findPoints').mockReturnValue([point])

      const result = GridValidator.validateSpecialChar(grid, '@', {
        missingError: GridValidator.ERROR_MESSAGES.NO_START,
        multipleError: GridValidator.ERROR_MESSAGES.MULTIPLE_STARTS,
      })

      expect(result).toEqual(point)
    })
  })

  describe('validateEndpoints', () => {
    it('should throw an error if start or end points are invalid', () => {
      jest.spyOn(GridValidator, 'validateSpecialChar').mockImplementation(() => {
        throw new Error(GridValidator.ERROR_MESSAGES.NO_START)
      })

      const grid = [
        ['-', '-', '-'],
        ['-', '-', '-'],
      ]
      expect(() => GridValidator.validateEndpoints(grid)).toThrow(
        GridValidator.ERROR_MESSAGES.NO_START
      )
    })

    it('should return validated start and end points if valid', () => {
      const startPoint = [0, 0]
      const endPoint = [1, 2]
      jest
        .spyOn(GridValidator, 'validateSpecialChar')
        .mockImplementation((_, char) => (char === '@' ? startPoint : endPoint))

      const grid = [
        ['@', '-', '-'],
        ['-', '-', 'x'],
      ]
      const result = GridValidator.validateEndpoints(grid)

      expect(result).toEqual({ startPoint, endPoint })
    })
  })

  describe('validateGrid', () => {
    it('should throw an error if the grid structure is invalid', () => {
      jest.spyOn(GridValidator, 'validateGridStructure').mockImplementation(() => {
        throw new Error(GridValidator.ERROR_MESSAGES.INVALID_GRID)
      })

      const grid = []
      expect(() => GridValidator.validateGrid(grid)).toThrow(
        GridValidator.ERROR_MESSAGES.INVALID_GRID
      )
    })

    it('should return validation result for a valid grid', () => {
      const grid = [
        ['@', '-', '+'],
        [null, null, 'x'],
      ]
      jest.spyOn(GridValidator, 'validateGridStructure').mockImplementation(() => {})
      jest.spyOn(GridValidator, 'validateEndpoints').mockReturnValue({
        startPoint: [0, 0],
        endPoint: [1, 2],
      })

      const result = GridValidator.validateGrid(grid)
      expect(result).toEqual({
        isValid: true,
        startPoint: [0, 0],
        endPoint: [1, 2],
        dimensions: {
          rows: 2,
          cols: 3,
        },
      })
    })
  })

  describe('isValidGrid', () => {
    it('should return validation result if the grid is valid', () => {
      const grid = [
        ['@', '-', '+'],
        [null, null, 'x'],
      ]
      jest.spyOn(GridValidator, 'validateGrid').mockReturnValue({
        isValid: true,
        startPoint: [0, 0],
        endPoint: [1, 2],
        dimensions: {
          rows: 2,
          cols: 3,
        },
      })

      const result = GridValidator.isValidGrid(grid)
      expect(result).toEqual({
        isValid: true,
        result: {
          isValid: true,
          startPoint: [0, 0],
          endPoint: [1, 2],
          dimensions: {
            rows: 2,
            cols: 3,
          },
        },
        error: null,
      })
    })

    it('should return error message if the grid is invalid', () => {
      jest.spyOn(GridValidator, 'validateGrid').mockImplementation(() => {
        throw new Error(GridValidator.ERROR_MESSAGES.INVALID_GRID)
      })

      const grid = []
      const result = GridValidator.isValidGrid(grid)

      expect(result).toEqual({
        isValid: false,
        result: null,
        error: GridValidator.ERROR_MESSAGES.INVALID_GRID,
      })
    })
  })
})
