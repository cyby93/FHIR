import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FhirRoutingModule} from './fhir-routing.modul';
import { MainComponent } from './main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { UploaderComponent } from './components/uploader/uploader.component';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './components/home/home.component';
import { ImmunizationListComponent } from './components/immunization-list/immunization-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FhirSelectInputComponent } from './components/input-fields/fhir-select-input/fhir-select-input.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import {environment} from '../environments/environment';
import {MatTableModule} from '@angular/material/table';
import { ImmunizationFormComponent } from './components/immunization-form/immunization-form.component';
import { EntryEditerComponent } from './components/entry-editer/entry-editer.component';
import { SentenceCasePipe } from './services/pipes/sentence-case.pipe';

@NgModule({
  declarations: [
    MainComponent,
    NavigationComponent,
    UploaderComponent,
    HomeComponent,
    ImmunizationListComponent,
    FhirSelectInputComponent,
    ImmunizationFormComponent,
    EntryEditerComponent,
    SentenceCasePipe
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FhirRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule
  ],
  exports: [MatFormFieldModule],
  providers: [],
  bootstrap: [MainComponent]
})
export class FhirModule { }
