import * as colors from 'colors';
import {
  configExists,
  configNotFoundError,
  getAppName,
} from '../lib/configxml';

export function cmd(program: any) {
  program
    .command('get-name')
    .alias('gn')
    .option('-d, --dir [dir]', 'optional config.xml directory path', '.')
    .description('Returns the current app name specified in the config.xml of the current cordova mobile repo')
    .action(async (options: any) => {
      const dir = options.dir;
      if (!configExists(dir)) {
        return console.log(colors.red.bold(configNotFoundError));
      }

      try {
        console.log(colors.green(await getAppName(dir)));
      } catch (e) {
        console.log(colors.red.bold(e.message));
      }
    });
}
