/**
 * @typedef {[number, number]} Point - A point in 2D space represented as [row, col]
 * @typedef {Array<Array<string|null>>} Grid - 2D grid of characters or null values
 * @typedef {Object} GridPoint
 * @property {Point} location - The location of the point in the grid
 * @property {string} char - The charcter at this location
 * @typedef {Object} Direction
 * @property {number} row - Row offset
 * @property {number} col - Column offset
 * @property {string} name - Direction name
 */

export const GridUtils = {
  /** @type {Direction[]} */
  DIRECTIONS: [
    { row: -1, col: 0, name: 'up' },
    { row: 1, col: 0, name: 'down' },
    { row: 0, col: -1, name: 'left' },
    { row: 0, col: 1, name: 'right' },
  ],

  /**
   * Checks if a point is within the grid boundaries
   * @param {Point} point - The point to check
   * @param {Grid} grid - The grid
   * @returns {boolean} True if the point is within bounds
   */
  isInBounds([row, col], grid) {
    return row >= 0 && col >= 0 && row < grid.length && col < grid[row].length
  },

  /**
 * Checks if a point contains a valid character.
 * @param {Point} point - The point to check
 * @param {Grid} grid - The grid
 * @returns {boolean} True if the point contains a valid character
 */
  isValidCell([row, col], grid) {
    // Define the valid characters
    const validChars = /^[A-Zx+\-|@]$/;

    // Check bounds and character validity
    return (
      this.isInBounds([row, col], grid) &&
      grid[row][col] !== null &&
      validChars.test(grid[row][col])
    );
  },

  /**
   * Finds all points in the grid matching a specific character.
   * @param {string} char - The character to search for
   * @param {Grid} grid - The grid to search in
   * @returns {GridPoint[]} List of points with their locations and characters
   */
  findPoints(char, grid) {
    const points = []

    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === char) {
          points.push({
            location: [rowIndex, colIndex],
            char,
          })
        }
      })
    })

    return points
  },

  /**
   * Adds two points together
   * @param {Point} p1 - The first point
   * @param {Point} p2 - The second point
   * @returns {Point} The resulting point
   */
  addPoints([x1, y1], [x2, y2]) {
    return [x1 + x2, y1 + y2]
  },

  /**
   * Subtracts the second point from the first
   * @param {Point} p1 - The first point
   * @param {Point} p2 - The second point
   * @returns {Point} The resulting point
   */
  subtractPoints([x1, y1], [x2, y2]) {
    return [x2 - x1, y2 - y1]
  },

  /**
   * Gets the next point in a given direction
   * @param {Point} point - The current point
   * @param {Direction} direction - The direction to move
   * @returns {Point} The next point
   */
  getNextPoint([row, col], { row: dr, col: dc }) {
    return [row + dr, col + dc]
  },

  /**
   * Finds all valid directions from a given point in the grid.
   * @param {Point} point - The current point
   * @param {Grid} grid - The grid
   * @returns {Point[]} List of valid next points
   */
  findValidDirections(point, grid) {
    return this.DIRECTIONS.map((direction) => this.getNextPoint(point, direction)).filter(
      (nextPoint) => this.isValidCell(nextPoint, grid)
    )
  },

  /**
   * Gets the character at a specific point in the grid
   * @param {Point} point - The point to check
   * @param {Grid} grid - The grid
   * @returns {string|null} The character at the point or null if invalid
   */
  getCharacterAt([row, col], grid) {
    return this.isInBounds([row, col], grid) ? grid[row][col] : null
  },
}