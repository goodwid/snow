import * as colors from 'colors';
import {
  configExists,
  configNotFoundError,
  getVersion,
} from '../lib/configxml';

export function cmd(program: any) {
  program
    .command('get-version')
    .alias('gv')
    .option('-d, --dir [dir]', 'optional config.xml directory path', '.')
    .description('Returns the version in the config.xml of the current cordova mobile repo')
    .action(async (options: any) => {
      const dir = options.dir;
      if (!configExists(dir)) {
        return console.log(colors.red.bold(configNotFoundError));
      }

      try {
        console.log(colors.green(await getVersion(dir)));
      } catch (e) {
        console.log(colors.red.bold(e.message));
      }
    });
}
