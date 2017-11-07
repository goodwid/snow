import * as colors from 'colors';
import { updatePackage, configExists, configNotFoundError } from '../lib/configxml';

export function cmd(program: any) {
  program
    .command('package <id>')
    .alias('p')
    .option('-d, --dir [dir]', 'optional config.xml directory path', '.')
    .description('Updates the package identifier in the config.xml of the current cordova mobile repo')
    .action(async (id: string, options: any) => {
      const dir = options.dir;
      if (!configExists(dir)) {
        return console.log(colors.red.bold(configNotFoundError));
      }

      try {
        await updatePackage(id, dir);
        console.log(colors.green('You are ready to go !\nThe config.xml was updated with new package identifier ') + colors.rainbow(id));
      } catch (e) {
        console.log(colors.red.bold(e.message));
      }
    });
}
