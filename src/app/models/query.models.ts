// export const SEARCH_TYPES = {
//   repositories: 'repositories',
//   users: 'users'
// } as const;
//
// export type SearchType = typeof SEARCH_TYPES[keyof typeof SEARCH_TYPES];

export const SORT_TYPES = {
  updated: 'updated',
  stars: 'stars',
  forks: 'forks',
  bestMatch: null
} as const;

export type SortByType = typeof SORT_TYPES[keyof typeof SORT_TYPES];

export interface Sort {
  direction: 'asc' | 'desc';
  property: SortByType;
}

export interface PaginatedQuery {
  query: string;
  index?: number;
  size?: number;
  sort?: Sort;
  // searchType?: SearchType;
}

export interface QueryResponse<T = any> {
  total_count: number;
  incomplete_results: boolean;
  items: Array<T>;
}
