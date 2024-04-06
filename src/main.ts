import * as core from '@actions/core'
import {getVersion} from './getVersion'
import {inputs} from './inputs'
import {outputs} from './outputs'
import path from 'path'
import {parseVersion} from './version'

const workspace = process.env.GITHUB_WORKSPACE ?? ''

async function run(): Promise<void> {
  let message = ''
  try {
    const project = core.getInput(inputs.project)
    const showLogMessageString = core.getInput(inputs.showLogMessage)
    const showLogMessage =
      Boolean(showLogMessageString) &&
      showLogMessageString.toLocaleLowerCase() === 'true'

    const projectPath = path.resolve(workspace, project)

    if (!projectPath) {
      message = 'Does not provide exists file path'
      core.error(message)
      throw new Error(message)
    }

    if (showLogMessage) {
      core.notice(`File path: ${projectPath}`)
    }

    const result = await getVersion({
      project: projectPath,
      showLogMessage
    })

    if (!result) {
      message = 'Could not find version'
      core.error(message)
      throw new Error(message)
    }

    core.setOutput(outputs.version, result)

    try {
      const version = parseVersion(result)
      if (version) {
        core.setOutput(outputs.major, version.major)
        core.setOutput(outputs.minor, version.minor)
        core.setOutput(outputs.patch, version.patch)
        core.setOutput(outputs.preRelease, version.preRelease)
        core.setOutput(outputs.build, version.build)
      }
    } catch (err) {
      // do nothing
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
