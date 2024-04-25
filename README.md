## Quickbase Solution API update action

This is a GitHub action that uses the `Quickbase Solution API` to update a solution in Quickbase when PR is merged. It can be triggered by action change or dispatch event.
You can set your own steps in the workflow file to run the action.

## Prerequisites
1. Create a Quickbase user token by following the instructions [here](https://help.quickbase.com/api-guide/create_user_token.html).

2. Create a github token by following the instructions [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

3. Add those tokens to the repository secrets. See [here](https://docs.github.com/en/actions/reference/encrypted-secrets) for more information.

4. Set your repository to allow actions to run. See [here](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#permissions) for more information.

## Inputs


- **gh_token**
    - Description: The personal access token for authenticating with GitHub.
    - Required: true

- **qb_user_token**
    - Description: The user token generated from Quickbase for authentication.
    - Required: true

- **qb_realm**
    - Description: The name of the Quickbase realm where the solution is located.
    - Required: true

- **qbl_version**
    - Description: The version of the Quickbase Language (QBL) to be used.
    - Default: '0.2'

- **qbl_filename**
    - Description: The name of the QBL file that contains the solution definition.
    - Default: 'solution.yaml'

- **qb_solution_id**
    - Description: The ID of the solution in Quickbase that will be updated.
    - Required: true

## Outputs

- **solution_api_message**
    - Description: The messages returned from the Solution API

    
You can see the action result in the Actions tab in your repository. In case of an error, the action will fail and you can see the error message in the logs.
