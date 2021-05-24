import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {Identifier, IdentifierUse, Immunization} from '../models/resources/immunization';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private readonly resourceCollection: AngularFirestoreCollection<Immunization>;
  resources: Observable<Immunization[]>;
  constructor(private firestore: AngularFirestore) {
    this.resourceCollection = firestore.collection<Immunization>('resource');
    this.resources = this.resourceCollection.valueChanges({idField: 'fsId'});
  }

  fetchAllResources(): Observable<Immunization[]> {
    return from(this.resources);
  }

  fetchSpecificResource(id: string): Observable<Immunization> {
    return from(this.resourceCollection.doc<Immunization>(id).snapshotChanges()
      .pipe(map(changes => changes.payload.data())));
  }

  uploadNewImmunizationResource(resource: Immunization): Observable<any> {
    const identifier = this.createNewIdentifier();
    return from(this.resourceCollection.doc(identifier.value).set(Object.assign(resource, {identifier: [identifier]})));
  }

  updateImmunizationResourceData(resource): Observable<void> {
    return from(this.resourceCollection.doc(resource.identifier[0]?.value).update(resource)).pipe(take(1));
  }

  deleteImmunizationResourceEntry(resource: Immunization): Promise<void> {
    return this.resourceCollection.doc(resource.identifier[0]?.value).delete();
  }

  private createNewIdentifier(): Identifier {
    return {
      use: IdentifierUse.OFFICIAL,
      type: 'uuid',
      value: uuidv4()
    } as Identifier;
  }
}
