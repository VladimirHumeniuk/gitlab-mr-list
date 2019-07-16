import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CryptService } from 'src/app/services/crypt/crypt.service';
import { COOKIES_EXPIRED } from '../../constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup-form',
  templateUrl: './setup-form.component.html',
  styleUrls: ['./setup-form.component.less']
})
export class SetupFormComponent implements OnInit {

  public setupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    protected crypt: CryptService,
    private router: Router,
  ) { }

  public formInit(): void {
    this.setupForm = this.formBuilder.group({
      host: ['', [
        Validators.required,
      ]],
      token: ['', [
        Validators.required
      ]],
      project: ['', [
        Validators.required,
      ]]
    })
  }

  get f () { return this.setupForm.controls; }

  public saveSetup(): boolean {
    if(this.setupForm.invalid) {
      const controls = this.f

      for (const i in controls) {
        controls[i].markAsDirty();
        controls[i].updateValueAndValidity();
      }
    }

    if(this.setupForm.valid) {
      this.cookieService.set('gitlab', this.crypt.encrypt(this.setupForm.value), COOKIES_EXPIRED);
      this.router.navigate(['dashboard'])
    }

    return
  }

  ngOnInit() {
    this.formInit();
  }
}
