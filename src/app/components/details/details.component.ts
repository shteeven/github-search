import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDetails } from '../../models/details.models';

@Component({
  selector: 'app-details',
  template: `
    <div class="divider py-4">
      <h3 class="flex gap-2">
        <img
          class="w-6 h-6 rounded-full"
          src="{{ item.avatar_url }}"
          alt="{{ getImageDescription() }}'s avatar"
        />
        <a href="{{ item.html_url }}">{{ item.name }}</a>
        <span>{{ item.login }}</span>
      </h3>
      <div>{{ item.location }}</div>
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
