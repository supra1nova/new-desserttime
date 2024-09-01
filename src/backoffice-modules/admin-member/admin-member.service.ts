import { Injectable } from '@nestjs/common';
import { Page } from '../common/dto/page.dto';
import { AdminMemberRepository } from './admin-member.repository';
import { SearchAdminMemberDto } from './model/search-admin-member.dto';
import { UpdateAdminMemberDto } from './model/update-admin-member.dto';
import { DeleteAdminMemberDto } from './model/delete-admin-member.dto';
import { Member } from '../../config/entities/member.entity';
import { AdminUserInterestDessertService } from '../admin-user-interest-dessert/admin-user-interest-dessert.service';
import { Transactional } from 'typeorm-transactional';

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
  async processFindOneById(memberId: number) {
    return await this.adminMemberRepository.findOneById(memberId);
  }

  /**
   * 회원 정보 수정
   * @param memberId
   * @param updateAdminMemberDto
   * @returns Promise<boolean>
   */
  /*async update(memberId: number, updateAdminMemberDto: UpdateAdminMemberDto) {
    return this.adminMemberRepository.update(memberId, updateAdminMemberDto);
  }*/
  @Transactional()
  async update(memberId: number, updateAdminMemberDto: UpdateAdminMemberDto) {
    const memberData: Partial<Member> = {
      nickName: updateAdminMemberDto.nickName,
      memo: updateAdminMemberDto.memo,
      gender: updateAdminMemberDto.gender,
      firstCity: updateAdminMemberDto.firstCity,
      secondaryCity: updateAdminMemberDto.secondaryCity,
      thirdCity: updateAdminMemberDto.thirdCity,
      type: updateAdminMemberDto.type,
      isAgreeAD: updateAdminMemberDto.isAgreeAD,
      isAgreeAlarm: updateAdminMemberDto.isAgreeAlarm,
    };

    const userInterestDessertData: number[] = updateAdminMemberDto.uidIdArr;

    const result = await this.adminMemberRepository.update(memberId, memberData);

    if (result && userInterestDessertData !== undefined) {
      await this.userInterestDessertService.processInsertMultipleData(memberId, userInterestDessertData);
    }

    return result;
  }

  /**
   * 회원 삭제
   * @param memberId
   * @returns Promise<boolean>
   */
  @Transactional()
  async delete(memberId: number) {
    const deleteDto = new DeleteAdminMemberDto(memberId, false);
    return this.adminMemberRepository.delete(deleteDto);
  }
}
