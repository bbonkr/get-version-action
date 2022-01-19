# Get version action

[![](https://img.shields.io/github/v/release/bbonkr/get-version-action?display_name=tag&style=flat-square&include_prereleases)](https://github.com/bbonkr/get-version-action/releases)

This is an action to get the version string from project file such as package.json, .csproj (c# sdk style project file)

## Usages

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: bbonkr/get-version-action@latest
    id: get_version
    with:
      project: "./package.json"
  - name: logging
    run: |
      echo "Version=${{ steps.get_version.outputs.version }}"
```

### Inputs

| Name | Required | Description |
| :--- | :------: | :---------- |
| project  | ✅       | Your project file path. Support package.json, .csproj (c# sdk style project file) |

> Support file
> * package.json
> * .csproj (c# sdk style project file)

### Outputs

| Name | Description |
| :--- | :---------- |
| version  | version string, If does not find version string, throws exception. |
