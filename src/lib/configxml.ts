import * as fs from 'fs';
import * as path from 'path';
import * as semver from 'semver';

import { parse, write } from './xml';

export const configNotFoundError = `config.xml NOT FOUND !\nTry to run the command from a cordova dir containing
 config.xml or run the help command to learn more on how specify the path to this directory`;

export async function updateVersion(version: string, directory: string) {
  if (!semver.valid(version)) {
    throw Error('This version is not valid. Please try to enter a valid version.');
  }

  if (semver.prerelease(version)) {
    throw Error('The config.xml should not contain a pre-released version. Please enter a released version.');
  }

  const configXml = getConfigXmlPath(directory);
  const config: SnowConfig = await parse(configXml);
  config.widget.$.version = version;
  write(configXml, config);
}

export async function updatePackage(id: string, directory: string) {
  const packageRegex = /^[A-Za-z]{2,6}((?!-)\.[A-Za-z0-9-]{1,63}(?!-))+$/i;
  if (!id.match(packageRegex)) {
    throw Error('This package id is not valid. Please try to enter a valid package identifier.');
  }

  const configXml = getConfigXmlPath(directory);
  const config: SnowConfig = await parse(configXml);
  config.widget.$.id = id;
  write(configXml, config);
}

export function configExists(file: string): boolean {
  return fs.existsSync(file);
}

export async function getVersion(directory: string) {
  const configFile: SnowConfig = await parse(getConfigXmlPath(directory));

  return configFile.widget.$.version;
}

export async function getPackageId(directory: string) {
  const configFile: SnowConfig = await parse(getConfigXmlPath(directory));

  return configFile.widget.$.id;
}

function getConfigXmlPath(directory: string) {
  const filePath = path.join(directory, 'config.xml');

  if (!configExists(filePath)) {
    throw new Error(configNotFoundError);
  }

  return filePath;
}
