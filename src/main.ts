import * as core from '@actions/core'
import * as glob from '@actions/glob'
import {getVersion} from './getVersion'
import {inputs} from './inputs'
import {outputs} from './outputs'

async function run(): Promise<void> {
  try {
    const project = core.getInput(inputs.project)

    const globber = await glob.create(project)
    const files = await globber.glob()
    const projectFile = files.find((_, index) => index === 0)

    if (!projectFile) {
      throw new Error('Does not provide exists file path')
    }
    const result = await getVersion({project: projectFile})

    core.setOutput(outputs.version, result)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
