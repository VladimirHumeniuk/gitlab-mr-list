import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GitlabApiService } from '../../services/gitlab-api/gitlab-api.service';
import { LABELS_COLORS } from '../../constants/constants'
import * as emoji from 'node-emoji';
import * as md from 'markdown';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  public mr_url: string
  public requests: Array<any>
  public mapOfExpandData: { [key: string]: boolean } = {}
  public labelColors = LABELS_COLORS

  constructor(
    private gitlab: GitlabApiService,
    private router: Router
  ) { }

  private emojiMissed(name: string): string {
    if (name === 'wip') {
      return emoji.emojify(`:construction:`)
    }

    return `:${name}:`
  }

  public markdown(text: string): string {
    return md.markdown.toHTML(text)
  }

  public emoji(str: string): string {
    return emoji.emojify(str, this.emojiMissed)
  }

  public logout(): void {
    this.gitlab.logOut()
    this.router.navigate([''])
  }

  ngOnInit() {
    this.gitlab.requests.subscribe(requests => this.requests = requests)
    this.gitlab.mr_url.subscribe(mr_url => this.mr_url = mr_url)
  }
}
