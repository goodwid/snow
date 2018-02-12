import * as fs from 'fs';
import * as xml2js from 'xml2js';

// tslint:disable-next-line:no-implicit-dependencies
import * as promisify from 'util.promisify';

const readFile = promisify(fs.readFile);

export async function parse(file: string): Promise<any> {
  const xml = await readFile(file, 'utf-8');

  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { explicitArray: false }, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}

export function write(file: string, xml: object) {
  const builder = new xml2js.Builder({
    renderOpts: { pretty: true, indent: '  ', newline: '\n' },
    xmldec: { version: '1.0', encoding: 'UTF-8' },
    headless: false,
  });

  const xmlString = builder.buildObject(xml);

  fs.writeFileSync(file, xmlString, 'utf-8');
}
