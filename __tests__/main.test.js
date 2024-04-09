/**
 * Unit tests for the action's main functionality, src/main.js
 */
const main = require('../src/main')
const expect = require('expect')
const { run } = require('jest')

//Action variables
const QB_SOLUTION_ID = '14b17764-d754-42e3-a5fa-2a4eaf6457d3'
const QB_USR_TOKEN = 'b6jcfp_nryt_1_dp83nf7bsccih4chugekvumd2g6'
const QB_REALM = 'carbonprodtest'
const QBL_VERSION = '0.2'
const QBL_FILENAME = 'solution_qbl.yaml'

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('test update', async () => {
    // Set the action's inputs as return values from core.getInput()

    const solutionYaml = await main.GetSolutionYaml()
    const status = await main.updateSolution(
      QB_SOLUTION_ID,
      solutionYaml,
      QBL_VERSION,
      QB_REALM,
      QB_USR_TOKEN
    )

    run()
    // console.debug('resp', resp)
    expect(resp).not.toBeNull()
  })
})
