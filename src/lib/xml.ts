import * as fs from 'fs';
import * as xml2js from 'xml2js';

// tslint:disable-next-line:no-implicit-dependencies
import * as promisify from 'util.promisify';
// tslint:disable-next-line:no-duplicate-imports
import { convertableToString } from 'xml2js';

const readFile = promisify(fs.readFile);
const parseString = promisify(xml2js.parseString) as (d: convertableToString) => Promise<{}>;

export async function parse(file: string): Promise<any> {
  const xml = await readFile(file, 'utf-8');
  return parseString(xml);
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
