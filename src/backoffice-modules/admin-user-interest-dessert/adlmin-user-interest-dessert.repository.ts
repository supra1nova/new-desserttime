import { InjectRepository } from '@nestjs/typeorm';
import { UserInterestDessert } from '../../config/entities/user.interest.dessert.entity';
import { Repository } from 'typeorm';
import { Member } from '../../config/entities/member.entity';

export class AdminUserInterestDessertRepository {
  constructor(
    @InjectRepository(UserInterestDessert)
    private adminUserInterestDessertRepository: Repository<UserInterestDessert>,
  ) {}

  /**
   * 취향 정보 단건 등록
   * @param userInterestDessert
   * @returns Promise<InsertResult>
   */
  async insert(userInterestDessert: UserInterestDessert) {
    return await this.adminUserInterestDessertRepository.insert(
      userInterestDessert,
    );
  }

  /**
   * 취향 정보 여러 건 등록
   * @param userInterestDessertArr
   */
  async insertMultipleItems(userInterestDessertArr: UserInterestDessert[]) {
    // TODO: 성능 상 for 문이 아니라 bulk 를 이용한 등록 필요
    for (const userInterestDessert of userInterestDessertArr) {
      await this.adminUserInterestDessertRepository.insert(userInterestDessert);
    }
  }

  /**
   * 특정 회원 취향 정보 리스트 조회
   * @param memberId
   * @returns Promise<UserInterestDessert>
   */
  async findListByMemberId(memberId: number) {
    const member = new Member();
    member.memberId = memberId;
    return await this.adminUserInterestDessertRepository.find({
      where: {
        member: member,
      },
    });
  }

  /**
   * 특정 회원 취향 정보 전체 삭제
   * @param savedUserInterestDessertArr
   * @returns Promise<DeleteResult>
   */
  async delete(savedUserInterestDessertArr: UserInterestDessert[]) {
    return await this.adminUserInterestDessertRepository
      .createQueryBuilder()
      .delete()
      .whereInIds(savedUserInterestDessertArr)
      .execute();
  }
}
