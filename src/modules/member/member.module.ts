import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";
import { MemberRepository } from "./member.repository";

@Module({
    imports: [
      TypeOrmModule.forFeature([
      ]),
    ],
    exports: [],
    controllers: [MemberController],
    providers: [MemberService, MemberRepository],
  })
  export class MemberModule {}