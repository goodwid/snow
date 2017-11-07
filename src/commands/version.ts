import *  as colors from 'colors';
import { updateVersion, configExists, configNotFoundError } from '../lib/configxml';

export function cmd(program: any) {
  program
    .command('version <version>')
    .alias('v')
    .option('-d, --dir [dir]', 'optional config.xml directory path', '.')    
    .description('Updates the version in the config.xml of the current cordova mobile repo')
    .action(async (version: string, options: any) => {
      const dir = options.dir;
      if (!configExists(dir)) {
        return console.log(colors.red.bold(configNotFoundError));
      }

      try {
        await updateVersion(version, dir);
        console.log(colors.green('You are ready to go !\nThe config.xml was updated with new version ') + colors.rainbow(version))
      } catch (e) {
        console.log(colors.red.bold(e.message));
      }
    });
}
