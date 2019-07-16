import { Component, OnInit } from '@angular/core';
import { GitlabApiService } from '../../services/gitlab-api/gitlab-api.service';
import * as emoji from 'node-emoji';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  public mr_url: string
  public requests: Array<any>
  public mapOfExpandData: { [key: string]: boolean } = {}

  constructor(
    private gitlab: GitlabApiService
  ) { }

  private emojiMissed(name: string): string {
    if (name === 'wip') {
      return emoji.emojify(`:construction:`)
    }

    return `:${name}:`
  }

  public emoji(str: string): string {
    return emoji.emojify(str, this.emojiMissed)
  }

  ngOnInit() {
    this.gitlab.requests.subscribe(requests => this.requests = requests)
    this.gitlab.mr_url.subscribe(mr_url => this.mr_url = mr_url)
  }
}
