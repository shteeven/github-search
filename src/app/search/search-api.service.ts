import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedQuery, QueryResponse } from '../models/query.models';
import { map, Observable, switchMap, zip } from 'rxjs';
import { UserDetails } from '../models/details.models';

@Injectable()
export class SearchApiService {
  private _baseApiUrl = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  getUserList({
    query,
    size,
    sort,
    index
  }: PaginatedQuery): Observable<QueryResponse<UserDetails>> {
    const queryProperties = [
      `q=${encodeURIComponent(query)}`,
      `sort=${sort?.property || ''}`,
      `page=${index || 1}`,
      `order=${sort?.direction || ''}`,
      `per_page=${size || 3}`
    ];
    return this.http
      .get<QueryResponse<UserDetails>>(
        `${this._baseApiUrl}/users?${queryProperties.join('&')}`
      )
      .pipe(
        switchMap((res) => {
          const detailsReqs = res.items.map((item) =>
            this.http.get<UserDetails>(`${item.url}`)
          );
          return zip(detailsReqs).pipe(
            map((itemsDetails) => {
              return {
                ...res,
                items: res.items.map((item, index) => ({
                  ...item,
                  ...itemsDetails[index]
                }))
              };
            })
          );
        })
      );
  }
}
