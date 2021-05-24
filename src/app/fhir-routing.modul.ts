import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploaderComponent} from './components/uploader/uploader.component';
import {HomeComponent} from './components/home/home.component';
import {ImmunizationListComponent} from './components/immunization-list/immunization-list.component';
import {EntryEditerComponent} from './components/entry-editer/entry-editer.component'; // CLI imports router

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ImmunizationListComponent },
  { path: 'upload', component: UploaderComponent },
  { path: 'edit/:id', component: EntryEditerComponent },
  { path: 'contact', component: HomeComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FhirRoutingModule { }
