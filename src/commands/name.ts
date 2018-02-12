import * as colors from 'colors';
import {
  configExists,
  configNotFoundError,
  updateName,
} from '../lib/configxml';

export function cmd(program: any) {
  program
    .command('name <appName>')
    .alias('n')
    .option('-d, --dir [dir]', 'optional config.xml directory path', '.')
    .description('Updates the application name with the new provided one in the config.xml of the current cordova mobile repo')
    .action(async (appName: string, options: any) => {
      const dir = options.dir;
      if (!configExists(dir)) {
        return console.log(colors.red.bold(configNotFoundError));
      }

      try {
        await updateName(appName, dir);
        console.log(colors.green(`You are ready to go !\nThe config.xml was updated with new package
         identifier `) + colors.rainbow(appName));
      } catch (e) {
        console.log(colors.red.bold(e.message));
      }
    });
}
