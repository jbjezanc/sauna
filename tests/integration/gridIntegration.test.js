import { GridValidator } from '../../utils/grid-validator.js'
import { GridTester } from '../../main.js'
import { Path } from '../../path.js'
// prettier-ignore
import { G1, G2, G3, G4, G5, G6, G7, G8, G9, G10, G11, G12a, G12b, G12c, G13, G14a, G14b, G15, G16, G17 } from '../../grids.js';

describe('Grid integration tests', () => {
  const validGrids = [
    {
      name: 'G1',
      grid: G1,
      expectedPath: '@---A---+|C|+---+|+-B-x',
      expectedLetters: 'ACB',
    },
    {
      name: 'G2',
      grid: G2,
      expectedPath: '@|A+---B--+|+--C-+|-||+---D--+|x',
      expectedLetters: 'ABCD',
    },
    {
      name: 'G3',
      grid: G3,
      startChar: '@',
      expectedPath: '@---A---+|||C---+|+-B-x',
      expectedLetters: 'ACB',
    },
    {
      name: 'G4',
      grid: G4,
      startChar: '@',
      expectedPath: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x',
      expectedLetters: 'GOONIES',
    },
    {
      name: 'G5',
      grid: G5,
      startChar: '@',
      expectedPath: '@B+++B|+-L-+A+++A-+Hx',
      expectedLetters: 'BLAH',
    },
    {
      name: 'G6',
      grid: G6,
      startChar: '@',
      expectedPath: '@-A--+|+-B--x',
      expectedLetters: 'AB',
    },
  ]

  const invalidGrids = [
    {
      name: 'Missing start character',
      grid: G7,
      expectedError: 'Missing start character',
    },
    {
      name: 'Missing end character',
      grid: G8,
      expectedError: 'Missing end character',
    },
    {
      name: 'Multiple starts',
      grid: G9,
      expectedError: 'Multiple starts',
    },
    {
      name: 'Multiple starts',
      grid: G10,
      expectedError: 'Multiple starts',
    },
    {
      name: 'Multiple end characters',
      grid: G11,
      expectedError: 'Multiple starts',
    },
    {
      name: 'Fork',
      grid: G12a,
      expectedError: 'Fork in path',
    },
    {
      name: 'Multiple end characters',
      grid: G12b,
      expectedError: 'Multiple end characters',
    },
    {
      name: 'Fork',
      grid: G12c,
      expectedError: 'Fork in path',
    },
    {
      name: 'Broken path',
      grid: G13,
      expectedError: 'Broken path',
    },
    {
      name: 'Multiple end characters',
      grid: G14a,
      expectedError: 'Multiple end characters',
    },
    {
      name: 'Multiple starts',
      grid: G14b,
      expectedError: 'Multiple starting paths',
    },
    {
      name: 'Fake turn',
      grid: G15,
      expectedError: 'Fake turn',
    },
    {
      name: 'Multiple starting paths',
      grid: G16,
      expectedError: 'Multiple starting paths',
    },
    {
      name: 'Multiple end characters',
      grid: G17,
      expectedError: 'Multiple end characters',
    },
  ]

  describe('Test all valid grids', () => {
    describe('Test for valid structure', () => {
      validGrids.forEach(({ name, grid, expectedError }) => {
        test(`Fails validation for grid ${name}`, () => {
          const result = GridTester.testGrid(grid, name)
          expect(result).toHaveProperty('success')
          expect(result).toHaveProperty('path')
          expect(result).toHaveProperty('path.visited')
          expect(result).toHaveProperty('path.letters')
          expect(result).toHaveProperty('path.path]')
          expect(result).toHaveProperty('validationDetails')
          expect(result).toHaveProperty('validationDetails.isValid')
          expect(result).toHaveProperty('validationDetails.startPoint')
          expect(result).toHaveProperty('validationDetails.startPoint.location')
          expect(result).toHaveProperty('validationDetails.startPoint.char')
          expect(result).toHaveProperty('validationDetails.endPoint.location')
          expect(result).toHaveProperty('validationDetails.endPoint.char')
          expect(result).toHaveProperty('validationDetails.dimensions')
          expect(result).toHaveProperty('validationDetails.dimensions.rows')
          expect(result).toHaveProperty('validationDetails.dimensions.cols')
          expect(result).toHaveProperty('gridName')

          expect(result.success).toBe(true)
          expect(Array.isArray(result.path.letters)).toBe(true)
          result.path.letters.forEach((item) => {
            expect(typeof item).toBe('object')
            expect(typeof item.letter).toBe('string')
            expect(item.letter).toMatch(/^[A-Z]$/)
            expect(item.point.length).toBe(2)
            item.point.forEach((coord) => {
              expect(typeof coord).toBe('number')
            })
          })
          expect(result.gridName).toEqual(name)
        })
      })
    })
    describe('Test for valid output', () => {
      validGrids.forEach(({ name, grid, expectedPath, expectedLetters }) => {
        test(`Finds path and collects letters in grid ${name}`, () => {
          const { isValid } = GridValidator.validateGrid(grid)
          expect(isValid).toBeTruthy()

          const result = Path.findPath(GridValidator.SPECIAL_CHARS.START, grid)
          const { _, letters, path } = result
          expect(path.join('')).toEqual(expectedPath)
          expect(
            letters
              .filter((point) => /[A-Z]/.test(point.letter))
              .map((point) => point.letter)
              .join('')
          ).toEqual(expectedLetters)
        })
      })
    })
  })

  describe('Test all invalid grids', () => {
    describe('Test for invalid structure', () => {
      invalidGrids.forEach(({ name, grid, expectedError }) => {
        test(`Fails validation for grid ${name}`, () => {
          const result = GridTester.testGrid(grid, name)
          expect(result).toHaveProperty('success')
          expect(result).toHaveProperty('error')
          expect(result).toHaveProperty('gridName')

          expect(result.success).toBe(false)
          expect(result.error).toEqual(expectedError)
          expect(result.gridName).toEqual(name)
        })
      })
    })
  })
})
