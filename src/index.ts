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

const cmd = commander
  .usage('<command> [options]')
  .version(pack.version);

cmd.on('command:*', (params: string[]) => {
  console.error(`Error : snow ${params[0]} is not a valid snow command. See 'snow --help'.`);
});

cmd.parse(process.argv);

if (!cmd.args.length) {
  cmd.help();
}
