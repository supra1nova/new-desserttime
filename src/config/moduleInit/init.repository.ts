import { Injectable, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuid } from 'uuid';

@Injectable()
export class InitRepository {
  constructor() {}

  async insertAdmin() {}
  //   async insertAdmin() {
  //     const user = await this.userRepository.findOne({
  //       where: { userId: process.env.USER_ID },
  //     });
  //     if (!user) {
  //       const hashedUserPw: string = await bcrypt.hash(process.env.USER_PW, 10);
  //       await this.userRepository.insert({
  //         userId: process.env.USER_ID,
  //         userPw: hashedUserPw,
  //         userName: process.env.USER_NAME,
  //         team: process.env.TEAM,
  //         rank: process.env.RANK,
  //         qualification: process.env.QUALIFICATION,
  //       });
  //     }
  //   }
  //
  //   async insertMail() {
  //     const mail = await this.mailRepository.findOne({
  //       where: { usable: true },
  //     });
  //     if (!mail) {
  //       const hashedMailPw: string = await bcrypt.hash(process.env.EMAIL_PW, 10);
  //       await this.mailRepository.insert({
  //         mailServer: process.env.MAIL_SERVER,
  //         mailPort: Number(process.env.MAIL_PORT),
  //         mailSenderName: process.env.MAIL_SENDER_NAME,
  //         email: process.env.EMAIL,
  //         emailPw: process.env.EMAIL_PW,
  //         usable: Boolean(process.env.EMAIL_USABLE),
  //       });
  //     }
  //   }
  //
  //   async insertAuthorings() {
  //     const basicAuthoringCount = await this.authoringRepository.count({
  //       where: { basicStatus: true, visible: true },
  //     });
  //     if (basicAuthoringCount < Number(process.env.BASIC_AUTHIRUNG_NUM)) {
  //       const inesertCount =
  //         Number(process.env.BASIC_AUTHIRUNG_NUM) - basicAuthoringCount;
  //       console.log(inesertCount);
  //       let authoringData = [];
  //       for (let i = 0; i < inesertCount; i++) {
  //         authoringData.push({ basicStatus: true, visible: true });
  //       }
  //       await this.authoringRepository.save(authoringData);
  //     }
  //   }
  //
  //   /**
  //    * QR 시리얼키 생성
  //    * @param qrSerialDto
  //    */
  //   async insertQr() {
  //     const qrCount = await this.qrRepository.count({
  //       where: { usable: true },
  //     });
  //     if (qrCount > 0) return;
  //     const qrSerialNumber = uuid().substring(0, 10);
  //     await this.qrRepository.insert({ qrSerialNumber });
}
