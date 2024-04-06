import {expect, describe, it} from '@jest/globals'
import {parseVersion} from '../src/version'

describe('parseVersion tests', () => {
  it('should returns version when input value is valid as version', () => {
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

  it('should returns version when input value is valid as version without v prefix', () => {
    // Arrange
    const value = '1.2.3-pre.12+21'
    // Act
    const version = parseVersion(value)
    // Assert
    expect(version.major).toBe(1)
    expect(version.minor).toBe(2)
    expect(version.patch).toBe(3)
    expect(version.preRelease).toBe('pre.12')
    expect(version.build).toBe('21')
  })

  it('should returns version when input value does not have build and pre-release', () => {
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

  it('should returns version without v prefix when input value does not have build and pre-release', () => {
    // Arrange
    const value = '1.2.3'
    // Act
    const version = parseVersion(value)
    // Assert
    expect(version.major).toBe(1)
    expect(version.minor).toBe(2)
    expect(version.patch).toBe(3)
    expect(version.preRelease).toBe(undefined)
    expect(version.build).toBe(undefined)
  })

  it('should returns version when input value has pre-release and no build', () => {
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

  it('should returns version without v prefix when input value has pre-release and no build', () => {
    // Arrange
    const value = '1.2.3-pre.1'
    // Act
    const version = parseVersion(value)
    // Assert
    expect(version.major).toBe(1)
    expect(version.minor).toBe(2)
    expect(version.patch).toBe(3)
    expect(version.preRelease).toBe('pre.1')
    expect(version.build).toBe(undefined)
  })

  it('should returns version when input value has build and no pre-release', () => {
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

  it('should returns version without v prefix when input value has build and no pre-release', () => {
    // Arrange
    const value = '1.2.3+21'
    // Act
    const version = parseVersion(value)
    // Assert
    expect(version.major).toBe(1)
    expect(version.minor).toBe(2)
    expect(version.patch).toBe(3)
    expect(version.preRelease).toBe(undefined)
    expect(version.build).toBe('21')
  })

  it(`should throw error with message 'Invalid string as version' when input string is invalid as version`, () => {
    // Arrange
    const value = 'v1.2-pre.21+23'
    const fn = () => parseVersion(value)
    // Act

    // Assert
    expect(fn).toThrow('Invalid string as version')
  })

  it('should be format as semver ', () => {
    // Arrange
    const value = 'v1'
    // Act
    const fn = () => parseVersion(value)
    // Assert
    expect(fn).toThrow('Invalid string as version')
  })

  it('should be format as semver ', () => {
    // Arrange
    const value = 'v1.2'
    // Act
    const fn = () => parseVersion(value)
    // Assert
    expect(fn).toThrow('Invalid string as version')
  })

  it('should be format as semver ', () => {
    // Arrange
    const value = 'v1..3'
    // Act
    const fn = () => parseVersion(value)
    // Assert
    expect(fn).toThrow('Invalid string as version')
  })
})
