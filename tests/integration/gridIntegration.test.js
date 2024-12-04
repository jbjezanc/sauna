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
      name: 'Fork #1',
      grid: G12a,
      expectedError: 'Fork in path',
    },
    {
      name: 'Multiple end characters',
      grid: G12b,
      expectedError: 'Multiple end characters',
    },
    {
      name: 'Fork #2',
      grid: G12c,
      expectedError: 'Fork in path',
    },
    {
      name: 'Broken path',
      grid: G13,
      expectedError: 'Broken path',
    },
    {
      name: 'Multiple end characters #1',
      grid: G14a,
      expectedError: 'Multiple end characters',
    },
    {
      name: 'Multiple starting paths #2',
      grid: G14b,
      expectedError: 'Multiple starting paths',
    },
    {
      name: 'Fake turn',
      grid: G15,
      expectedError: 'Fake turn',
    },
    {
      name: 'Multiple starting paths #3',
      grid: G16,
      expectedError: 'Multiple starting paths',
    },
    {
      name: 'Multiple end characters #2',
      grid: G17,
      expectedError: 'Multiple end characters',
    },
  ]

  describe('Test all valid grids', () => {
    describe('Test for valid returned object structure', () => {
      validGrids.forEach(({ name, grid, expectedPath, expectedLetters }) => {
        let result;
        beforeAll(() => {
          result = GridTester.testGrid(grid, name)
        })
        test(`${name} to be a valid grid`, () => {
          const { isValid } = GridValidator.validateGrid(grid)
          expect(isValid).toBeTruthy()
        })
        test('returned object should contain the `success` property that equals `true`', () => {
          expect(result).toHaveProperty('success', true)
        })
        test('returned object should contain the `path` property', () => {
          expect(result).toHaveProperty('path')
        })
        test('`result.path` property should contain the direct `visited` property', () => {
          expect(result.path).toHaveProperty('visited')
        })
        test('`result.path` property should contain the direct `letters` property', () => {
          expect(result.path).toHaveProperty('letters')
        })
        test('`result.path` property should contain the direct `path` property', () => {
          expect(result.path).toHaveProperty('path')
        })
        test('`result.path.letters` should be an array of letters', () => {
          expect(Array.isArray(result.path.letters)).toBe(true)
        })
        // This is an indivisible logic unit, thus have to be tested as a whole
        test('`result` should have valid path letters', () => {
          result.path.letters.forEach((item) => {
            expect(typeof item).toBe('object');
            expect(typeof item.letter).toBe('string');
            expect(item.letter).toMatch(/^[A-Z]$/);
            expect(item.point.length).toBe(2);
            item.point.forEach((coord) => expect(typeof coord).toBe('number'));
          });
        });
        test('computed path should match the expected path', () => {
          const result = Path.findPath(GridValidator.SPECIAL_CHARS.START, grid)
          expect(result.path.join('')).toEqual(expectedPath)
        })
        test('collected letters should match the expected letters', () => {
          const path = Path.findPath(GridValidator.SPECIAL_CHARS.START, grid)
          const letters = path.letters
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
        describe(`Testing grid: ${name}`, () => {
          let result

          beforeAll(() => {
            result = GridTester.testGrid(grid, name)
          })

          test('result should contain the direct `success` property to equal `false`', () => {
            expect(result).toHaveProperty('success', false)
          })

          test('result should contain the direct `error` property', () => {
            expect(result).toHaveProperty('error')
          })

          test('`error` should match the `expectedError` value', () => {
            expect(result.error).toEqual(expectedError)
          })
        })
      })
    })
  })
})