import {Component, OnInit} from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import {Immunization} from '../../models/resources/immunization';
import {Router} from '@angular/router';

@Component({
  selector: 'fhir-immunization-list',
  templateUrl: './immunization-list.component.html',
  styleUrls: ['./immunization-list.component.scss']
})
export class ImmunizationListComponent implements OnInit {

  resources: Immunization[];

  constructor(private resourceService: ResourceService, private router: Router) {
  }

  ngOnInit(): void {
    this.resourceService.fetchAllResources().subscribe(data => this.resources = data);
  }

  getAllResourceKeys(): string[] {
    const sampleObject = {};
    this.resources.forEach(resource => Object.assign(sampleObject, resource));
    const keys = Object.keys(sampleObject);
    return keys;
  }

  getAllColumnKeys(): string[] {
    return this.getAllResourceKeys().concat(['operations']).filter(key => key !== 'fsId');
  }

  modify(resource: Immunization): void {
    console.log('edit');
    this.router.navigate(['edit', resource.identifier[0].value]);
  }

  deleteEntry(resource: Immunization): void {
    this.resourceService.deleteImmunizationResourceEntry(resource)
      .then(() => console.log('deleted: ', resource.identifier[0].value))
      .catch(error => console.error('Error deleting entry: ', error));
  }
}
