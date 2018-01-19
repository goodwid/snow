#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

import * as commander from 'commander';

import * as pack from './package.json';

export function commandLoader(program: any) {
  const commands: any = {};
  const loadPath = path.join(path.dirname(__filename), 'commands');

  // Loop though command files
  fs.readdirSync(loadPath).filter((filename: string) => {
    return (/\.js$/.test(filename));
  }).forEach((filename: string) => {
    const name = filename.substr(0, filename.lastIndexOf('.'));
    const command = require(path.join(loadPath, filename));

    commands[name] = command.cmd(program);
  });

  return commands;
}

commandLoader(commander);

commander
  .usage('<command> [options]')
  .version(pack.version)
  .parse(process.argv);
