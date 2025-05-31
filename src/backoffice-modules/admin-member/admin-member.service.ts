import { Injectable } from '@nestjs/common';
import { Page } from '../common/dto/page.dto';
import { AdminMemberRepository } from './admin-member.repository';
import { SearchAdminMemberDto } from './model/search-admin-member.dto';
import { UpdateAdminMemberDto } from './model/update-admin-member.dto';
import { DeleteAdminMemberDto } from './model/delete-admin-member.dto';
import { Member } from '../../config/entities/member.entity';
import { AdminUserInterestDessertService } from '../admin-user-interest-dessert/admin-user-interest-dessert.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class AdminMemberService {
  constructor(
    private adminMemberRepository: AdminMemberRepository,
    private userInterestDessertService: AdminUserInterestDessertService,
  ) {}

  /**
   * 회원 리스트 조회
   * @param searchAdminMemberDto
   * @returns Promise<Page<Member>>
   */
  async findAll(searchAdminMemberDto: SearchAdminMemberDto) {
    const total = await this.adminMemberRepository.count(searchAdminMemberDto);
    const items = await this.adminMemberRepository.findAll(searchAdminMemberDto);

    const pageNo = searchAdminMemberDto.pageNo;
    const limitSize = searchAdminMemberDto.limitSize;

    return new Page(pageNo, total, limitSize, items);
  }

  /**
   * 회원 단건 조회
   * @param memberId
   * @returns Promise<Member>
   */
  async findOneById(memberId: string) {
    const member = await this.adminMemberRepository.findOneById(memberId);
    if (member === null) {
      throw new Error('일치하는 회원 정보를 찾을 수 없습니다');
    }
    return member;
  }

  /**
   * 회원 정보 수정
   * @param memberId
   * @param updateAdminMemberDto
   * @returns Promise<boolean>
   */
  @Transactional()
  async update(memberId: string, updateAdminMemberDto: UpdateAdminMemberDto) {
    const memberData: Partial<Member> = {
      nickname: updateAdminMemberDto.nickname,
      memo: updateAdminMemberDto.memo,
      gender: updateAdminMemberDto.gender,
      firstCity: updateAdminMemberDto.firstCity,
      secondaryCity: updateAdminMemberDto.secondaryCity,
      thirdCity: updateAdminMemberDto.thirdCity,
      type: updateAdminMemberDto.type,
      adStatus: updateAdminMemberDto.isAgreeAD,
      alarmStatus: updateAdminMemberDto.isAgreeAlarm,
    };

    const uidIdArr: string[] = updateAdminMemberDto.uidIdArr;

    const result = await this.adminMemberRepository.update(memberId, memberData);

    if (result && uidIdArr !== undefined && uidIdArr.length > 0) {
      await this.userInterestDessertService.processInsertMultipleData(memberId, uidIdArr);
    }

    return result;
  }

  /**
   * 회원 삭제
   * @param memberId
   * @returns Promise<boolean>
   */
  @Transactional()
  async delete(memberId: string) {
    const deleteDto = new DeleteAdminMemberDto(memberId, false);
    return this.adminMemberRepository.delete(deleteDto);
  }
}
