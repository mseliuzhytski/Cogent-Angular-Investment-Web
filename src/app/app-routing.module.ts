import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestSipComponent } from './invest-sip/invest-sip.component';
import { InvestLumsumComponent } from './invest-lumsum/invest-lumsum.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { HomePageComponent } from './home-page/home-page.component';
import { IbmapicallService } from './ibmapicall.service';
import { InvestIbmComponent } from './invest-ibm/invest-ibm.component';
import { IbmTableComponent } from './ibm-table/ibm-table.component';
import { IbmDirComponent } from './ibm-dir/ibm-dir.component';
import { InvestIbmMonthComponent } from './invest-ibm-month/invest-ibm-month.component';
import { IbmTableMComponent } from './ibm-table-m/ibm-table-m.component';

const routes: Routes = [
  // {path:'',component:HomePageComponent},
  // {path:'user',component:UserInfoComponent},
  {path:'sip',component:InvestSipComponent},
  {path:'lumsum',component:InvestLumsumComponent},
  {path:'ibm',component:IbmDirComponent,
    children:[
      {path:'daily',component:InvestIbmComponent},
      {path:'dailytable',component:IbmTableComponent},
      {path:'monthly',component:InvestIbmMonthComponent},
      {path:'monthlytable', component:IbmTableMComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
