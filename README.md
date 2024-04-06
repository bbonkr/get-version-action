# Get version action

[![](https://img.shields.io/github/v/release/bbonkr/get-version-action?display_name=tag&style=flat-square&include_prereleases)](https://github.com/bbonkr/get-version-action/releases)

This is an action to get the version string from project file such as package.json, .csproj (c# sdk style project file)

## Usages

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4

  - uses: bbonkr/get-version-action@v1
    id: get_version
    with:
      project: './package.json'
      show_log_message: true
  - name: logging
    run: |
      echo "version=${{ steps.get_version.outputs.version }}"
      echo "major=${{ steps.get_version.outputs.major }}"
      echo "minor=${{ steps.get_version.outputs.minor }}"
      echo "patch=${{ steps.get_version.outputs.patch }}"
      echo "pre-release=${{ steps.get_version.outputs.pre-release }}"
      echo "build=${{ steps.get_version.outputs.build }}"
```

### Inputs

| Name    | Required | Description                                                                       |
| :------ | :------: | :-------------------------------------------------------------------------------- |
| project |    ✅    | Your project file path. Support package.json, .csproj (c# sdk style project file) |
| show_log_message | | Show message or not in the console. Shows error log always even set false. Value has to be `true` or something else; |

> Support file
>
> - package.json
> - .csproj (c# sdk style project file)

### Outputs

| Name        | Description                                                        |
| :---------- | :----------------------------------------------------------------- |
| version     | version string, If does not find version string, throws exception. |
| major       | major of version (SEMVER[^semver])                                 |
| minor       | minor of version (SEMVER[^semver])                                 |
| patch       | patch of version (SEMVER[^semver])                                 |
| pre-release | pre-release of version (SEMVER[^semver])                           |
| build       | build of version (SEMVER[^semver])                                 |

e.g.)
input: `v1.2.3-pre.4+5`

outputs:
version: `v1.2.3-pre.4+5`
major: `1`
minor: `2`
patch: `3`
pre-release: `pre.4`
build: `5`

[^semver]: https://semver.org/
