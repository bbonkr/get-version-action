import {expect, test} from '@jest/globals'
import {
  getVersion,
  getVersionFromCsproj,
  getVersionFromPackageJson
} from '../src/getVersion'

test('package.json file', async () => {
  const path = './assets/package.json'
  const result = await getVersion({project: path})

  expect(result).toEqual('1.0.0')
})

test('package-no-version.json file', async () => {
  const path = './assets/package-no-version.json'

  expect(getVersion({project: path})).rejects.toThrow(
    'Does not find the version'
  )
})

test('hello.csproj file', async () => {
  const path = './assets/hello.csproj'
  const result = await getVersion({project: path})

  expect(result).toEqual('1.0.0')
})

test('hello-no-version.csproj file', async () => {
  const path = './assets/hello-no-version.csproj'

  expect(getVersion({project: path})).rejects.toThrow(
    'Does not find the version'
  )
})

test('Throws not support file', async () => {
  const path = './assets/not-support.project'

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
  const proj = `<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
	<PropertyGroup>
    <Version>1.0.0</Version>
  </PropertyGroup>
</Project>`

  const version = getVersionFromCsproj(proj)

  expect(version).toEqual('1.0.0')
})

test('csproj does not have version element', () => {
  const proj = `<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <aersion>1.0.0</aersion>
  </PropertyGroup>
</Project>`

  const version = getVersionFromCsproj(proj)

  expect(version).toEqual('')
})

test('csproj has versionprefix element', () => {
  const proj = `<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <VersionPrefix>1.0.0</VersionPrefix>
  </PropertyGroup>
</Project>`

  const version = getVersionFromCsproj(proj)

  expect(version).toEqual('1.0.0')
})

test('csproj has versionPrefix and versionSuffix element', () => {
  const proj = `<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <VersionPrefix>1.0.0</VersionPrefix>
    <VersionSuffix>alpha</VersionSuffix>
  </PropertyGroup>
</Project>`

  const version = getVersionFromCsproj(proj)

  expect(version).toEqual('1.0.0-alpha')
})

test('csproj has versionSuffix element only', () => {
  const proj = `<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <VersionSuffix>alpha</VersionSuffix>
  </PropertyGroup>
</Project>`

  const version = getVersionFromCsproj(proj)

  expect(version).toEqual('')
})

test('csproj has version, versionPrefix and versionSuffix element', () => {
  const proj = `<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
	<PropertyGroup>
    <Version>1.0.0</Version>
    <VersionPrefix>2.0.0</VersionPrefix>
    <VersionSuffix>alpha</VersionSuffix>
  </PropertyGroup>    
</Project>`

  const version = getVersionFromCsproj(proj)

  expect(version).toEqual('1.0.0')
})

// test('csproj is invalid format', () => {
//   const proj = `<?xml version="1.0" encoding="utf-8"?>
// <Project Sdk="Microsoft.NET.Sdk">
// 	<PropertyGroup>
//     <Version>1.0.0</Version2>
//     <VersionPrefix>2.0.0</VersionPrefix1>
//     <VersionSuffix>alpha</VersionSuffix2>
//   </PropertyGroup>
// </Project>`

//   const version = getVersionFromCsproj(proj)

//   expect(version).toEqual('1.0.0')
// })
