import { Component } from '@angular/core';
import { SearchApiService } from './search-api.service';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';

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
    })
  );

  constructor(private api: SearchApiService) {}

  updateSearchValue(value: string) {
    this.searchValueSource.next(value);
  }
}
