# Contributing guide

## Development setup

**Prerequisites:**
- Node.js v18
- pnpm v10

```shell
git clone https://github.com/kytta/ngx-pipes.git
cd ngx-pipes
pnpm install
```

## Writing code

ngx-pipes supports Angular 15 and above.

- Follow existing pipe patterns, naming, and file layout.
  - Do not use `.pipe.` infix in file names!
- Your code must work under all supported versions of Angular
  - Alternatively, you should bump the version requirement with a breaking change
- Do not break public API without marking it as such.
  - Always think if your change can be made without breaking public API.

Format your code with `pnpm run prettier:write`.

### Writing tests

We use Karma as test runner with Jasmine as test library. To start a project in a "watch mode", where each edit will re-run all tests, use:

```shell
pnpm run start
```

To run tests once, use:

```shell
pnpm run test
```

Running tests require Chrome to be installed on your computer. If Karma doesn't find it, set `CHROME_BIN` environment variable to the path of the executable. Alternatively, you can just submit your PR and have the tests run in the CI.

- Each pipe must have a test suite in its respective `.spec.ts` file. 
- Add or update tests for *every* new pipe or behaviour change.
- Cover both expected behaviour and edge cases (null/undefined, invalid input, boundary values).
  - Strive for maximum coverage (but don't overtest)

### Writing documentation

For now, README is the source of truth for public API. If you add or change a pipe, you must also update the documentation there.

- Put the pipe under the correct submodule (`Date`, `String`, `Array`, `Object`, etc.) with a level 3 (`### pipeName`) heading.
- Add a short plain-language description.
- Add a `**Usage:**` line describing usage in templates.
- Add runnable examples:
  - a TypeScript snippet when setup/context matters;
  - an HTML snippet showing template usage;
  - expected result as an inline `<!-- Output: ... -->` comment.

Also, pipes have JSDoc comments

- Add a JSDoc block above the pipe class and/or `transform` method.
- Document every parameter and return value.
  - TypeScript type might be `any`; document the expected type in JSDoc

## Required checks

Before opening a PR, make sure to run these checks:

```shell
pnpm run prettier:check
pnpm run build
pnpm run test
```

**Note:** The `pnpm lint` command doesn't work and is not enforced.

## Git workflow

1. Create a branch from the `master` branch.
1. Try to split your changes in small, atomic commits
   - This is recommended for the code reviewer; your PR will be squashed
1. Open a pull request with clear description and rationale
   - Your PR title must be a valid Conventional Commit (see below)
   - If your PR fixes an issue, make sure to link it with the word "Closes"
   - Include all links to other related issues and PRs, including from the original repo
1. Keep your PR up-to-date and fix tests, when asked

### Commit message conventions

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commits in master, meaning they should be used as PR titles.

If your PR touches a pipe, you must add it as a scope. For example: `fix(timeAgo): ...`. Other scopes include, but are not limited to: `docs`, `ci`, `deps`, `release`, `tests`, etc.

If your PR contains breaking changes, add an exclamation point before colon. For example: `chore(deps)!: upgrade to Angular 15`. You also should include a more description of the change in the commit/PR body starting with `BREAKING CHANGE:`

## Releases

Releases are automated using release-please. Each commit on master determines the next version number. Merging the release PR will issue a new version.
