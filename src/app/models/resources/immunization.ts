import {DomainResource, Resource, ResourceType} from './resource';
import {VaccineCode} from './vaccine-code.model';
import {Reference} from './reference';

export class Immunization extends DomainResource {
  identifier?: Identifier[];
  status: ImmunizationStatus;
  statusReason?: ImmunizationStatusReason;
  vaccineCode: VaccineCode;
  patient: Reference<ResourceType.PATIENT>;
  encounter?: Reference<ResourceType.ENCOUNTER>;
  occurrenceDateTime: Date;
  recorded?: Date;
  primarySource?: boolean;
  reportOrigin?: ImmunizationOrigin;
  location?: Reference<ResourceType.LOCATION>;
  manufacturer?: Reference<ResourceType.ORGANIZATION>;
  lotNumber?: string;
  expirationDate?: Date;
  site?: ImmunizationSite;
  route?: ImmunizationRoute;
  doseQuantity?: Quantity;
  performer?: Performer[];
  note?: Annotation[];
  reasonCode?: ReasonCode;
  reasonReference: Reference<ResourceType.DIAGNOSTIC_REPORT | ResourceType.OBSERVATION | ResourceType.CONDITION>;
  isSubpotent: boolean;
  subpotentReason: ImmunizationSubpotentReason[];
  education?: Education[];
  programEligibility: ImmunizationProgramEligibility[];
  fundingSource: ImmunizationFundingSource;
  reaction: Reaction[];
  protocolApplied?: ProtocolApplied[];
}

export interface Identifier {
  use?: IdentifierUse;
  type?: unknown;
  system?: string;
  value?: string;
  period?: Period;
  assigner?: Reference<ResourceType.ORGANIZATION>;
}

export interface Period {
  start: Date;
  end: Date;
}
export enum IdentifierUse {
  USUAL = 'usual',
  OFFICIAL = 'official',
  TEMP = 'temp',
  SECONDARY = 'secondary',
  OLD = 'old'
}

export enum ImmunizationStatus {
  COMPLETED = 'completed',
  ENTERED_IN_ERROR = 'entered-in-error',
  NOT_DONE = 'not-done'
}

export enum ImmunizationStatusReason {
  IMMUNE= 'IMMUNE',
  MEDPREC = 'MEDPREC',
  OSTOCK = 'OSTOCK',
  PATOBJ = 'PATOBJ'
}

export enum ImmunizationOrigin {
  PROVIDER = 'provider',
  RECORD = 'record',
  RECALL = 'recall',
  'SCHOOL' = 'school'
}

export enum ImmunizationSite {
  LF = 'LA',
  RA = 'RA'
}

export enum ImmunizationRoute {
  IDINJ =	'IDINJ',
IM = 'IM',
NASINHLC = 'NASINHLC',
IVINJ = 'IVINJ',
PO = 'PO',
SQ = 'SQ',
TRNSDERM = 'TRNSDERM'
}

export interface Annotation {
  authorReference: Reference<ResourceType.ORGANIZATION | ResourceType.PATIENT | ResourceType.RELATED_PERSON | ResourceType.PRACTITIONER>;
  authorString?: string;
  time: Date;
  text: string;
}

export interface Performer {
  function: ImmunizationFunction;
  actor: Reference<ResourceType.ORGANIZATION | ResourceType.PRACTITIONER | ResourceType.PRACTITIONER_ROLE>;
}

export enum ImmunizationFunction {
  OP = 'OP',
  AP = 'AP'
}

export enum ImmunizationSubpotentReason {
  PARTIAL = 'partial',
  COLDCHAINBREAK = 'coldchainbreak',
  RECALL = 'recall'
}

export interface Education {
  documentType: string;
  reference: string;
  publicationDate: Date;
  presentationDate: Date;
}

export enum ImmunizationProgramEligibility {
  INELIGIBLE = 'ineligible',
  UNINSURED = 'uninsured'
}

export enum ImmunizationFundingSource {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export interface Reaction {
  date?: Date;
  detail?: Reference<ResourceType.OBSERVATION> | string;
  reported?: boolean;
}

export interface ProtocolApplied {
  series?: string;
  authority?: Reference<ResourceType.ORGANIZATION>;
  targetDisease?: any[];
  doseNumber: number | string;
  seriesDoses?: number | string;
}
export type Quantity = number;
export type ReasonCode = 429060002 | 281657000;
