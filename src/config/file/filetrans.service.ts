import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileTransService {
  constructor() {}

  async uploadFiles(files: Array<Express.Multer.File>) {
    if (!files) {
      throw Error('파일이 존재하지 않습니다.');
    }
    return files;
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw Error('파일이 존재하지 않습니다.');
    }
    return file;
  }

  async downloadFile(filePath: string): Promise<Buffer> {
    //__dirname : 현재 디랙토리까지 경로,  process.cwd() : 프로젝트 경로,  __filename : 현재 파일까지의 경로
    const fileDirectoryPath = path.join(process.env.fileroot, filePath); //파일 풀경로
    const readStream = fs.createReadStream(fileDirectoryPath, {
      highWaterMark: 1000000000,
    });
    return new Promise(async (resolve, reject) => {
      readStream.on(
        'data',
        await function (fileData: Buffer) {
          resolve(fileData);
        }.bind(this),
      );
    });
  }

  //파일삭제
  async deleteFile(filePath: string) {
    const fileDirectoryPath = path.join(process.env.fileroot, filePath); //파일 풀경로
    fs.unlink(fileDirectoryPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  //폴더 안에 있는 파일목록 삭제
  async deleteFiles(filePath: string) {
    try {
      //fs.readdirSync : 해당경로의 파일들을 가져온다.
      const files = fs.readdirSync(path.join(process.env.fileroot, filePath));
      if (files.length) files.forEach((f) => this.deleteFile(path.join(filePath, f)));
    } catch (err) {
      console.error(err);
      return;
    }
  }
}
