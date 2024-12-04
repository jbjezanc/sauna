// Letters ACB
// Path as characters @---A---+|C|+---+|+-B-x
export const G1 = [
  ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
  [null, null, null, null, null, null, null, null, "|"],
  ["x", "-", "B", "-", "+", null, null, null, "C"],
  [null, null, null, null, "|", null, null, null, "|"],
  [null, null, null, null, "+", "-", "-", "-", "+"],
]

// Letters ABCD
// Path as characters @|A+---B--+|+--C-+|-||+---D--+|x
export const G2 = [
  ["@", null, null, null, null, null, null, null, null, null],
  ["|", null, "+", "-", "C", "-", "-", "+", null, null],
  ["A", null, "|", null, null, null, null, "|", null, null],
  ["+", "-", "-", "-", "B", "-", "-", "+", null, null],
  [null, null, "|", null, null, null, null, null, null, "x"],
  [null, null, "|", null, null, null, null, null, null, "|"],
  [null, null, "+", "-", "-", "-", "D", "-", "-", "+"],
]

// Letters ACB
// Path as characters @---A---+|||C---+|+-B-x
export const G3 = [
  ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
  [null, null, null, null, null, null, null, null, "|"],
  ["x", "-", "B", "-", "+", null, null, null, "|"],
  [null, null, null, null, "|", null, null, null, "|"],
  [null, null, null, null, "+", "-", "-", "-", "C"],
]

// Letters GOONIES
// Path as characters @-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x
export const G4 = [
  [null, null, null, null, "+", "-", "O", "-", "N", "-", "+", null, null],
  [null, null, null, null, "|", null, null, null, null, null, "|", null, null],
  [null, null, null, null, "|", null, null, null, "+", "-", "I", "-", "+"],
  ["@", "-", "G", "-", "O", "-", "+", null, "|", null, "|", null, "|"],
  [null, null, null, null, "|", null, "|", null, "+", "-", "+", null, "E"],
  [null, null, null, null, "+", "-", "+", null, null, null, null, null, "S"],
  [null, null, null, null, null, null, null, null, null, null, null, null, "|"],
  [null, null, null, null, null, null, null, null, null, null, null, null, "x"],
]

// Letters BLAH
// Path as characters @B+++B|+-L-+A+++A-+Hx
export const G5 = [
  [null, "+", "-", "L", "-", "+", null, null],
  [null, "|", null, null, "+", "A", "-", "+"],
  ["@", "B", "+", null, "+", "+", null, "H"],
  [null, "+", "+", null, null, null, null, "x"],
]

// Letters AB
// Path as characters @-A--+|+-B--x
export const G6 = [
  ["@", "-", "A", "-", "-", "+", null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, '|', null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, '+', '-', 'B', '-', '-', 'x', '-', 'C', '-', '-', 'D'],
]

// INVALID MAPS
// Missing start character - OK
export const G7 = [
  [null, "-", "-", "-", "A", "-", "-", "-", "+"],
  [null, null, null, null, null, null, null, null, "|"],
  ["x", "-", "B", "-", "+", null, null, null, "|"],
  [null, null, null, null, "|", null, null, null, "|"],
  [null, null, null, null, "+", "-", "-", "-", "C"],
]

// Missing end character - OK
export const G8 = [
  ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
  [null, null, null, null, null, null, null, null, "|"],
  [null, null, "B", "-", "+", null, null, null, "|"],
  [null, null, null, null, "|", null, null, null, "|"],
  [null, null, null, null, "+", "-", "-", "-", "C"],
]

// Multiple starts - OK
export const G9 = [
  [null, "@", "-", "-", "A", "-", "@", "-", "+"],
  [null, null, null, null, null, null, null, null, "|"],
  ["x", "-", "B", "-", "+", null, null, null, "C"],
  [null, null, null, null, "|", null, null, null, "|"],
  [null, null, null, null, "+", "-", "-", "-", "+"],
]

// Multiple starts - OK
export const G10 = [
  ["@", "-", "-", "A", "-", "-", "-", "+"],
  [null, null, null, null, null, null, null, "|"],
  [null, null, null, null, null, null, null, "C"],
  [null, null, null, null, null, null, null, "x"],
  [null, null, null, "@", "-", "B", "-", "+"],
]

// Multiple starts - OK / Multiple end characters first kicks in.
export const G11 = [
  [null, "@", "-", "-", "A", "-", "-", "x"],
  [null, null, null, null, null, null, null, null],
  ["x", "-", "B", "-", "+", null, null, null],
  [null, null, null, null, "|", null, null, null],
  [null, null, null, null, "@", null, null, null],
]

// FORK IN PATH
export const G12a = [
  [null, null, null, null, null, "x", "-", "B"],
  [null, null, null, null, null, null, null, "|"],
  ["@", "-", "-", "A", "-", "-", "-", "+"],
  [null, null, null, null, null, null, null, "|"],
  [null, null, "-", "+", null, null, null, "C"],
  [null, null, null, "|", null, null, null, "|"],
  [null, null, null, "+", "-", "-", "-", "+"],
]

// FORK IN PATH - Multiple end characters first kicks in. (remove one of x chars) OK
export const G12b = [
  [null, null, null, null, null, "x", "-", "B"],
  [null, null, null, null, null, null, null, "|"],
  ["@", "-", "-", "A", "-", "-", "-", "+"],
  [null, null, null, null, null, null, null, "|"],
  [null, null, "x", "+", null, null, null, "C"],
  [null, null, null, "|", null, null, null, "|"],
  [null, null, null, "+", "-", "-", "-", "+"],
]

// FORK IN PATH - OK
export const G12c = [
  ["x", "-", "B"],
  [null, null, "|"],
  ["@", "-", "+"],
  [null, null, "|"],
  [null, '-', "+"],
]

// Broken path OK
export const G13 = [
  ['@', '-', '-', 'A', '-', "+", null, null],
  [null, null, null, null, null, "|", null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, 'B', '-', "x"],
]

// MULTIPLE STARTING PATHS (valid) / OK / First Multiple end characters kicks in 
export const G14a = [["x", "-", "B", "-", "@", "-", "A", "-", "x"]]

// MULTIPLE STARTING PATHS (valid) / OK 
export const G14b = [["x", "-", "B", "-", "@", "-", "A", "-", "-"]]

// FAKE TURN - OK
export const G15 = [["@", "-", "A", "-", "+", "-", "B", "-", "x"]]

// MULTIPLE STARTING PATHS - OK
export const G16 = [["x", "-", "B", "-", "@", "-", "A", "-", "-"]]

// MULTIPLE ENDINGS - Multiple end characters kicks in.
export const G17 = [["x", "-", "B", "-", "@", "-", "A", "-", "x"]]
