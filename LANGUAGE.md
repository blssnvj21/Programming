# BananaScript Language Reference
Version: 0.12 (each loops, loop controls, expanded standard library, safer ranges)

BananaScript is a small, interpreted, dynamically typed teaching language. The browser playground tokenizes source, parses it into an abstract syntax tree, and evaluates that tree. The current runtime is BananaScript v0.12. It does not compile to machine code or execute JavaScript source.

## Quick start

```banana
hoard fruits = ["banana", "mango", "pear"];
each fruit in fruits {
  yeet(fruit);
}

recipe double(n) {
  send_back n * 2;
}
yeet(double(21));
```

## Keywords and control flow
- `hoard name = expression;` declares a variable (`stash` is an alias).
- `yeet(expression);` displays a value (`yell` is an alias).
- `loop_de_loop count { ... }` repeats a block (`again` is an alias).
- `while (condition) { ... }` repeats while a condition is true.
- `each item in collection { ... }` visits every element of an array or every character of a string.
- `break;` exits the nearest loop. `continue;` skips to the next iteration.
- `panic_if (condition) { ... } cope_else { ... }` branches (`when` and `otherwise` are aliases). `else if` chains are supported.
- `recipe name(parameter, ...) { ... }` declares a function.
- `send_back expression;` returns a value from a function. Bare `send_back;` returns `null`.

## Values and expressions
Values are numbers, strings, booleans, arrays, and `null`. Strings use single or double quotes; escapes include `\\n`, `\\t`, `\\r`, and escaped characters. `//` starts a line comment. Semicolons are optional after simple statements.

Operators, from higher to lower precedence: parentheses/indexing, unary `-` and `!`, `*` `/` `%`, `+` `-`, comparisons, `&&`, `||`.

## Functions
Functions accept comma-separated parameters and return values using `send_back`. Parameters and variables declared inside a function are local to that call. Functions can call other functions and recurse, with a call-depth limit of 100.

## Arrays and strings
Array literals use `[1, "two", true]`. Read an item with `items[0]`; update an existing array item with `items[0] = "new"`. Indexes are zero-based. Strings can be indexed for reading but not indexed assignment. Arrays are mutable and passed by reference.

The `each` loop does not expose a special index variable: use `range(len(items))` when you need numeric indexes.

## Standard library
`len(value)`, `push(array, value)`, `pop(array)`, `str(value)`, `num(value)`, `type(value)`, `abs(number)`, `floor(number)`, `ceil(number)`, `round(number)`, `sqrt(non_negative_number)`, `min(number, ...)`, `max(number, ...)`, `contains(string_or_array, value)`, `join(array, separator)`, `split(string, separator)`, `range(end)` / `range(start, end)`, `sum(array)`, `reverse(array)`, `upper(string)`, `lower(string)`, `trim(string)`, `replace(string, old, new)`, and `assert(condition, message)`.

`range` creates integer sequences without including the end value and has a maximum span of 1,000 values. `reverse` mutates and returns its array. `contains` checks substring presence or strict-equality array membership.

## Runtime limits
- 10,000 executed statements per run.
- `loop_de_loop` accepts an integer from 0 through 1,000.
- Each `while` and `each` loop is protected by the interpreter's execution-step limit; `while` also has a 1,000-iteration limit.
- 500 output lines.
- Function call depth is limited to 100.

## Compiler API
`BananaScript.compile(source)` validates source and returns a versioned AST package containing an instruction/node count. `BananaScript.run(source)` compiles through the same front end and executes the AST. `BananaCompiler(source)` is the playground-compatible shorthand.

## Current limitations
No objects, user input, imports/modules, file access, networking, concurrency, classes, static typing, closures, or native/bytecode compilation. Unsupported advanced topics in the Academy are learning concepts, not hidden BananaScript syntax.

## Implementation
Tokenizer → parser → AST → evaluator → browser UI. Source stays local to the browser; JavaScript source is never accepted as BananaScript.
