const core = require('@actions/core')
const { context } = require('@actions/github')
const { Octokit } = require('octokit')
// const { rest } = new Octokit({ auth: core.getInput('gh_token') })
const { rest } = new Octokit({
  auth: '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'
})

//Action variables
//const repo = context.repo.repo
//const owner = context.repo.owner
const repo = 'solution-update-action'
const owner = 'ekaradzha-qb'
const QB_SOLUTION_ID = core.getInput('qb_solution_id')
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
    const solutionYaml = GetSolutionYaml()
    const status = await updateSolution(
      QB_SOLUTION_ID,
      solutionYaml,
      QBL_VERSION,
      QB_REALM,
      QB_USR_TOKEN
    )

    if (status !== 200) {
      core.setFailed(`Failed to update solution. Status code: ${status}`)
      return
    }

    core.setOutput('branch_name', '')
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

async function GetSolutionYaml() {
  const { data: pullRequests } = await rest.pulls.list({
    owner,
    repo,
    state: 'closed',
    checkIfMerged: true
  })

  const foundPr = pullRequests.find(pr => pr.head.ref === 'main')
  if (foundPr == null) {
    return 1
  }

  const yaml = rest.repos.getContent({
    owner,
    repo,
    path: QBL_FILENAME
  })

  console.info('Contents')
  console.info(yaml)

  return yaml
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

  const resp = await fetch(
    `https://api.quickbase.com/v1/solutions/${solutionId}`,
    {
      method: 'PUT',
      headers,
      body: solutionYaml
    }
  )

  return resp.status
}

async function exportSolution(solutionId, qblVersion, realmHostname, qbTk) {
  const headers = {
    'QBL-Version': `${qblVersion}`,
    'QB-Realm-Hostname': `${realmHostname}`,
    'User-Agent': `GitHub action`,
    Authorization: `QB-USER-TOKEN ${qbTk}`,
    'Content-Type': 'application/x-yaml'
  }

  const resp = await fetch(
    `https://api.quickbase.com/v1/solutions/${solutionId}`,
    {
      method: 'GET',
      headers
    }
  )
  return await resp.text()
}

module.exports = { run, updateSolution, GetSolutionYaml }
