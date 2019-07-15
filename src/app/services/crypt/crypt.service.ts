import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as crypto from 'crypto-js';
import { Gitlab } from 'src/app/models/Gitlab';
import { COOKIES_EXPIRED } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  constructor(
    protected cookieService: CookieService,
  ) { }

  protected generateKey(): void {
    const key = crypto.lib.WordArray.random(32);
    this.cookieService.set('tn', key, COOKIES_EXPIRED)
  }

  public encrypt(data: Gitlab): any {
    this.generateKey()

    return crypto.AES.encrypt(
      JSON.stringify(data),
      this.cookieService.get('tn').toString()
    )
  }

  public decrypt(data: string): Gitlab {
    return JSON.parse(crypto.AES.decrypt(
      data,
      this.cookieService.get('tn').toString()
    ).toString(crypto.enc.Utf8))
  }
}
