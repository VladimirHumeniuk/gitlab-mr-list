import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { ClipboardModule } from 'ngx-clipboard';
import { CookieService } from 'ngx-cookie-service';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TableComponent } from './components/table/table.component';
import { GenerateReportComponent } from './components/generate-report/generate-report.component';
import { SetupFormComponent } from './components/setup-form/setup-form.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    GenerateReportComponent,
    DashboardComponent,
    SettingsComponent,
    SetupFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule,
    ClipboardModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
