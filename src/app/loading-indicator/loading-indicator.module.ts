import { NgModule } from '@angular/core';
import { LoadingDirective } from './loading-indicator.directive';

const exportItems: any = [LoadingDirective];

@NgModule({
  declarations: [...exportItems],
  exports: [...exportItems]
})
export class LoadingIndicatorModule {}
