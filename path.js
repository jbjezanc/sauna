import { GridUtils } from './utils/grid-utils.js'

/**
 * @typedef {[number, number]} Point
 * @typedef {Array<Array<string|null>>} Grid
 * @typedef {{ letter: string, point: Point }} LetterPosition
 */

export const Path = {
  /**
   * Checks if two directions are perpendicular.
   * @param {Point} dir1 - The first direction
   * @param {Point} dir2 - The second direction
   * @returns {boolean} True if the directions are perpendicular
   */
  isPerpendicular(dir1, dir2) {
    return dir1[0] * dir2[0] + dir1[1] * dir2[1] === 0
  },

  /**
   * Handles movement from the starting position '@'
   * @param {Point} currentPoint - Current position
   * @param {Grid} grid - The grid
   * @returns {Point|null} Next valid point or null
   */
  handleStartPosition(currentPoint, grid) {
    const validNeighbors = GridUtils.findValidDirections(currentPoint, grid)
    if (validNeighbors.length > 1) {
      throw new Error('Multiple starting paths.')
    }
    return validNeighbors[0] || null
  },

  /**
   * Handles uppercase letter positions and tracking
   * @param {Point} currentPoint - Current position
   * @param {Point[]} nextPoints - Available next points
   * @param {Point} currentDirection - Current direction
   * @param {Point[]} visited - Visited points
   * @param {LetterPosition[]} letters - Tracked letters
   * @param {string} currentChar - Current character
   * @returns {Point|null} Next valid point or null
   */
  handleLetterPosition(
    currentPoint,
    nextPoints,
    currentDirection,
    visited,
    letters,
    currentChar
  ) {
    // Track new letters
    const isNewLetter = !letters.some(
      (l) =>
        l.letter === currentChar &&
        l.point[0] === currentPoint[0] &&
        l.point[1] === currentPoint[1]
    )
    if (isNewLetter) {
      letters.push({ letter: currentChar, point: currentPoint })
    }

    // Try to continue straight or find unvisited point
    const straightAhead = GridUtils.addPoints(currentPoint, currentDirection)
    return nextPoints.some((p) => p[0] === straightAhead[0] && p[1] === straightAhead[1])
      ? straightAhead
      : nextPoints.find((p) => !visited.some((v) => v[0] === p[0] && v[1] === p[1]))
  },

  /**
   * Handles turn positions marked by '+'
   * @param {Point} currentPoint - Current position
   * @param {Point[]} nextPoints - Available next points
   * @param {Point} currentDirection - Current direction
   * @param {Point[]} visited - Visited points
   * @returns {Point|null} Next valid point or null
   */
  handleTurnPosition(currentPoint, nextPoints, currentDirection, visited) {
    const [prevPoint] = visited.slice(-2)
    const possibleTurns = nextPoints.filter((p) => {
      const newDir = GridUtils.subtractPoints(currentPoint, p)
      return (
        !(p[0] === prevPoint?.[0] && p[1] === prevPoint?.[1]) &&
        this.isPerpendicular(currentDirection, newDir)
      )
    })

    if (possibleTurns.length === 0) throw new Error('Fake turn.')
    if (possibleTurns.length >= 2) throw new Error('Fork in path.')

    // TODO: Remove this - possible valid turns for '+' must be 1, and is guarded
    // by the filtering out possible directions that are not perpendicular to the
    // current direction in the previous step when we filtered out nextPoints.
    // return (
    //   possibleTurns.find((p) => !visited.some((v) => v[0] === p[0] && v[1] === p[1])) ||
    //   possibleTurns[0]
    // )
    return possibleTurns[0]
  },

  /**
   * Handles regular path positions
   * @param {Point} currentPoint - Current position
   * @param {Point[]} nextPoints - Available next points
   * @param {Point} currentDirection - Current direction
   * @param {Point[]} visited - Visited points
   * @returns {Point|null} Next valid point or null
   */
  handleRegularPosition(currentPoint, nextPoints, currentDirection, visited) {
    const straightAhead = GridUtils.addPoints(currentPoint, currentDirection)
    const [prevPoint] = visited.slice(-2)

    return nextPoints.some((p) => p[0] === straightAhead[0] && p[1] === straightAhead[1])
      ? straightAhead
      : nextPoints.find((p) => !(p[0] === prevPoint?.[0] && p[1] === prevPoint?.[1]))
  },

  /**
   * Finds a path in the grid starting from a given character.
   * @param {string} startChar - The starting character
   * @param {Grid} grid - The grid
   * @returns {Point[]} The visited path
   */
  findPath(startChar, grid) {
    const start = GridUtils.findPoints(startChar, grid)[0].location
    const visited = [start]
    const path = [startChar]
    const letters = []

    let currentPoint = start
    let currentChar = startChar
    let currentDirection = [0, 1] // Start moving right

    while (true) {
      const nextPoints = GridUtils.findValidDirections(currentPoint, grid)

      // Check success condition
      if (currentChar === 'x') {
        this.logResult('Success!', letters, path)
        return visited
      }

      // Check for broken path
      if (nextPoints.length === 0) {
        this.logResult('Broken path', letters, path)
        throw new Error('Broken path.')
      }

      // Determine next point based on current character type
      let nextPoint = null
      if (currentChar === '@') {
        nextPoint = this.handleStartPosition(currentPoint, grid)
      } else if (/[A-Z]/.test(currentChar)) {
        nextPoint = this.handleLetterPosition(
          currentPoint,
          nextPoints,
          currentDirection,
          visited,
          letters,
          currentChar
        )
      } else if (currentChar === '+') {
        nextPoint = this.handleTurnPosition(
          currentPoint,
          nextPoints,
          currentDirection,
          visited
        )
      } else {
        nextPoint = this.handleRegularPosition(
          currentPoint,
          nextPoints,
          currentDirection,
          visited
        )
      }

      // Handle path continuation or failure
      if (nextPoint) {
        currentDirection = GridUtils.subtractPoints(currentPoint, nextPoint)
        currentPoint = nextPoint
        currentChar = grid[currentPoint[0]][currentPoint[1]]
        path.push(currentChar)
        visited.push(currentPoint)
      } else {
        this.logResult('Failure', letters, path)
        throw new Error('Broken path.')
      }
    }
  },

  /**
   * Logs the result of path finding
   * @param {string} status - Status message
   * @param {LetterPosition[]} letters - Collected letters
   * @param {string[]} path - Path characters
   */
  logResult(status, letters, path) {
    console.log(status)
    console.log('Letters:', letters.map((l) => l.letter).join(''))
    console.log('Path as characters:', path.join(''))
  },
}
