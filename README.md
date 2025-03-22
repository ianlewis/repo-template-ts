# repo-template

[![tests](https://github.com/ianlewis/repo-template/actions/workflows/pre-submit.units.yml/badge.svg)](https://github.com/ianlewis/repo-template/actions/workflows/pre-submit.units.yml)

This repository template is maintained for use in repos under
`github.com/ianlewis`. However, it can be used as a general purpose repository
starter template.

## Goals

### Repository quality

[Formatters and linters](#formatting-and-linting) are maintained to maintain repository code and
configuration quality through PR checks.

### Security & Dependencies

In general, dependencies for tools and GitHub Actions are pinned to improved
overall project supply-chain security.

External dependencies on GitHub actions are limited to trusted actions with
good security practices (e.g. official GitHub-owned actions) to minimize
exposure to compromise via external repositories.

See also [Recommended repository settings](#recommended-repository-settings).

## Requirements

This repository template is meant to be used on Linux systems. It may still
work on MacOS or Windows given a `bash` environment, but this is not tested.

In general, dependencies on outside tools should be minimized in favor of
including them as project-local dependencies.

Required runtimes:

- [`Node.js`]: Node.js is required to run some linters and formatters.
- [`Python`]: Python is required to run some linters and formatters.

The following tools need to be installed:

- [`actionlint`]: For linting GitHub Actions workflows.
- [`mbrukman/autogen`]: For adding license headers.
- [`shellcheck`]: For linting shell code in GitHub Actions workflows.
- [`jq`]: For parsing output of some linters.
- [`git`]: For repository management.
- `awk`, `bash`, `grep`, `head`, `rm`: Standard Unix tools.

The following tools are automatically installed locally to the project and
don't need to be pre-installed:

- [`yamllint`]: For linting YAML files (installed in local Python virtualenv `.venv`).
- [`prettier`]: For formatting markdown and yaml (installed in local `node_modules`).
- [`markdownlint`]: For linting markdown (installed in local `node_modules`).
- [`zizmor`]: For linting GitHub Actions workflows (installed in local Python virtualenv `.venv`).

## Makefile

The `Makefile` is used for managing files and maintaining code quality. It
includes a default `help` target that prints all make targets and their
descriptions grouped by function.

```shell
$ make
repo-template Makefile
Usage: make [COMMAND]

  help                 Shows all targets and help from the Makefile (this message).
Tools
  license-headers      Update license headers.
Formatting
  format               Format all files
  md-format            Format Markdown files.
  yaml-format          Format YAML files.
Linting
  lint                 Run all linters.
  actionlint           Runs the actionlint linter.
  zizmor               Runs the zizmor linter.
  markdownlint         Runs the markdownlint linter.
  yamllint             Runs the yamllint linter.
Maintenance
  clean                Delete temporary files.
```

### Formatting and linting

Some `Makefile` targets for basic formatters and linters are included along
with GitHub Actions pre-submits. Where possible, pre-submits use `Makefile`
targets and those targets execute with the same settings as they do when run
locally. This is to give a consistent experience when attempting to reproduce
pre-submit errors.

Versioning of formatting and linting tools is done via the `requirements.txt`
and `packages.json` where possible. This is so that the versions can be
maintained and updated via `dependabot`-like tooling.

`Makefile` targets and linter/formatter config are designed to respect
`.gitignore` and not cross `git` submodules boundaries. However, you will need
to add files using `git add` for new files before they are picked up.

`Makefile` targets for linters will also produce human-readable output by
default, but will produce errors as [GitHub Actions workflow
commands](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions)
so they can be easily interpreted when run in Pull-Request [status
checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks).

### License headers

The `license-headers` make target will add license headers to files that are
missing it with the Copyright holder set to the current value of `git config
user.name`.

Files are checked for the existence license headers in pre-submits.

## Project documentation

This repository template includes stub documentation. Examples of
`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md` can be found in the
[ianlewis/ianlewis](https://github.com/ianlewis/ianlewis) repository and are
maintained in line with [GitHub recommended community
standards](https://opensource.guide/).

## Recommended repository settings

The following repository settings are recommended in conjunction with this repository template.

### Rules

A ruleset should be created for the default branch with branch protection rules
that follow the [recommendations from OpenSSF
Scorecard](https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection)
as closely as possible.

#### Required Checks

The following checks should be marked as required:

- [ ] `actionlint`
- [ ] `formatting`
- [ ] `licence-headers`
- [ ] `markdownlint`
- [ ] `todos`
- [ ] `yamllint`

#### Require code scanning results

The following tools should be added to the required code scanning results.

- [ ] CodeQL
- [ ] zizmor

### Code security

1. [ ] **Private vulnerability reporting:**
       Enable private vulnerability reporting as mentioned in [`SECURITY.md`].

#### Dependabot

1. [ ] **Dependabot alerts:**
       Allow dependabot to update linting and formatting tools.
2. [ ] **Dependabot security updates:**
       Allow dependabot to update linting and formatting tools.

#### Code scanning

1. [ ] **CodeQL analysis:**
       Make sure "GitHub Actions (Public Preview)" is enabled in languages.
2. [ ] **Protection rules:**
   - [ ] **Security alert severity level:** Errors and warnings
   - [ ] **Standard alert severity level:** Errors and warnings
3. [ ] **Secret protection:**
       Get alerts when secrets are detected in the repo.
4. [ ] **Push protection:**
       Block pushing commits with secrets in them.

## Keeping repositories in sync

You can optionally keep repositories created with the template in sync with
changes to the template. Because repositories created from GitHub templates are
not forks, it is recommended to perform a squash merge to squash the merge as a
commit on your commit history.

```shell
# One time step: Add the repository template as a remote.
git remote add repo-template git@github.com:ianlewis/repo-template.git

# Fetch the latest version of the repo-template.
git fetch repo-template main

# Create a new squash merge commit.
git merge --no-edit --signoff --squash --allow-unrelated-histories repo-template/main
```

## Language-specific templates

A number of language specific templates based on this template are also available:

| Language              | Repository                                                                |
| --------------------- | ------------------------------------------------------------------------- |
| Go                    | [ianlewis/repo-template-go](https://github.com/ianlewis/repo-template-go) |
| TypeScript/JavaScript | [ianlewis/repo-template-ts](https://github.com/ianlewis/repo-template-ts) |

## Contributing

PRs may be accepted to this template. See [`CONTRIBUTING.md`] for contributor
documentation.

[`CONTRIBUTING.md`]: ./CONTRIBUTING.md
[`SECURITY.md`]: ./SECURITY.md
[`Node.js`]: https://nodejs.org/
[`Python`]: https://www.python.org/
[`actionlint`]: https://github.com/rhysd/actionlint
[`mbrukman/autogen`]: https://github.com/mbrukman/autogen
[`git`]: https://git-scm.com/
[`jq`]: https://jqlang.org/
[`markdownlint`]: https://github.com/DavidAnson/markdownlint
[`prettier`]: https://prettier.io/
[`shellcheck`]: https://www.shellcheck.net/
[`yamllint`]: https://www.yamllint.com/
[`zizmor`]: https://woodruffw.github.io/zizmor/
