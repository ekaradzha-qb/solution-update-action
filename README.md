## Quickbase Solution API update action

This is a GitHub action that uses the `Quickbase Solution API` to update a solution in Quickbase when PR is merged. It can be triggered by action change or dispatch event.
You can set your own steps in the workflow file to run the action.

## Prerequisites
1. Create a Quickbase user token by following the instructions [here](https://help.quickbase.com/api-guide/create_user_token.html).

2. Create a github token by following the instructions [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

3. Add those tokens to the repository secrets. See [here](https://docs.github.com/en/actions/reference/encrypted-secrets) for more information.

4. Set your repository to allow actions to run. See [here](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#permissions) for more information.

## Inputs

The action requires the following inputs:

- `gh_token`: The GitHub token. This is required.
- `owner_name`: The owner name of the repository. This is required.
- `owner_email`: The owner email of the repository. This is required.
- `pr_title`: The title of the PR. The default is 'Export solution version'.
- `pr_description`: The description for the auto-created PR. The default is 'See the difference between the old and new solution QBL'.
- `branch_name`: The branch name to create PR in. The default is 'new-solution-version'.
- `qb_user_token`: The Quickbase user token. This is required.
- `qb_realm`: The Quickbase realm name. This is required.
- `qbl_version`: The Quickbase QBL version. The default is '0.2'.
- `qbl_filename`: The filename for the QBL file that will be checked in the repository. The default is 'solution.yaml'.
- `qb_solution_id`: The ID of the solution that will be exported. This is required.

## Outputs

You can see the action result in the Actions tab in your repository. In case of an error, the action will fail and you can see the error message in the logs.
