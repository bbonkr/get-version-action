import {expect, test} from '@jest/globals'
import {
  getVersion,
  getVersionFromCsproj,
  getVersionFromPackageJson
} from '../src/getVersion'

test('package.json file', async () => {
  const path = '../assets/package.json'
  const result = await getVersion({project: path})

  expect(result).toEqual('1.0.0')
})

test('package-no-version.json file', async () => {
  const path = '../assets/package-no-version.json'

  expect(getVersion({project: path})).rejects.toThrow(
    'Does not find the version'
  )
})

test('hello.csproj file', async () => {
  const path = '../assets/hello.csproj'
  const result = await getVersion({project: path})

  expect(result).toEqual('1.0.0')
})

test('hello-no-version.csproj file', async () => {
  const path = '../assets/hello-no-version.csproj'

  expect(getVersion({project: path})).rejects.toThrow(
    'Does not find the version'
  )
})

test('Throws not support file', async () => {
  const path = '../assets/not-support.project'

  expect(getVersion({project: path})).rejects.toThrow(
    'Does not support your project file'
  )
})

test('package.json has a version', async () => {
  const jsonString = `{ "version": "1.0.0" }`
  const version = getVersionFromPackageJson(jsonString)

  expect(version).toEqual('1.0.0')
})

test('package.json does not have a version', async () => {
  const jsonString = `{ "aersion": "1.0.0" }`
  const version = getVersionFromPackageJson(jsonString)

  expect(version).toEqual('')
})

test('csproj has version element', () => {
  const proj = `<Project><Version>1.0.0</Version></Project>`

  const version = getVersionFromCsproj(proj)

  expect(version).toEqual('1.0.0')
})

test('csproj does not have version element', () => {
  const proj = `<Project><aersion>1.0.0</aersion></Project>`

  const version = getVersionFromCsproj(proj)

  expect(version).toEqual('')
})
