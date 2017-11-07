import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as tmp from 'tmp';
import * as fs from 'fs';

import { updateVersion, configNotFoundError } from '../../src/lib/configxml';
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


describe('Updating version in config.xml file', () => {
  it('should fail when the config.xml is not a valid xml', async () => {
    const dirPath = `${__dirname}/../data/bad-format/`;
    await expect(updateVersion('2.0.0', dirPath)).to.eventually.rejected;
  });

  it('should fail when config.xml not found', async () => {
    await expect(updateVersion('2.0.0', 'some/path')).to.eventually.rejectedWith(Error, configNotFoundError);
  });

  it('should fail when the version is not valid', async () => {
    await expect(updateVersion('a.?.0', dirName)).to.eventually.rejectedWith(Error, 'This version is not valid. Please try to enter a valid version.');
  });

  it('should fail when the version not a release', async () => {
    await expect(updateVersion('1.0.0-alhpa1', dirName)).to.eventually.rejectedWith(Error, 'The config.xml should not contain a pre-released version. Please enter a released version.');
  });

  it('should update the version in config.xml', async () => {
    await updateVersion('2.0.0', dirName);

    const config = await parse(`${dirName}/config.xml`)
    expect(config.widget.$.version).to.eq('2.0.0');
  });
});
