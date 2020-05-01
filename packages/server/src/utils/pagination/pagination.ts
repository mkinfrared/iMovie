class Pagination<Entity> {
  result: Entity[];

  total: number;

  page: number;

  next?: number;

  previous?: number;

  constructor(result: Entity[], total: number, page: number) {
    this.result = result;

    this.total = total;

    this.page = page;
  }
}

export default Pagination;
