const fs = require('fs');
const xml2js = require('xml2js');

function parse(file: File): Promise<any> {
  let xml = fs.readFileSync(file, 'utf-8');

  return new Promise((fulfil, reject) => {
    xml2js.parseString(xml, (err: Error, result: Response) => {
      if (err) {
        return reject(err);
      }

      fulfil(result);
    });
  });
}

function write(file: File, xml: Object) {
  let builder = new xml2js.Builder({
    renderOpts: { pretty: true, indent: '  ', newline: '\n' },
    xmldec: { version: '1.0', encoding: 'UTF-8' },
    headless: false
  });

  let xmlString = builder.buildObject(xml);

  fs.writeFileSync(file, xmlString, 'utf-8');
}

module.exports = {
  parse: parse,
  write: write
};
