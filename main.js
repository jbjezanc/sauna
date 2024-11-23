import { GridValidator } from './utils/grid-validator.js'
import { Path } from './path.js'
// prettier-ignore
import { 
  G1, G2, G3, G4, G5, G6, G7, G8, G9, G10, 
  G11, G12a, G12b, G12c, G13, G14a, G14b, G15, G16, G17 
} from './grids.js';

/**
 * @typedef {import('./utils/grid-utils').Grid} Grid
 * @typedef {import('./utils/grid-utils').Point} Point
 */

/**
 * @typedef {Object} TestResult
 * @property {boolean} success - Whether the test succeeded
 * @property {Point[]} [path] - The found path (if successful)
 * @property {string} [error] - Error message (if failed)
 * @property {Object} [validationDetails] - Additional validation details
 */

const GridTester = {
  /**
   * Tests a single grid and returns detailed results
   * @param {Grid} grid - The grid to test
   * @param {string} gridName - Name of the grid for reporting
   * @returns {TestResult} The test results
   */
  testGrid(grid, gridName) {
    console.log(`\n✜ Testing Grid: ${gridName}`)
    console.log('-'.repeat(50))

    try {
      // Validate grid structure and special characters
      const validationResult = GridValidator.validateGrid(grid)

      // Find path if validation succeeds
      const path = Path.findPath(GridValidator.SPECIAL_CHARS.START, grid)

      return {
        success: true,
        path,
        validationDetails: validationResult,
        gridName,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        gridName,
      }
    }
  },

  /**
   * Pretty prints the test results
   * @param {TestResult} result - The test results to print
   */
  printResults(result) {
    if (result.success) {
      console.log('✅ Test passed successfully!')
      console.log(
        'Grid Dimensions:',
        `${result.validationDetails.dimensions.rows}x${result.validationDetails.dimensions.cols}`
      )
      console.log('Start Point:', result.validationDetails.startPoint.location)
      console.log('End Point:', result.validationDetails.endPoint.location)
      console.log('Path Length:', result.path.length)
      console.log('Visited Path:', result.path)
    } else {
      console.log('❌ Test failed!')
      console.log('Error:', result.error)
    }
    console.log('\n')
  },

  /**
   * Tests multiple grids and provides a summary
   * @param {Object.<string, Grid>} grids - Object mapping grid names to grids
   * @returns {Object} Test summary
   */
  testMultipleGrids(grids) {
    const results = {}
    let passed = 0
    let failed = 0

    console.log('✨ Starting Grid Tests')
    console.log('='.repeat(50))

    Object.entries(grids).forEach(([name, grid]) => {
      const result = this.testGrid(grid, name)
      results[name] = result

      this.printResults(result)

      result.success ? passed++ : failed++
    })

    // Print summary
    console.log('✐ Test Summary')
    console.log('='.repeat(50))
    console.log(`Total Tests: ${passed + failed}`)
    console.log(`Passed: ${passed}`)
    console.log(`Failed: ${failed}`)

    return {
      results,
      summary: { total: passed + failed, passed, failed },
    }
  },
}

// Test all grids
// prettier-ignore
const allGrids = {
  G1, G2, G3, G4, G5, G6, G7, G8, G9, G10,
  G11, G12a, G12b, G12c, G13, G14a, G14b, G15, G16, G17
};

const allResults = GridTester.testMultipleGrids(allGrids)

// Export the results if needed
export const testResults = allResults
