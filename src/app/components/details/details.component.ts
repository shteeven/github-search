import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDetails } from '../../models/details.models';

@Component({
  selector: 'app-details',
  template: `
    <div class="divider py-4 grid gap-1">
      <h3 class="flex gap-x-2 flex-wrap">
        <img
          class="w-6 h-6 rounded-full"
          src="{{ item.avatar_url }}"
          alt="{{ getImageDescription() }}'s avatar"
        />
        <a href="{{ item.html_url }}">{{ item.name }}</a>
        <a class="color-fg-muted" href="{{ item.html_url }}">{{
          item.login
        }}</a>
      </h3>
      <div>{{ item.bio }}</div>
      <div class="color-fg-muted">{{ item.location }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent {
  @Input() item!: UserDetails;

  getImageDescription() {
    return this.item.name || this.item.login;
  }
}
