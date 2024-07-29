export class Page<T> {
  pageNo: number;
  totalItem: number;
  limitSize: number;
  totalPage: number;
  items: T[];

  constructor(pageNo: number, totalCount: number, limitSize: number, items: T[]) {
    this.pageNo = pageNo;
    this.totalItem = totalCount;
    this.limitSize = limitSize;
    this.totalPage = Math.ceil(totalCount / limitSize);
    this.items = items;
  }
}
