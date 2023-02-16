import {expect, test} from '@jest/globals'
import {parseVersion} from '../src/version'

test('versoin string v1.2.3-pre.12+21', () => {
  // Arrange
  const value = 'v1.2.3-pre.12+21'
  // Act
  const version = parseVersion(value)
  // Assert
  expect(version.major).toBe(1)
  expect(version.minor).toBe(2)
  expect(version.patch).toBe(3)
  expect(version.preRelease).toBe('pre.12')
  expect(version.build).toBe('21')
})

test('versoin string v1.2.3', () => {
  // Arrange
  const value = 'v1.2.3'
  // Act
  const version = parseVersion(value)
  // Assert
  expect(version.major).toBe(1)
  expect(version.minor).toBe(2)
  expect(version.patch).toBe(3)
  expect(version.preRelease).toBe(undefined)
  expect(version.build).toBe(undefined)
})

test('versoin string v1.2.3-pre.1', () => {
  // Arrange
  const value = 'v1.2.3-pre.1'
  // Act
  const version = parseVersion(value)
  // Assert
  expect(version.major).toBe(1)
  expect(version.minor).toBe(2)
  expect(version.patch).toBe(3)
  expect(version.preRelease).toBe('pre.1')
  expect(version.build).toBe(undefined)
})

test('versoin string v1.2.3+21', () => {
  // Arrange
  const value = 'v1.2.3+21'
  // Act
  const version = parseVersion(value)
  // Assert
  expect(version.major).toBe(1)
  expect(version.minor).toBe(2)
  expect(version.patch).toBe(3)
  expect(version.preRelease).toBe(undefined)
  expect(version.build).toBe('21')
})

test('versoin string v1.2+21 invalid', () => {
  // Arrange
  const value = 'v1.2-pre.21+23'
  // Act
  // Assert

  expect(parseVersion(value)).rejects.toThrow('Invalid string as version')
})
