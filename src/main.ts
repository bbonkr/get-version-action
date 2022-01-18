import * as core from '@actions/core'
import {getVersion} from './getVersion'
import {inputs} from './inputs'
import {outputs} from './outputs'

async function run(): Promise<void> {
  try {
    const project = core.getInput(inputs.project)

    const result = await getVersion({project})

    core.setOutput(outputs.version, result)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
