# 🍌 BananaScript

**Code. Confuse. Commit.** A chaotic parody programming-language academy with a tiny, real interpreter that runs entirely in your browser.

## Features

- Responsive, no-framework static website
- BananaScript interpreter: variables, strings, numbers, arithmetic, comparisons, `print()`, `if / else`, and bounded `repeat` loops
- Friendly compiler errors, example/reset controls, and output terminal
- No backend, database, localStorage, build tools, or external dependencies

## Run locally

Open `index.html` in a modern browser. The compiler is client-side JavaScript.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **GitHub Actions** if using the included workflow, or **Deploy from a branch** and select `main` / `/(root)`.
3. Save. GitHub will provide the published URL when deployment finishes.

The included workflow deploys the repository root to GitHub Pages whenever changes are pushed to `main`. If GitHub Pages asks you to authorize Actions, select the workflow-based deployment option.

## BananaScript quick start

```banana
let fruit = "banana";
let count = 3;

print("Hello, " + fruit);
repeat count {
  print(count);
  count = count - 1;
}

if (fruit == "banana") {
  print("Fruit protocol approved.");
} else {
  print("Contact Fruit Support.");
}
```

This is a deliberately small educational language, not a general-purpose production compiler. The leaderboard and community figures are fictional parody content.
