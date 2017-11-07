import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as tmp from 'tmp';
import * as fs from 'fs';

import { updatePackage, configNotFoundError } from '../../src/lib/configxml';
import { parse } from '../../src/lib/xml';

const expect = chai.expect;
let tmpDir: any;
let dirName: string;

chai.use(chaiAsPromised);

beforeEach(async () => {
  tmpDir = tmp.dirSync({unsafeCleanup: true});
  dirName = tmpDir.name;
  fs
  .createReadStream(`${__dirname}/../data/config.xml`)
  .pipe(fs.createWriteStream(`${dirName}/config.xml`));
});

afterEach(() => {
  tmpDir.removeCallback();
});

describe('Updating package identifer in config.xml file', () => {
  it('should fail when the config.xml is not a valid xml', async () => {
    const dirPath = `${__dirname}/../data/bad-format/`;
    await expect(updatePackage('com.example.name', dirPath)).to.eventually.rejected;
  });

  it('should fail when config.xml not found', async () => {
    await expect(updatePackage('com.example.name', 'some/path')).to.eventually.rejectedWith(Error, configNotFoundError);
  });

  it('should fail when the version is not valid', async () => {
    await expect(updatePackage('com.example?.name_', dirName)).to.eventually.rejectedWith(Error, 'This package id is not valid. Please try to enter a valid package identifier.');
  });

  it('should update the package id in config.xml', async () => {
    await updatePackage('some.example.name', dirName);

    const config = await parse(`${dirName}/config.xml`)
    expect(config.widget.$.id).to.eq('some.example.name');
  });
});
