import { IsNumber, IsOptional } from 'class-validator';
import { PageRequest } from '../../common/dto/page.request';
import { Type } from 'class-transformer';

export class AdminSearchDessertCategoryDto extends PageRequest {
  /** 카테고리 차수 번호 */
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  readonly sessionNum?: number = 0;

  /** 부모 카테고리 id */
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  readonly parentDCId?: number = 0;

  /** 디저트 카테고리 명 */
  @IsOptional()
  readonly dessertName: string;
}
