import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-selector',
  template: `
    <div class="flex justify-between">
      <button
        class="btn-default"
        [disabled]="isPreviousDisabled()"
        (click)="previousPage()"
      >
        Prev
      </button>
      <div *ngIf="numberOfPages">{{ page }} / {{ numberOfPages }}</div>
      <button
        class="btn-default"
        [disabled]="isNextDisabled()"
        (click)="nextPage()"
      >
        Next
      </button>
    </div>
  `
})
export class PageSelectorComponent {
  @Input() numberOfPages!: number;
  @Input() page!: number;

  @Output() pageSelected = new EventEmitter();

  previousPage() {
    this.pageSelected.emit(this.page);
  }

  nextPage() {
    this.pageSelected.emit(this.page + 1);
  }

  isPreviousDisabled() {
    return this.page === 1;
  }

  isNextDisabled() {
    return !this.numberOfPages || this.page === this.numberOfPages;
  }
}
