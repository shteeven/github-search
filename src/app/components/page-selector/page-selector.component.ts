import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-selector',
  template: `
    <div class="flex justify-between">
      <button [disabled]="isPreviousDisabled()" (click)="previousPage()">
        Previous
      </button>
      <div>
        {{ pageIndex + 1 }}
      </div>
      <button [disabled]="isNextDisabled()" (click)="nextPage()">Next</button>
    </div>
  `
})
export class PageSelectorComponent {
  @Input() numberOfPages!: number;
  @Input() pageIndex!: number;

  @Output() pageSelected = new EventEmitter();

  previousPage() {
    this.pageSelected.emit(this.pageIndex - 1);
  }

  nextPage() {
    this.pageSelected.emit(this.pageIndex + 1);
  }

  isPreviousDisabled() {
    return this.pageIndex === 0;
  }

  isNextDisabled() {
    return this.pageIndex + 1 === this.numberOfPages;
  }
}
