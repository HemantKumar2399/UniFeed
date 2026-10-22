# Repository and recovery

The project is backed up in the private [UniFeed GitHub repository](https://github.com/HemantKumar2399/UniFeed). `origin` uses its canonical address. `main` is the shared baseline; work on focused branches and push completed work regularly. Local commits alone do not protect against laptop loss.

## Restore on another computer

Install Git, Node 24, npm and PostgreSQL or Docker/Podman. Authenticate GitHub CLI with an account that has repository access, then:

```sh
gh repo clone HemantKumar2399/UniFeed
cd UniFeed
npm run setup
npm run dev
```

Setup creates `.env` from `.env.example` and generates missing signing secrets. Configure the database connection for the new computer. To restore an existing installation, restore its database and original secrets before starting the app. New secrets are appropriate for a fresh demo, but old QR signatures require their original signing secret.

## Save work

```sh
git status
git switch -c feature/short-description
# Make and check the change, then stage the intended files.
git add <files>
git diff --cached
git commit -m "fix: describe the corrected behavior"
git push -u origin HEAD
```

Open a pull request into `main`. For a direct personal backup, push the current work branch even before merging. CI runs for pull requests and pushes to `main`. Check `git status -sb` and GitHub before assuming local work is backed up. Never force-push shared history as a routine backup step.

## What GitHub contains

Application source, lockfile, migrations, tests, setup scripts, CI, public demo artwork and maintained documentation are versioned. Optional agent installations, generated plans, old issue-sync tools, builds, dependencies, test reports and scratch databases stay local. Removed tracked tooling remains recoverable from earlier commits; no history rewrite was performed.

## What needs a separate private backup

- `.env` and deployment secrets: store securely outside Git, such as a password manager. `.env.example` contains placeholders only.
- PostgreSQL data: use a database backup appropriate for the deployment, for example `pg_dump --format=custom --file=<private-backup-path> <database-name>`, then store it off the laptop. Do not commit the dump.
- User uploads: back up the configured object-storage bucket or local development upload folder separately.

The local `scratch/verification` database and runtime are diagnostics, not the project's portable setup. A fresh clone does not depend on them. Demo data can be recreated with the documented explicit reset command on a disposable database.

## Initial repository cleanup

On 22 October 2026 the current checkout stopped versioning 960 vendored skill files, 79 generated planning files, four obsolete planning/issue-sync scripts and the generated-story issue template. Local copies were preserved. The existing private repository was reused and its old remote address updated; no duplicate repository or public publication was needed. Verification and the push result are recorded below after completion.

Repository verification completed: 290 tracked files remain; 24 Markdown files have no broken relative file links. Ignore checks passed for 15 private/generated paths and seven required source paths. The CI YAML parses and matches formatting. A high-confidence credential-pattern scan of 1,255 text blobs across the cleaned tree and six unpublished commits found no matches; this is a focused check, not a security certification. Application code was unchanged by this cleanup, so prior runtime/build verification was retained rather than rerunning unrelated suites.

Initial private backup confirmed on 22 October 2026: cleanup commit `7d08d85` was pushed to `main`, and GitHub's branch SHA matched the local commit. GitHub Actions is enabled and the CI workflow is active. Hosted CI completion was not part of the local documentation/ignore validation above. Subsequent changes should use the normal commit/push workflow; GitHub is a backup only for commits actually pushed.
