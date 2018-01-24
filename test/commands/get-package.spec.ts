import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as tmp from 'tmp';

import {
  configNotFoundError,
  getPackageId,
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

describe('Getting the package id from config.xml file', () => {
  it('should fail when the config.xml is not a valid xml', async () => {
    const dirPath = `${__dirname}/../data/bad-format/`;
    await expect(getPackageId(dirPath)).to.eventually.rejected;
  });

  it('should fail when config.xml not found', async () => {
    await expect(getPackageId('some/path')).to.eventually.rejectedWith(Error, configNotFoundError);
  });

  it('should return the package from config.xml', async () => {
    const id = await getPackageId(dirName);

    expect(id).to.eq('com.ingicare.test');
  });
});
