import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as tmp from 'tmp';

import {
  configNotFoundError,
  getAppName,
} from '../../src/lib/configxml';
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

afterEach(() => {
  tmpDir.removeCallback();
});

describe('Getting the app name from config.xml file', () => {
  it('should fail when the config.xml is not a valid xml', async () => {
    const dirPath = `${__dirname}/../data/bad-format/`;
    await expect(getAppName(dirPath)).to.eventually.rejected;
  });

  it('should fail when config.xml not found', async () => {
    await expect(getAppName('some/path')).to.eventually.rejectedWith(Error, configNotFoundError);
  });

  it('should return the app name from config.xml', async () => {
    const name = await getAppName(dirName);

    expect(name).to.eq('Tabac info service');
  });
});
