import { Component, OnInit } from '@angular/core';
import {Immunization} from '../../models/resources/immunization';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceService} from '../../services/resource.service';
import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'fhir-entry-editer',
  templateUrl: './entry-editer.component.html',
  styleUrls: ['./entry-editer.component.scss']
})
export class EntryEditerComponent implements OnInit {
  defaultResourceData: Observable<Immunization>;
  constructor(private activatedRoute: ActivatedRoute,
              private resourceService: ResourceService,
              private router: Router) {
    this.defaultResourceData = this.activatedRoute.params.pipe(
      take(1),
      switchMap((data: { id: string}) => {
        console.log('asd');
        return this.resourceService.fetchSpecificResource(data.id);
      }));
  }

  ngOnInit(): void {
  }

  submitModifications(resource: Immunization): void {
    console.log(resource);
    this.defaultResourceData.pipe(switchMap(oldResource => {
      return this.resourceService.updateImmunizationResourceData(Object.assign(oldResource, resource));
    })).pipe(take(1)).subscribe(() => this.router.navigate(['list']));

  }
}
