import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchApiService } from './search-api.service';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsModule } from '../components/details/details.module';
import { PageSelectorModule } from '../components/page-selector/page-selector.module';
import { LoadingIndicatorModule } from '../components/loading-indicator/loading-indicator.module';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    DetailsModule,
    PageSelectorModule,
    LoadingIndicatorModule
  ],
  declarations: [SearchComponent],
  providers: [SearchApiService]
})
export class SearchModule {}
