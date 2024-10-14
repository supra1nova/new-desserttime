import { PageRequest } from '../../common/dto/page.request';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SearchReviewWriterTypeEnum, SearchReviewStatusEnum, SearchReviewContentsTypeEnum } from './review.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AdminSearchReviewDto extends PageRequest {
  @ApiProperty({
    enum: SearchReviewStatusEnum,
    isArray: false,
    description: '검색 대상 리뷰 상태 : 대기 / 등록 / 신고 / 삭제',
    required: false,
  })
  @IsEnum(SearchReviewStatusEnum)
  @IsOptional()
  readonly searchReviewStatus?: SearchReviewStatusEnum;

  @ApiProperty({
    enum: SearchReviewWriterTypeEnum,
    isArray: false,
    description: '검색 대상 리뷰 작성자 유형 : nickName / email',
    required: false,
  })
  @IsEnum(SearchReviewWriterTypeEnum)
  @IsOptional()
  readonly searchReviewWriterType?: SearchReviewWriterTypeEnum;

  @ApiProperty({
    type: String,
    description: '검색 대상 리뷰 작성자',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly searchReviewWriterValue?: string;

  @ApiProperty({
    enum: SearchReviewContentsTypeEnum,
    isArray: false,
    description: '검색 대상 컨텐츠 유형 : title / content',
    required: false,
  })
  @IsEnum(SearchReviewContentsTypeEnum)
  @IsOptional()
  readonly searchReviewContentsType?: SearchReviewContentsTypeEnum;

  @ApiProperty({
    type: String,
    description: '검색 대상 제목/내용',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly searchReviewContentsValue?: string;
}
