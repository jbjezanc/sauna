import { GridUtils } from '../utils/grid-utils'

describe('GridUtils module', () => {
  describe('GridUtils.isInBounds', () => {
    const grid = [
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      [null, null, null, null, null, null, null, null, '|'],
      ['x', '-', 'B', '-', '+', null, null, null, 'C'],
      [null, null, null, null, '|', null, null, null, '|'],
      [null, null, null, null, '+', '-', '-', '-', '+'],
    ]

    it('should return true for a point within bounds', () => {
      expect(GridUtils.isInBounds([0, 1], grid)).toBe(true)
    })
    it('should return false for point(s) out of bounds: [-1, 0] (row out of bounds)', () => {
      expect(GridUtils.isInBounds([-1, 0], grid)).toBe(false)
    })
    it('should return false for point(s) out of bounds: [0, -1] (column out of bounds)', () => {
      expect(GridUtils.isInBounds([0, -1], grid)).toBe(false)
    })
    it('should return false for point(s) out of bounds: [10, 0] (row out of bounds)', () => {
      expect(GridUtils.isInBounds([10, 0], grid)).toBe(false)
    })
    it('should return false for point(s) out of bounds: [0, 10] (column out of bounds)', () => {
      expect(GridUtils.isInBounds([0, 10], grid)).toBe(false)
    })
  })

  describe('GridUtils.isValidCell', () => {
    const grid = [
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      [null, null, null, null, null, null, null, null, '|'],
      ['x', '-', 'B', '-', '+', null, null, null, 'C'],
      [null, null, null, null, '|', null, null, null, '|'],
      [null, null, null, null, '+', '-', '-', '-', '+'],
    ]
    it('should check if a point contains a valid character, and not being null', () => {
      expect(GridUtils.isValidCell([0, 0], grid)).toBe(true)
    })

    it('should check if a point is invalid character, i.e. null', () => {
      expect(GridUtils.isValidCell([1, 0], grid)).toBe(false)
    })
  })

  describe('GridUtils.findPoints', () => {
    const grid = [
      [null, '@', '-', '-', 'A', '-', '-', 'x'],
      [null, null, null, null, null, null, null, null],
      ['x', '-', 'B', '-', '+', null, null, null],
      [null, null, null, null, '|', null, null, null],
      [null, null, null, null, '@', null, null, null],
    ]

    it('should find all points matching the character', () => {
      expect(GridUtils.findPoints('@', grid)).toEqual([
        { location: [0, 1], char: '@' },
        { location: [4, 4], char: '@' },
      ])
    })

    it('should return an empty array if no points match', () => {
      expect(GridUtils.findPoints('C', grid)).toEqual([])
    })
  })

  describe('GridUtils.addPoints', () => {
    it('should add two points correctly', () => {
      expect(GridUtils.addPoints([1, 2], [3, 4])).toEqual([4, 6])
    })
  })

  describe('GridUtils.subtractPoints', () => {
    it('should subtract two points correctly', () => {
      expect(GridUtils.subtractPoints([1, 2], [3, 4])).toEqual([2, 2])
    })
  })

  describe('GridUtils.getNextPoint', () => {
    it('should return the correct next point based on the movement to [-1, 0] (up)', () => {
      expect(GridUtils.getNextPoint([1, 1], { row: -1, col: 0 })).toEqual([0, 1])
    })
    // TODO: Check this
    it('should return the correct next point based on the movement to [1, 1] (down/right)', () => {
      expect(GridUtils.getNextPoint([1, 1], { row: 1, col: 1 })).toEqual([2, 2])
    })
  })

  describe('GridUtils.findValidDirections', () => {
    const grid = [
      ['@', '-', '-', 'A', '-', '+', null, null],
      [null, null, null, null, null, '|', null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, 'B', '-', 'x'],
    ]

    it('should return all valid directions from a point', () => {
      expect(GridUtils.findValidDirections([0, 3], grid)).toEqual([
        [0, 2],
        [0, 4],
      ])
    })
  })

  describe('GridUtils.getCharacterAt', () => {
    const grid = [
      ['A', 'B', 'C'],
      [null, 'E', 'D'],
    ]

    it('should return the character at a valid point', () => {
      expect(GridUtils.getCharacterAt([0, 0], grid)).toBe('A')
    })

    it('should return null for an invalid point', () => {
      expect(GridUtils.getCharacterAt([1, 0], grid)).toBeNull()
    })

    it('should return null for a point out of the bounds', () => {
      expect(GridUtils.getCharacterAt([2, 0], grid)).toBeNull()
    })
  })
})
