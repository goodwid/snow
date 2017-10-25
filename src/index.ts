const minimist = require('minimist');
const config = require('./lib/configxml');

let argv = minimist(process.argv.slice(2), {
  alias: {
    v: 'version',
    pkg: 'package'
  }
});


if (argv.v && argv.pkg) {
  applyVersion(argv.v)
    .then(() => applyPackage(argv.pkg))
} else {
  if (argv.v) {
    applyVersion(argv.v)
  }

  if (argv.pkg) {
    applyPackage(argv.pkg)
  }
}


function applyVersion(v: string): Promise<void> {
  return config
    .version(v)
    .then(() => {
      console.log(`config.xml updated with new version ${v}`)
    });
}

function applyPackage(pkg: string): Promise<void> {
  return config
    .package(pkg)
    .then(() => {
      console.log(`config.xml updated with new version ${pkg}`)
    });
}