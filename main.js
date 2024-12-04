import { GridValidator } from './utils/grid-validator.js'
import { Path } from './path.js'

/**
 * @typedef {import('./utils/grid-utils').Grid} Grid
 * @typedef {import('./utils/grid-utils').Point} Point
 */

/**
 * @typedef {Object} TestResult
 * @property {boolean} success - Whether the test succeeded
 * @property {Point[]} [path] - The found path (if successful)
 * @property {string} [error] - Error message (if failed)
 */

export const GridTester = {
  /**
   * Tests a single grid and returns detailed results
   * @param {Grid} grid - The grid to test
   * @param {string} gridName - Name of the grid for reporting
   * @returns {TestResult} The test results
   */
  testGrid(grid, gridName) {
    try {
      // Validate start and end points
      GridValidator.validateEndpoints(grid)
      // Find path if validation succeeds
      const result = Path.findPath(GridValidator.SPECIAL_CHARS.START, grid)

      return {
        success: true,
        path: result,
        error: null,
        gridName,
      }
    } catch (error) {
      return {
        success: false,
        path: null,
        error: error.message,
        gridName,
      }
    }
  },
}