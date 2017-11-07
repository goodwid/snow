import * as fs from 'fs';
import * as path from 'path';
import * as semver from 'semver';

import { parse, write } from './xml';

export const configNotFoundError = 'config.xml NOT FOUND !\nTry to run the command from a cordova dir containing config.xml or run the help command to learn more on how specify the path to this directory';

export async function updateVersion(version: string, directory: string) {
  if (!configExists(directory)) {
    throw new Error(configNotFoundError);
  }

  if (!semver.valid(version)) {
    throw Error('This version is not valid. Please try to enter a valid version.');
  }

  if (semver.prerelease(version)) {
    throw Error('The config.xml should not contain a pre-released version. Please enter a released version.');
  } 

  const configXml = path.join(directory, 'config.xml');
  const config: SnowConfig = await parse(configXml);
  config.widget.$.version = version;
  write(configXml, config);
}

export async function updatePackage(id: string, directory: string) {
  if (!configExists(directory)) {
    throw new Error(configNotFoundError);
  }

  const packageRegex = /^[A-Za-z]{2,6}((?!-)\.[A-Za-z0-9-]{1,63}(?!-))+$/i;
  if (!id.match(packageRegex)) {
    throw Error('This package id is not valid. Please try to enter a valid package identifier.');
  }

  const configXml = path.join(directory, 'config.xml');
  const config: SnowConfig = await parse(configXml);
  config.widget.$.id = id;
  write(configXml, config);
}

export function configExists(directory: string): boolean {
  return fs.existsSync(path.join(directory, 'config.xml'));
} 
