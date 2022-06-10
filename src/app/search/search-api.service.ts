import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedQuery, QueryResponse, SEARCH_TYPES } from './search.models';
import { Observable } from 'rxjs';

@Injectable()
export class SearchApiService {
  private _baseApiUrl = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  getList({
    query,
    size,
    sort,
    index,
    searchType
  }: PaginatedQuery): Observable<QueryResponse> {
    const queryProperties = [
      `q=${encodeURIComponent(query)}`,
      `s=${sort?.property || ''}`,
      `p=${index || 0}`,
      `o=${sort?.direction || ''}`,
      `per_page=${size || 20}`
    ];
    return this.http.get<QueryResponse>(
      `${this._baseApiUrl}/${
        searchType || SEARCH_TYPES.repositories
      }?${queryProperties.join('&')}`
    );
  }
}
