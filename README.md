# Git tag check action

This is an action to check if the tag you want to write exists in the remote repository.

## Usages

Check if the provided git tag exists.

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: bbonkr/git-tag-check-action@latest
    id: git_tag_check
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      tag: 'v1.0.0'
  - name: logging
    run: |
      echo "Found tag=${{ steps.git_tag_check.outputs.tag }}"
```

### Inputs

| Name | Required | Description |
| :--- | :------: | :---------- |
| tag  | ✅       | Tag you want to check |
| github_token | ✅ | GitHub Personal Access Token. It requires REPO scope. |

### Outputs

| Name | Description |
| :--- | :---------- |
| tag  | If tag is exists, returns tag. Does not exist then empty string. |
