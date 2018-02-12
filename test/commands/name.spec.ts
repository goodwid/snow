import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as tmp from 'tmp';

import {
  configNotFoundError,
  updateName,
} from '../../src/lib/configxml';
import { parse } from '../../src/lib/xml';
import { createTmpXml } from '../common/utils';

const expect = chai.expect;
let tmpDir: any;
let dirName: string;

chai.use(chaiAsPromised);

beforeEach(async () => {
  tmpDir = tmp.dirSync({ unsafeCleanup: true });
  dirName = tmpDir.name;

  return createTmpXml(dirName);
});

describe('Updating name in config.xml file', () => {
  it('should fail when the config.xml is not a valid xml', async () => {
    const dirPath = `${__dirname}/../data/bad-format/`;
    await expect(updateName('my new app', dirPath)).to.eventually.rejected;
  });

  it('should fail when config.xml not found', async () => {
    await expect(updateName('my new app', 'some/path')).to.eventually.rejectedWith(Error, configNotFoundError);
  });

  it('should update the app name in config.xml', async () => {
    await updateName('my new app', dirName);

    const config = await parse(`${dirName}/config.xml`);
    expect(config.widget.name).to.eq('my new app');
  });
});
