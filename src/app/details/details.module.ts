import { DetailsComponent } from './details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const exportItems: any = [DetailsComponent];

@NgModule({
  imports: [CommonModule],
  exports: [...exportItems],
  declarations: [...exportItems]
})
export class DetailsModule {}
