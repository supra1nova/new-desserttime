import { Injectable } from '@nestjs/common';
import { AdminUserInterestDessertRepository } from './adlmin-user-interest-dessert.repository';
import { UserInterestDessert } from '../../config/entities/user.interest.dessert.entity';
import { Member } from '../../config/entities/member.entity';
import { DessertCategory } from '../../config/entities/dessert.category.entity';

@Injectable()
export class AdminUserInterestDessertService {
  constructor(
    private adminUserInterestDessertRepository: AdminUserInterestDessertRepository,
  ) {}

  /**
   * 특정 회원 취향 정보 갱신 프로세스
   * - 특정 회원의 취향 정보를 불러와 임시 변수로 보관한 뒤
   * - 해당 회원의 취향 정보를 모두 삭제하고
   * - 새로 갱신된 취향 정보를 삽입함
   * */
  async processInsertMultipleData(memberId: number, uidIdArr: number[]) {
    //  memberId를 이용해서 해당하는 인원의 UserInterestDessert 를 가져와서 savedUserInterestDessertArr 에 저장
    const savedUserInterestDessertArr = await this.findByMemberId(memberId);

    if (
      savedUserInterestDessertArr === undefined ||
      savedUserInterestDessertArr === null
    ) {
      return;
    }

    //  memberId 에 해당하는 모든 savedUIDArr 정보를 UserInterestDessert 테이블에서 삭제
    await this.adminUserInterestDessertRepository.delete(
      savedUserInterestDessertArr,
    );

    //  uidIdArr 에 해당하는 모든 정보를 UserInterestDessert 테이블에 삽입
    const newUserInterestDessertArr = [];
    for (const uid of uidIdArr) {
      const newUserInterestDessert = new UserInterestDessert();

      const newMember = new Member();
      newMember.memberId = memberId;

      const newDessertCategory = new DessertCategory();
      newDessertCategory.dessertCategoryId = uid;

      newUserInterestDessert.member = newMember;
      newUserInterestDessert.dc = newDessertCategory;

      newUserInterestDessertArr.push(newUserInterestDessert);
    }

    await this.insertMultipleItems(newUserInterestDessertArr);
  }

  /**
   * 특정 회원 취향 정보 리스트 삽입
   * */
  async insertMultipleItems(userInterestDessertArr: UserInterestDessert[]) {
    return await this.adminUserInterestDessertRepository.insertMultipleItems(
      userInterestDessertArr,
    );
  }

  /**
   * 특정 회원 취향 정보 리스트 조회
   * */
  async findByMemberId(memberId: number) {
    return this.adminUserInterestDessertRepository.findListByMemberId(memberId);
  }

  /**
   * 특정 회원 취향 정보 삭제
   * */
  async delete(savedUserInterestDessertArr: UserInterestDessert[]) {
    return this.adminUserInterestDessertRepository.delete(
      savedUserInterestDessertArr,
    );
  }

  /*/!**
   * 취향 벌크 등록
   * @param memberId
   * @param uidIdArr
   * @returns Promise<InsertResult>
   *!/
  async create(memberId: number, uidIdArr: number[]) {
    const userInterestDessertArray = this.getMakeUserInterestDessertArray(
      memberId,
      uidIdArr,
    );
    return this.adminUserInterestDessertRepository.insert(
      userInterestDessertArray,
    );
  }*/

  /*private getMakeUserInterestDessertArray(
    memberId: number,
    uidIdArr: number[],
  ) {
    return uidIdArr.map((uidId) => {
      return {
        memberMemberId: memberId,
        dcDessertCategoryId: uidId,
      };
    });
  }*/
}
