import { Component } from '@angular/core';
import { SearchApiService } from './search-api.service';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  pluck,
  shareReplay,
  switchMap
} from 'rxjs';
import { QueryItem } from './search.models';

@Component({
  templateUrl: 'search.component.html'
})
export class SearchComponent {
  searchValueSource = new BehaviorSubject('');
  searchValue$ = this.searchValueSource
    .asObservable()
    .pipe(map((value) => value?.trim()));

  results$ = this.searchValue$.pipe(
    switchMap((value) => {
      if (!value) return of(null);
      return this.api.getList({ query: value });
    }),
    shareReplay({
      refCount: true,
      bufferSize: 1
    })
  );

  items$ = this.results$.pipe(map((result) => result?.items));
  count$ = this.results$.pipe(map((result) => result?.total_count));

  constructor(private api: SearchApiService) {}

  updateSearchValue(value: string) {
    this.searchValueSource.next(value);
  }
}
