import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsNotficationsPage } from './settings-notfications.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsNotficationsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsNotficationsPageRoutingModule {}
