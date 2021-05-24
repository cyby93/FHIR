export class Resource {
  id: string;
  meta?: Meta;
  implicitRules?: string;
  language?: string;
}

export class DomainResource extends Resource {
  text?: string;
  contained: Resource;
}

export type Meta = unknown;

export enum ResourceType {
  IMMUNIZATION = 'Immunization',
  PATIENT = 'Patient',
  ORGANIZATION = 'Organization',
  ENCOUNTER = 'Encounter',
  LOCATION = 'Location',
  PRACTITIONER = 'Practitioner',
  PRACTITIONER_ROLE = 'PractitionerRole',
  RELATED_PERSON = 'RelatedPerson',
  CONDITION = 'Condition',
  OBSERVATION = 'Observation',
  DIAGNOSTIC_REPORT = 'DiagnosticReport'
}
