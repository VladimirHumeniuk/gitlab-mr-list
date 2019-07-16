import { Component, OnInit } from '@angular/core';
import { GitlabApiService } from '../../services/gitlab-api/gitlab-api.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.less']
})
export class GenerateReportComponent implements OnInit {

  constructor(
    private gitlab: GitlabApiService
  ) { }

  public requests: Array<any>
  public mr_url: string
  public generatedText: string

  public generateText() {
    const requests = this.requests
    let needApprovals = []
    let readyForMerge = []

    if (requests) {
      requests.forEach(mr => {
        if (mr.approvals.approvals_left > 0) {
          needApprovals.push(mr)
        }

        if (mr.approvals.approvals_left === 0 && mr.approvals.merge_status === 'can_be_merged') {
          readyForMerge.push(mr)
        }
      })
    }

    let text = `Currently we have *${requests.length}* opened merge requests.
${readyForMerge.length > 0 ? `
Merge Requests ready for merge:\n${
  readyForMerge.map(mr => {
    return `- ${this.mr_url}${mr.iid}\n`
  }).join('')
}` : ''}
Merge Requests without approvals:\n${
  needApprovals.map(mr => {
    return `- ${this.mr_url}${mr.iid} | ${2 - mr.approvals.approvals_left}/2\n`
  }).join('')
}
_this is automatically generated message_`

    this.generatedText = text
  }

  ngOnInit() {
    this.gitlab.requests.subscribe(requests => this.requests = requests)
    this.gitlab.mr_url.subscribe(mr_url => this.mr_url = mr_url)
  }

}
