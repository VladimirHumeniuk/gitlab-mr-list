import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProjectsBundle } from 'gitlab';
import { CryptService } from 'src/app/services/crypt/crypt.service';
import { Gitlab } from 'src/app/models/Gitlab';

@Injectable({
  providedIn: 'root'
})
export class GitlabApiService {
  public requestsSource: BehaviorSubject<any> = new BehaviorSubject(null)
  public requests = this.requestsSource.asObservable()

  public mr_urlSource: BehaviorSubject<string> = new BehaviorSubject('')
  public mr_url = this.mr_urlSource.asObservable()

  private g: Gitlab = this.crypt.decrypt(this.cookieService.get('gitlab'))

  protected api = new ProjectsBundle({
    host: this.g.host,
    token: this.g.token,
  })

  private getOpenedRequests(): Promise<any> {
    return this.api.MergeRequests.all({projectId: this.g.project, state: 'opened'})
  }

  private getRequestApprovals(mergerequestIId: number): Promise<any> {
    return this.api.MergeRequests.approvals(this.g.project, { mergerequestIId: mergerequestIId })
  }

  public getProjectInfo(): Promise<any> {
    return this.api.Projects.show(this.g.project)
  }

  public logOut(): void {
    this.cookieService.deleteAll()
  }

  constructor(
    protected cookieService: CookieService,
    protected crypt: CryptService
  ) {
    this.getOpenedRequests().then(requests => {
      if (requests) {
        let openedMr = requests

        openedMr.forEach((mr, i) => {
          this.getRequestApprovals(mr.iid).then(res => {
            openedMr[i]['approvals'] = res
            this.requestsSource.next(openedMr)
          })
        })
      }
    })

    this.getProjectInfo()
      .then(res => {
        this.mr_urlSource.next(`${res['web_url']}/merge_requests/`)
      })
  }
}
