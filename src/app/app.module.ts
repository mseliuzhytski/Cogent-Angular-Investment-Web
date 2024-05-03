import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { InvestSipComponent } from './invest-sip/invest-sip.component';
import { InvestLumsumComponent } from './invest-lumsum/invest-lumsum.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvestIbmComponent } from './invest-ibm/invest-ibm.component';
import { IbmTableComponent } from './ibm-table/ibm-table.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IbmDirComponent } from './ibm-dir/ibm-dir.component';
import { InvestIbmMonthComponent } from './invest-ibm-month/invest-ibm-month.component';
import { IbmTableMComponent } from './ibm-table-m/ibm-table-m.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    InvestSipComponent,
    InvestLumsumComponent,
    HomePageComponent,
    InvestIbmComponent,
    IbmTableComponent,
    IbmDirComponent,
    InvestIbmMonthComponent,
    IbmTableMComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CanvasJSAngularChartsModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
