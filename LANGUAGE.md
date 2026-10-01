# BananaScript Language Reference
Version: 0.4 (teaching interpreter)

BananaScript is a small, interpreted, dynamically typed language designed for learning programming concepts. The browser playground tokenizes source text, parses it into an abstract syntax tree, and evaluates that tree. It does **not** compile to machine code or execute JavaScript source.

## Quick start

```banana
hoard fruit = "banana";
hoard count = 3;
yeet("Inventory: " + fruit);

loop_de_loop count {
  yeet(count);
  count = count - 1;
}

panic_if (count == 0 && fruit == "banana") {
  yeet("Inventory verified.");
} cope_else {
  yeet("Audit failed.");
}
```

## Lexical rules
- Identifiers begin with an ASCII letter or underscore and continue with letters, digits, or underscores. Names are case-sensitive.
- Number literals are integers or decimal numbers, such as `12` or `3.5`.
- Strings use single or double quotes. Escapes include `\\n`, `\\t`, `\\r`, and escaped characters.
- `//` begins a comment that continues to the end of the line.
- Semicolons are optional after simple statements.

## Statements
- Declaration: `let name = expression;` (aliases: `stash`, `hoard`)
- Assignment: `name = expression;`
- Output: `print(expression);` (aliases: `yell`, `yeet`)
- Counted loop: `repeat expression { statements }` (aliases: `again`, `loop_de_loop`)
- Conditional: `if (expression) { ... } else { ... }` (aliases: `when`/`panic_if`, `otherwise`/`cope_else`)
- Conditional loop: `while (expression) { statements }`

## Expressions and precedence
From higher to lower precedence:
1. Parentheses, literals, variable references
2. Unary `-` and `!`
3. `*`, `/`, `%`
4. `+`, `-`
5. `<`, `>`, `<=`, `>=`, `==`, `!=`
6. `&&`
7. `||`

Arithmetic operators require numbers. Division and remainder by zero produce errors. The plus operator adds two numbers, or concatenates values as text if either operand is a string. Comparisons use strict equality for `==` and `!=`; relational comparisons follow JavaScript's ordering rules for the two evaluated values. Logical operators convert operands to booleans and short-circuit.

## Runtime behavior and limits
- Values: numbers, strings, booleans.
- Variables are declared once in a single global environment; assignment requires an existing variable.
- Blocks do not introduce a separate lexical scope.
- Execution stops after 10,000 executed statements.
- A counted loop accepts an integer from 0 through 1,000.
- A while loop is limited to 1,000 iterations per while statement.
- Output is limited to 500 lines.
- Runtime errors stop the current program and display a message in the playground.

## Not implemented yet
Functions, return, arrays, objects, user input, break/continue, imports/modules, file access, networking, concurrency, classes, static typing, and compilation to native or bytecode targets are not part of this interpreter. The Academy's broader syllabus is a roadmap for future study, not a claim that these features already run in BananaScript.

## Implementation architecture
1. **Tokenizer** converts characters into tokens.
2. **Parser** checks grammar and builds statement/expression objects (an AST).
3. **Evaluator** walks the AST and computes values or executes statements.
4. **Host UI** displays output and errors. The interpreter runs in the browser; this implementation does not send source code to a server.

This is a learning language, not a production security sandbox. Do not treat it as suitable for running untrusted code in a privileged environment.
