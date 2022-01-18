import * as core from '@actions/core'
import {getVersion} from './getVersion'
import {inputs} from './inputs'
import {outputs} from './outputs'
import path from 'path'

const workspace = process.env.GITHUB_WORKSPACE ?? ''

async function run(): Promise<void> {
  let message = ''
  try {
    const project = core.getInput(inputs.project)

    const projectPath = path.resolve(workspace, project)

    if (!projectPath) {
      message = 'Does not provide exists file path'
      core.error(message)
      throw new Error(message)
    }

    core.notice(`File path: ${projectPath}`)

    const result = await getVersion({project: projectPath})

    core.setOutput(outputs.version, result)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
