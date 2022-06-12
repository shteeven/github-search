import { Component } from '@angular/core';
import { SearchApiService } from './search-api.service';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
  throttleTime
} from 'rxjs';
import { switchMapAsResource } from '../operators/switch-map-as-resource';

@Component({
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent {
  private searchValueSource = new BehaviorSubject('steven');
  searchValue$ = this.searchValueSource.pipe(map((value) => value?.trim()));

  private selectedFilterSource = new BehaviorSubject('users');
  selectedFilter$ = this.selectedFilterSource.asObservable();

  private pageIndexSource = new BehaviorSubject(0);
  pageIndex$ = this.pageIndexSource.asObservable();

  private pageSizeSource = new BehaviorSubject(10);
  pageSize$ = this.pageSizeSource.asObservable();

  private results$ = combineLatest([
    this.searchValue$,
    this.pageIndex$.pipe(debounceTime(300)),
    this.pageSize$
  ]).pipe(
    tap((val) => console.log(val)),

    switchMapAsResource(([searchValue, pageIndex, pageSize]) => {
      if (!searchValue) return of(null);
      return this.api.getUserList({
        query: searchValue,
        size: pageSize,
        index: pageIndex
      });
    }),
    tap((val) => console.log(val)),

    shareReplay({
      refCount: true,
      bufferSize: 1
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
