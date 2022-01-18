import * as core from '@actions/core'
import * as fs from 'fs/promises'
import * as path from 'path'
import xmldom from '@xmldom/xmldom'
import xpath from 'xpath'

interface GetVersionOptions {
  project: string
}

export const getVersionFromPackageJson = (content: string): string => {
  const packageJson = JSON.parse(content)

  const version = packageJson['version']

  return version ?? ''
}

export const getVersionFromCsproj = (content: string): string => {
  const parser = new xmldom.DOMParser()
  const xmlDoc = parser.parseFromString(content)

  const node = xpath.select('string(//Version)', xmlDoc, true)

  return node?.toString() ?? ''
}

export const getVersion = async (
  options: GetVersionOptions
): Promise<string> => {
  const {project} = options

  core.debug(`project path: ${project}`)
  const projectFilePath = path.resolve(project)
  const extname = path.extname(projectFilePath)
  const content = await fs.readFile(projectFilePath, {encoding: 'utf-8'})

  let version = ''
  switch (extname) {
    case '.json':
      version = getVersionFromPackageJson(content)
      break
    case '.csproj':
      version = getVersionFromCsproj(content)
      break

    default:
      throw new Error('Does not support your project file')
  }

  if (!version) {
    throw new Error('Does not find the version')
  }

  return version
}
