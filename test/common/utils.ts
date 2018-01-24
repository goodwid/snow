import * as fs from 'fs';

export async function createTmpXml(dirName: string) {
  return new Promise((resolve) => {
    const t = fs
      .createReadStream(`${__dirname}/../data/config.xml`)
      .pipe(fs.createWriteStream(`${dirName}/config.xml`));

    t.on('finish', resolve);
  });
}
