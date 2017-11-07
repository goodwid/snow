import * as fs from 'fs';
import { promisify } from 'util';

import * as xml2js from 'xml2js';

const readFile = promisify(fs.readFile);

export async function parse(file: string): Promise<any> {
  const xml = await readFile(file, 'utf-8');

  return new Promise((fulfil, reject) => {
    xml2js.parseString(xml, (err: Error, result: Response) => {
      if (err) {
        return reject(err);
      }

      fulfil(result);
    });
  });
}

export function write(file: string, xml: Object) {
  const builder = new xml2js.Builder({
    renderOpts: { pretty: true, indent: '  ', newline: '\n' },
    xmldec: { version: '1.0', encoding: 'UTF-8' },
    headless: false
  });

  const xmlString = builder.buildObject(xml);

  fs.writeFileSync(file, xmlString, 'utf-8');
}
