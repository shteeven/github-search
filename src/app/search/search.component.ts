import { Component } from '@angular/core';
import { SearchApiService } from './search-api.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: 'search.component.html'
})
export class SearchComponent {
  results$ = this.api.getList({ query: 'steven' });
  searchValueSource = new BehaviorSubject('');
  searchValue$ = this.searchValueSource.asObservable();

  constructor(private api: SearchApiService) {}

  updateSearchValue(value: string) {
    this.searchValueSource.next(value);
  }
}
