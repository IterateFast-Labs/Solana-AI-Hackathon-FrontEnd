export interface PaginationParams {
  page: number;
  size: number;
}

export interface ListResponse<T> {
  count: number;
  list: T[];
}
