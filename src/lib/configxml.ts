const xml = require('./xml');

function updateVersion(version: string): Promise<void> {
  return xml
    .parse('./config.xml')
    .then((config: SnowConfig) => {
      config.widget.$.version = version;
      xml.write('./config.xml', config);
    });
}

function updatePackage(packageName: string): Promise<void> {
  return xml
    .parse('./config.xml')
    .then((config: SnowConfig) => {      
      config.widget.$.id = packageName;
      xml.write('./config.xml', config);
    });
}

module.exports = {
  version: updateVersion,
  package: updatePackage
};
