import {Component, OnInit} from '@angular/core';
import {Immunization} from '../../models/resources/immunization';
import {ResourceService} from '../../services/resource.service';

@Component({
  selector: 'fhir-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  ngOnInit(): void {
  }

  submitUpload(resource: Immunization): void {
    this.resourceService.uploadNewImmunizationResource(resource);
  }
}
