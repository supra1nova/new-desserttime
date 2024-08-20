import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { v1 as uuid } from 'uuid';

//파일 저장 경로 관리
// 폴더가 존재하지 않으면 폴더를 생성하고, 존재하면 생성하지 않음
const mkdir = (directory: string) => {
  try {
    const directories = [process.env.REVIEW_IMG_MIDDLE_PATH];

    if (!fs.existsSync(path.join(process.env.ROOT_PATH))) {
      fs.mkdirSync(path.join(process.env.ROOT_PATH));
    }
    for (const dir of directories) {
      if (!fs.existsSync(path.join(process.env.ROOT_PATH, dir))) {
        fs.mkdirSync(path.join(process.env.ROOT_PATH, dir));
      }
    }
  } catch (err) {
    throw err;
  }
};

mkdir('uploads');

export const multerOptionsFactory = (): MulterOptions => {
  const destinationMappings = {
    reviewImg: process.env.REVIEW_IMG_MIDDLE_PATH,
  };
  return {
    storage: multer.diskStorage({
      destination(req, file, cd) {
        //const prefix = file.originalname.slice(0, 5);
        const destination = destinationMappings['reviewImg']; // || process.env.dumpfile;
        cd(null, path.join(process.env.ROOT_PATH, destination));
      },

      filename(req, file, cd) {
        // 파일의 이름을 설정
        const ext = path.extname(file.originalname); // 파일 확장자 추출
        const basename = path.basename(file.originalname, ext); // 파일 이름
        // 파일 이름이 중복되는 것을 막기 위해 '파일이름_uuid.확장자' 의 형식으로 파일이름을 지정
        cd(null, `${basename}_${uuid().substring(0, 10)}.${ext}`);
      },
    }),
    limits: { fileSize: 1000 * 1024 * 1024 }, // 1gb로 크기를 제한
  };
};
