const core = require('@actions/core')
const { context } = require('@actions/github')
const { Octokit } = require('octokit')
const { rest } = new Octokit({ auth: core.getInput('gh_token') })

//Action variables
const repo = context.repo.repo
const owner = context.repo.owner
const QB_SOLUTION_ID = core.getInput('qb_solution_update_id')
const QB_USR_TOKEN = core.getInput('qb_user_token')
const QB_REALM = core.getInput('qb_realm')
const QBL_VERSION = core.getInput('qbl_version')
const QBL_FILENAME = core.getInput('qbl_filename')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const solutionYaml = await getSolutionYaml()
    if (solutionYaml == null) {
      core.setFailed('Solution YAML is empty')
      return
    }

    const updateResponse = await updateSolution(
      QB_SOLUTION_ID,
      solutionYaml,
      QBL_VERSION,
      QB_REALM,
      QB_USR_TOKEN
    )

    if (updateResponse.status !== 200) {
      core.setFailed(
        `Failed to update solution. Status code: ${updateResponse.status}, ${updateResponse.statusText}`
      )
      return
    }

    core.setOutput('solution_api_message', updateResponse.json())
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

async function getSolutionYaml() {
  const yaml = await rest.repos.getContent({
    owner,
    repo,
    path: QBL_FILENAME
  })

  if (yaml.data.content != null) {
    return atob(yaml.data.content)
  }

  return null
}

async function updateSolution(
  solutionId,
  solutionYaml,
  qblVersion,
  realmHostname,
  qbTk
) {
  const headers = {
    'QBL-Version': `${qblVersion}`,
    'QB-Realm-Hostname': `${realmHostname}`,
    'User-Agent': `GitHub action`,
    Authorization: `QB-USER-TOKEN ${qbTk}`,
    'Content-Type': 'application/x-yaml'
  }

  if (solutionYaml == null) {
    core.setFailed(`${QBL_FILENAME} is invalid or empty`)
    return false
  }

  return await fetch(`https://api.quickbase.com/v1/solutions/${solutionId}`, {
    method: 'PUT',
    headers,
    body: solutionYaml
  })
}

module.exports = { run, updateSolution, GetSolutionYaml: getSolutionYaml }
