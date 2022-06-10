export type QueryItemType = 'User';

export const SEARCH_TYPES = {
  repositories: 'repositories',
  users: 'users'
} as const;

export type SearchType = typeof SEARCH_TYPES[keyof typeof SEARCH_TYPES];

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
  searchType?: SearchType;
}

export interface QueryItem {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: QueryItemType;
  site_admin: boolean;
  score: number;
}

export interface QueryResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Array<QueryItem>;
}
