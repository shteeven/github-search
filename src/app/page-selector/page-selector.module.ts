import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSelectorComponent } from './page-selector.component';

const exportItems: any = [PageSelectorComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...exportItems],
  exports: [...exportItems]
})
export class PageSelectorModule {}
