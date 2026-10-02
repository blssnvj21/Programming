# BananaScript Language Reference
Version: 0.8 (null literals and standard library)

BananaScript is a small, interpreted, dynamically typed language. The browser playground tokenizes source, parses it into an abstract syntax tree, and evaluates that tree. It does not compile to machine code or execute JavaScript source.

## Quick start

```banana
recipe double(n) {
  send_back n * 2;
}
hoard fruit = ["banana", "mango", "pear"];
fruit[1] = "plantain";
yeet(double(len(fruit)));
yeet(fruit[1]);
```

## BananaScript keywords
- `hoard name = expression;` declares a variable (`stash` is an alias).
- `yeet(expression);` displays a value (`yell` is an alias).
- `loop_de_loop count { ... }` repeats a block (`again` is an alias).
- `panic_if (condition) { ... } cope_else { ... }` branches (`when` and `otherwise` are aliases).
- `while (condition) { ... }` repeats while a condition is true. `break;` exits the nearest loop and `continue;` skips to its next iteration. `else if` chains are supported.
- `recipe name(parameter, ...) { ... }` declares a function.
- `send_back expression;` returns a value from a function. Bare `send_back;` returns no value (`null`).

## Values and expressions
Values are numbers, strings, booleans, arrays, and `null`. The `null` keyword is a literal representing the absence of a value; a function that reaches its end also returns `null`. Strings use single or double quotes; escapes include `\\n`, `\\t`, `\\r`, and escaped characters. `//` starts a line comment. Semicolons are optional after simple statements.

Operators, from higher to lower precedence: parentheses/indexing, unary `-` and `!`, `*` `/` `%`, `+` `-`, comparisons, `&&`, `||`.

## Functions
Functions accept comma-separated parameters and return values using `send_back`. Calls use `name(arguments)`. Parameters and variables declared inside a function are local to that call; assignments update the nearest existing variable, so a function can update a global variable if no local variable shadows it. Functions can call other functions and recurse, with a call-depth limit of 100. Arguments are evaluated before the call. Function declarations become available when execution reaches the declaration.

## Arrays
Array literals: `[1, "two", true]`. Read an item with `items[0]`; update an existing item with `items[0] = "new"`. Indexes are zero-based integers. Out-of-range reads and writes produce errors. Strings can be indexed to read a one-character string, but cannot be assigned through an index. Arrays are mutable and passed by reference. Built-ins: `len(value)`, `push(array, value)`, `pop(array)`, `str(value)`, `num(value)`, `type(value)`, `abs(number)`, `floor(number)`, `ceil(number)`, `round(number)`, and `sqrt(non_negative_number)`, `min(number, ...)`, `max(number, ...)`, `contains(string_or_array, value)`, `join(array, separator)`, and `split(string, separator)`. `contains` checks substring presence or strict-equality array membership. `join` converts array items to strings (`null` becomes `"null"`); `split` returns an array of strings. `type` returns `number`, `string`, `boolean`, `array`, or `null`. Numeric helpers reject non-numbers; `sqrt` rejects negative values.

## Runtime limits
- 10,000 executed statements per run.
- `loop_de_loop` accepts an integer from 0 through 1,000.
- Each `while` statement is limited to 1,000 iterations.
- 500 output lines.
- Function call depth is limited to 100.
- Runtime errors stop execution and display a message.

## Current limitations
No objects, user input, imports/modules, file access, networking, concurrency, classes, static typing, closures, or native/bytecode compilation. This is a learning language, not a production security sandbox. Do not run untrusted code in a privileged environment.

## Compiler API
`BananaScript.compile(source)` validates source and returns a versioned AST package. `BananaScript.run(source)` compiles that source through the same front end and executes the resulting AST. `BananaCompiler(source)` is the playground-compatible shorthand for the same path.

## Implementation
Tokenizer → parser → AST compiler front end → evaluator → browser UI. Source code stays local to the browser; JavaScript source is never accepted as BananaScript.
