import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen flex flex-col">
      <header class="py-2 px-4">
        <h1 class="text-bold">Github API Search</h1>
      </header>
      <main class="flex-grow divider px-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  title = 'github-search';
}
