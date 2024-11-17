import { IsOptional } from 'class-validator';

export class ResponseCursorPagination<T> {
  constructor(items: T[], limit: number, id: string) {
    this.items = items.length > limit ? items.slice(0, limit) : items; // limit에 맞게 잘라냄
    this.hasNextPage = items.length > limit;
    this.nextCursor = this.hasNextPage ? this.items[this.items.length - 1][id] : null;
  }

  @IsOptional()
  items: T[];

  @IsOptional()
  hasNextPage: boolean;

  @IsOptional()
  nextCursor: number | null;
}
