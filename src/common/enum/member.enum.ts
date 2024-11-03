export enum MemberSearchType {
  MEMBER_EMAIL = 'memberEmail',
  NICKNAME = 'nickName',
}

export enum MemberGender {
  MALE = 'M',
  FEMALE = 'F',
  NONE = 'N',
}

export enum MemberType {
  NORMAL_USER = 'N',
  PRO_USER = 'P',
  ADMIN = 'A',
}

export enum MemberDeletion {
  INFREQUENCY = '자주사용하지 않아서',
  LACK = '디저트 정보가 부족해서',
  DIFFICULTY = '서비스 사용이 어려워서',
  ETC = '기타(직접입력)',
}
