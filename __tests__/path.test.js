import { Path } from '../path'
import { GridUtils } from '../utils/grid-utils'

describe('Path module', () => {
  describe('isPerpendicular', () => {
    it('returns true for perpendicular directions', () => {
      expect(Path.isPerpendicular([1, 0], [0, 1])).toBe(true)
      expect(Path.isPerpendicular([0, 1], [-1, 0])).toBe(true)
    })
    it('returns false for non-perpendicular directions', () => {
      expect(Path.isPerpendicular([1, 0], [-1, 0])).toBe(false)
      expect(Path.isPerpendicular([0, 1], [0, -1])).toBe(false)
    })
  })
  describe('handleStartPosition', () => {
    const grid = [
      [null, '+', '-', 'L', '-', '+', null, null],
      [null, '|', null, null, '+', 'A', '-', '+'],
      ['@', 'B', '+', null, '+', '+', null, 'H'],
      [null, '+', '+', null, null, null, null, 'x'],
    ]
    it('returns the only valid neighbor(s)', () => {
      const validDirections = GridUtils.findValidDirections([2, 0], grid)
      const result = Path.handleStartPosition([2, 0], grid)
      expect(validDirections).toContainEqual(result)
    })

    it('should match the valid valid neighbor(s) for the starting point', () => {
      const validDirections = GridUtils.findValidDirections([2, 1], grid)
      const result = Path.handleStartPosition([2, 0], grid)
      expect(validDirections).not.toContainEqual(result)
    })

    it('should not match any valid neighbor(s) for starting the point', () => {
      const result = Path.handleStartPosition([0, 0], [['@', null]])
      expect(result).toBeNull
    })

    it('should detect multiple starting paths and throw', () => {
      const grid = [['x', '-', 'B', '-', '@', '-', 'A', '-', '-']]
      expect(() => Path.handleStartPosition([0, 4], grid)).toThrow(
        'Multiple starting paths.'
      )
    })
  })
  describe('handleLetterPosition', () => {
    it('should track letters and return the next point straight ahead in the current direction', () => {
      const currentPoint = [1, 1]
      const nextPoints = [[1, 2]]
      const currentDirection = [0, 1]
      const visited = [
        [1, 0],
        [1, 1],
      ]
      const letters = []
      const currentChar = 'A'

      const result = Path.handleLetterPosition(
        currentPoint,
        nextPoints,
        currentDirection,
        visited,
        letters,
        currentChar
      )
      expect(result).toEqual([1, 2])
      expect(letters).toContainEqual({ letter: 'A', point: [1, 1] })
    })
  })
  describe('handleTurnPosition', () => {
    // Mock GridUtils.subtractPoints since we're not testing its implementation
    beforeEach(() => {
      jest
        .spyOn(GridUtils, 'subtractPoints')
        .mockImplementation((p1, p2) => [p2[0] - p1[0], p2[1] - p1[1]])
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should handle a valid 90-degree turn', () => {
      // Setup
      const currentPoint = [1, 1]
      const nextPoints = [
        [1, 2],
        [2, 1],
      ] // right and down options
      const currentDirection = [0, 1] // moving right
      const visited = [
        [1, 0],
        [1, 1],
      ] // came from left

      // Test turning down from moving right
      const result = Path.handleTurnPosition(
        currentPoint,
        nextPoints,
        currentDirection,
        visited
      )

      // Expect to turn down since we were currently moving right
      expect(result).toEqual([2, 1])
    })

    it('should throw "Fake turn" error when no perpendicular turns available', () => {
      const currentPoint = [1, 1]
      const nextPoints = [[1, 2]] // only straight ahead available
      const currentDirection = [0, 1] // moving right
      const visited = [
        [1, 0],
        [1, 1],
      ] // came from left

      expect(() => {
        Path.handleTurnPosition(currentPoint, nextPoints, currentDirection, visited)
      }).toThrow('Fake turn')
    })

    it('should throw "Fork in path" error when multiple valid turns exist', () => {
      const currentPoint = [1, 1]
      const nextPoints = [
        [1, 2],
        [2, 1],
        [0, 1],
      ] // three possible directions
      const currentDirection = [0, 1] // moving right
      const visited = [
        [1, 0],
        [1, 1],
      ] // came from left

      expect(() => {
        Path.handleTurnPosition(currentPoint, nextPoints, currentDirection, visited)
      }).toThrow('Fork in path')
    })
  })
  describe('handleRegularPosition', () => {
    it('should continue straight ahead if possible', () => {
      const currentPoint = [1, 1]
      const nextPoints = [
        [2, 1],
        [1, 2],
        [0, 1],
      ] // Possible next points
      const currentDirection = [1, 0] // Moving down
      const visited = [
        [1, 0],
        [1, 1],
      ] // Previously visited points

      const result = Path.handleRegularPosition(
        currentPoint,
        nextPoints,
        currentDirection,
        visited
      )
      expect(result).toEqual([2, 1]) // Should continue straight
    })

    it('should avoid the previous point and pick a valid alternative', () => {
      const currentPoint = [1, 1]
      const nextPoints = [
        [1, 0],
        [1, 2],
      ] // Possible next points
      const currentDirection = [0, 1] // Moving right
      const visited = [
        [1, 0],
        [1, 1],
      ] // Previously visited points

      const result = Path.handleRegularPosition(
        currentPoint,
        nextPoints,
        currentDirection,
        visited
      )
      expect(result).toEqual([1, 2]) // Should avoid the previous point and go right
    })

    it('should return undefined if no valid moves are available', () => {
      const currentPoint = [1, 1]
      const nextPoints = [] // No available next points
      const currentDirection = [0, 1] // Moving right
      const visited = [
        [1, 0],
        [1, 1],
      ] // Previously visited points

      const result = Path.handleRegularPosition(
        currentPoint,
        nextPoints,
        currentDirection,
        visited
      )
      expect(result).toBeUndefined() // No moves available
    })
  })
})
