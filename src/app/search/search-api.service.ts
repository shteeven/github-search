import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedQuery, QueryResponse } from './search.models';
import { delay, map, Observable, of, switchMap, tap, zip } from 'rxjs';
import { UserDetails } from '../models/details.models';
import { searchResponseMock } from './search-mock';

@Injectable()
export class SearchApiService {
  private _baseApiUrl = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  getUserList({
    query,
    size,
    sort,
    index,
    searchType
  }: PaginatedQuery): Observable<QueryResponse<UserDetails>> {
    return of(searchResponseMock).pipe(delay(500)) as any;

    // const queryProperties = [
    //   `q=${encodeURIComponent(query)}`,
    //   `s=${sort?.property || ''}`,
    //   `p=${index || 0}`,
    //   `o=${sort?.direction || ''}`,
    //   `per_page=${size || 3}`
    // ];
    // return this.http
    //   .get<QueryResponse<UserDetails>>(
    //     `${this._baseApiUrl}/users?${queryProperties.join('&')}`
    //   )
    //   .pipe(
    //     switchMap((res) => {
    //       const detailsReqs = res.items.map((item) =>
    //         this.http.get<UserDetails>(`${item.url}`)
    //       );
    //       return zip(detailsReqs).pipe(
    //         map((itemsDetails) => {
    //           return {
    //             ...res,
    //             items: res.items.map((item, index) => ({
    //               ...item,
    //               ...itemsDetails[index]
    //             }))
    //           };
    //         }),
    //         tap((val) => console.log(val))
    //       );
    //     })
    //   );
  }
}
