import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedQuery, QueryResponse } from './search.models';
import { map, Observable, of, switchMap, tap, zip } from 'rxjs';
import { UserDetails } from '../models/details.models';

@Injectable()
export class SearchApiService {
  private _baseApiUrl = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  getUserList({
    query,
    size,
    sort,
    index,
    searchType
  }: PaginatedQuery): Observable<QueryResponse<UserDetails>> {
    return of({
      total_count: 47066,
      incomplete_results: false,
      items: [
        {
          login: 'steven',
          id: 7546,
          node_id: 'MDQ6VXNlcjc1NDY=',
          avatar_url: 'https://avatars.githubusercontent.com/u/7546?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/steven',
          html_url: 'https://github.com/steven',
          followers_url: 'https://api.github.com/users/steven/followers',
          following_url:
            'https://api.github.com/users/steven/following{/other_user}',
          gists_url: 'https://api.github.com/users/steven/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/steven/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/steven/subscriptions',
          organizations_url: 'https://api.github.com/users/steven/orgs',
          repos_url: 'https://api.github.com/users/steven/repos',
          events_url: 'https://api.github.com/users/steven/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/steven/received_events',
          type: 'User',
          site_admin: false,
          score: 1,
          name: 'Steven Thompson',
          company: 'Den Creative',
          blog: 'www.dencreative.com',
          location: 'London, UK',
          hireable: true,
          bio: 'Head of Technology at Den Creative an Elixirr Company',
          public_repos: 7,
          public_gists: 0,
          followers: 5,
          following: 0,
          created_at: '2008-04-16T10:13:23Z',
          updated_at: '2022-03-25T18:48:01Z'
        },
        {
          login: 'styfle',
          id: 229881,
          node_id: 'MDQ6VXNlcjIyOTg4MQ==',
          avatar_url: 'https://avatars.githubusercontent.com/u/229881?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/styfle',
          html_url: 'https://github.com/styfle',
          followers_url: 'https://api.github.com/users/styfle/followers',
          following_url:
            'https://api.github.com/users/styfle/following{/other_user}',
          gists_url: 'https://api.github.com/users/styfle/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/styfle/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/styfle/subscriptions',
          organizations_url: 'https://api.github.com/users/styfle/orgs',
          repos_url: 'https://api.github.com/users/styfle/repos',
          events_url: 'https://api.github.com/users/styfle/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/styfle/received_events',
          type: 'User',
          site_admin: false,
          score: 1,
          name: 'Steven',
          company: '@vercel',
          blog: 'https://styfle.dev',
          location: '::1',
          bio: '🐏Software Shepherd,\r\n🛡️TypeScript enthusiast,\r\n✏️@markedjs maintainer,\r\n💚@nodejs contributor,\r\n⚛️@reactjs user,  \r\n🤵husband of @ksnydes,\r\n✝️Jesus lover',
          twitter_username: 'styfle',
          public_repos: 435,
          public_gists: 16,
          followers: 1692,
          following: 958,
          created_at: '2010-03-25T01:40:27Z',
          updated_at: '2022-05-02T21:05:28Z'
        },
        {
          login: 'steventroughtonsmith',
          id: 45212,
          node_id: 'MDQ6VXNlcjQ1MjEy',
          avatar_url: 'https://avatars.githubusercontent.com/u/45212?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/steventroughtonsmith',
          html_url: 'https://github.com/steventroughtonsmith',
          followers_url:
            'https://api.github.com/users/steventroughtonsmith/followers',
          following_url:
            'https://api.github.com/users/steventroughtonsmith/following{/other_user}',
          gists_url:
            'https://api.github.com/users/steventroughtonsmith/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/steventroughtonsmith/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/steventroughtonsmith/subscriptions',
          organizations_url:
            'https://api.github.com/users/steventroughtonsmith/orgs',
          repos_url: 'https://api.github.com/users/steventroughtonsmith/repos',
          events_url:
            'https://api.github.com/users/steventroughtonsmith/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/steventroughtonsmith/received_events',
          type: 'User',
          site_admin: false,
          score: 1,
          name: 'Steven Troughton-Smith',
          company: 'High Caffeine Content',
          blog: 'http://www.highcaffeinecontent.com',
          location: 'Dublin, Ireland',
          twitter_username: 'stroughtonsmith',
          public_repos: 84,
          public_gists: 41,
          followers: 1690,
          following: 2,
          created_at: '2009-01-08T23:51:31Z',
          updated_at: '2022-06-05T01:42:50Z'
        }
      ]
    });

    // const queryProperties = [
    //   `q=${encodeURIComponent(query)}`,
    //   `s=${sort?.property || ''}`,
    //   `p=${index || 0}`,
    //   `o=${sort?.direction || ''}`,
    //   `per_page=${size || 3}`
    // ];
    // return this.http
    //   .get<QueryResponse<UserDetails>>(
    //     `${this._baseApiUrl}/users?${queryProperties.join('&')}`
    //   )
    //   .pipe(
    //     switchMap((res) => {
    //       const detailsReqs = res.items.map((item) =>
    //         this.http.get<UserDetails>(`${item.url}`)
    //       );
    //       return zip(detailsReqs).pipe(
    //         map((itemsDetails) => {
    //           return {
    //             ...res,
    //             items: res.items.map((item, index) => ({
    //               ...item,
    //               ...itemsDetails[index]
    //             }))
    //           };
    //         }),
    //         tap((val) => console.log(val))
    //       );
    //     })
    //   );
  }
}
