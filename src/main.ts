import * as core from '@actions/core'
import {getVersion} from './getVersion'
import {inputs} from './inputs'
import {outputs} from './outputs'
import path from 'path'

async function run(): Promise<void> {
  try {
    const workspace = process.env.GITHUB_WORKSPACE ?? ''
    const project = core.getInput(inputs.project)
    const projectPath = path.resolve(workspace, project)

    if (!projectPath) {
      throw new Error('Does not provide exists file path')
    }
    const result = await getVersion({project: projectPath})

    core.setOutput(outputs.version, result)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
