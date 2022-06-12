import { Component } from '@angular/core';
import { SearchApiService } from './search-api.service';
import { BehaviorSubject, combineLatest, debounceTime, map, of } from 'rxjs';
import { switchMapAsResource } from '../operators/switch-map-as-resource';

@Component({
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent {
  private searchValueSource = new BehaviorSubject('');
  searchValue$ = this.searchValueSource.pipe(map((value) => value?.trim()));

  private selectedFilterSource = new BehaviorSubject('users');
  selectedFilter$ = this.selectedFilterSource.asObservable();

  private pageIndexSource = new BehaviorSubject(1);
  pageIndex$ = this.pageIndexSource.asObservable();

  private pageSizeSource = new BehaviorSubject(10);
  pageSize$ = this.pageSizeSource.asObservable();

  private results$ = combineLatest([
    this.searchValue$,
    this.pageIndex$,
    this.pageSize$
  ]).pipe(
    debounceTime(300),
    switchMapAsResource(([searchValue, pageIndex, pageSize]) => {
      if (!searchValue) return of(null);
      return this.api.getUserList({
        query: searchValue,
        size: pageSize,
        index: pageIndex
      });
    })
  );

  loading$ = this.results$.pipe(map((result) => result.loading));
  items$ = this.results$.pipe(map((result) => result?.payload?.items));
  count$ = this.results$.pipe(
    map((result) => result?.payload?.total_count ?? 0)
  );
  numberOfPages$ = combineLatest([this.pageSize$, this.count$]).pipe(
    map(([pageSize, count]) => Math.ceil(count / pageSize))
  );
  error$ = this.results$.pipe(map((result) => result.error));

  constructor(private api: SearchApiService) {}

  updateSearchValue(value: string): void {
    this.searchValueSource.next(value);
  }

  pageSelected($event: number): void {
    this.pageIndexSource.next($event);
  }

  trackById(_: number, item: { id: number }): number {
    return item.id;
  }
}
