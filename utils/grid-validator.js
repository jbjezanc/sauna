import { GridUtils } from './grid-utils.js'

/**
 * @typedef {import('./grid-utils').Grid} Grid
 * @typedef {import('./grid-utils').Point} Point
 * @typedef {import('./grid-utils').GridPoint} GridPoint
 */

export const GridValidator = {
  /** @type {Object.<string, string>} */
  ERROR_MESSAGES: {
    NO_END: 'Missing end character.',
    MULTIPLE_ENDS: 'Multiple end characters.',
    NO_START: 'Missing start character.',
    MULTIPLE_STARTS: 'Multiple starts.',
    INVALID_GRID: 'Grid must be a non-empty 2D array.',
    UNEVEN_ROWS: 'Grid must have rows of equal length.',
  },

  /** @type {Object.<string, string>} */
  SPECIAL_CHARS: {
    START: '@',
    END: 'x',
  },

  /**
   * Validates that the grid is well-formed (non-empty, rectangular)
   * @param {Grid} grid - The grid to validate
   * @throws {Error} If the grid is malformed
   */
  validateGridStructure(grid) {
    if (!Array.isArray(grid) || !grid.length || !Array.isArray(grid[0])) {
      throw new Error(this.ERROR_MESSAGES.INVALID_GRID)
    }

    const expectedLength = grid[0].length
    const hasUnevenRows = grid.some(
      (row) => !Array.isArray(row) || row.length !== expectedLength
    )

    if (hasUnevenRows) {
      throw new Error(this.ERROR_MESSAGES.UNEVEN_ROWS)
    }
  },

  /**
   * Validates the presence and uniqueness of a special character in the grid
   * @param {Grid} grid - The grid to validate
   * @param {string} char - The special character to validate
   * @param {Object} errorMessages - Error messages for missing/multiple characters
   * @throws {Error} If validation fails
   * @returns {GridPoint} The validated point
   */
  validateSpecialChar(grid, char, { missingError, multipleError }) {
    const points = GridUtils.findPoints(char, grid)

    if (points.length === 0) {
      throw new Error(missingError)
    }

    if (points.length > 1) {
      throw new Error(multipleError)
    }

    return points[0]
  },

  /**
   * Validates start and end points in the grid
   * @param {Grid} grid - The grid to validate
   * @throws {Error} If validation fails
   * @returns {Object} Object containing validated start and end points
   */
  validateEndpoints(grid) {
    const startPoint = this.validateSpecialChar(grid, this.SPECIAL_CHARS.START, {
      missingError: this.ERROR_MESSAGES.NO_START,
      multipleError: this.ERROR_MESSAGES.MULTIPLE_STARTS,
    })

    const endPoint = this.validateSpecialChar(grid, this.SPECIAL_CHARS.END, {
      missingError: this.ERROR_MESSAGES.NO_END,
      multipleError: this.ERROR_MESSAGES.MULTIPLE_ENDS,
    })

    return { startPoint, endPoint }
  },

  /**
   * Performs comprehensive grid validation
   * @param {Grid} grid - The grid to validate
   * @throws {Error} If any validation fails
   * @returns {Object} Object containing validated grid information
   */
  validateGrid(grid) {
    // First validate grid structure
    this.validateGridStructure(grid)

    // Then validate special characters
    const { startPoint, endPoint } = this.validateEndpoints(grid)

    return {
      isValid: true,
      startPoint,
      endPoint,
      dimensions: {
        rows: grid.length,
        cols: grid[0].length,
      },
    }
  },

  /**
   * Checks if a grid is valid without throwing errors
   * @param {Grid} grid - The grid to validate
   * @returns {Object} Validation result and any error message
   */
  isValidGrid(grid) {
    try {
      const validationResult = this.validateGrid(grid)
      return {
        isValid: true,
        result: validationResult,
        error: null,
      }
    } catch (error) {
      return {
        isValid: false,
        result: null,
        error: error.message,
      }
    }
  },
}
