import {Resource} from './resource';

export class Reference<ResourceType> {
  reference?: string;
  type?: ResourceType;
  identifier?: unknown;
  display: string;

  constructor(referenceDisplayedName: string) {
    this.display = referenceDisplayedName;
  }
}
