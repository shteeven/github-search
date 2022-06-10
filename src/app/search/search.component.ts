import { Component } from '@angular/core';
import { SearchApiService } from './search-api.service';

@Component({
  template: ` {{ results$ | async | json }} `
})
export class SearchComponent {
  results$ = this.api.getList({ query: 'steven' });
  constructor(private api: SearchApiService) {}
}
