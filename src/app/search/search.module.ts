import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchApiService } from './search-api.service';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule],
  declarations: [SearchComponent],
  providers: [SearchApiService]
})
export class SearchModule {}
