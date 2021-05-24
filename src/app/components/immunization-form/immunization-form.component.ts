import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VaccineCode} from '../../models/resources/vaccine-code.model';
import {
  Immunization,
  ImmunizationFundingSource,
  ImmunizationProgramEligibility,
  ImmunizationStatus,
  ImmunizationSubpotentReason
} from '../../models/resources/immunization';
import {ResourceType} from '../../models/resources/resource';
import {ResourceService} from '../../services/resource.service';
import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'fhir-immunization-form',
  templateUrl: './immunization-form.component.html',
  styleUrls: ['./immunization-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImmunizationFormComponent implements OnInit, OnDestroy {
  @Output()
  onSubmitEmitter = new EventEmitter<Immunization>();
  @Input()
  formActionLabel: string;
  @Input()
  defaultInputValues: Observable<Immunization>;

  private valuesSubscription: Subscription;
  entryUploadForm = this.formBuilder.group({
    status: ['', Validators.required],
    vaccineCode: ['', Validators.required],
    patient: ['', Validators.required],
    occurrenceDateTime: ['', Validators.required],
    reasonCode: ['', Validators.required],
    reasonReference: ['', Validators.required],
    isSubpotent: [false, Validators.required],
    subpotentReason: this.formBuilder.array([]),
    programEligibility: this.formBuilder.array([], Validators.required),
    fundingSource: ['', Validators.required],
    reaction: this.formBuilder.array([], Validators.required)
  });

  vaccineCodes = Object.values(VaccineCode);
  statusOptions = Object.values(ImmunizationStatus);
  subpotentReasons = Object.values(ImmunizationSubpotentReason);
  programEligibilities = Object.values(ImmunizationProgramEligibility);
  fundingSources = Object.values(ImmunizationFundingSource);
  reasonOptions = [
    {key: 429060002, value: 'Procedure to meet occupational requirement'}, {key: 281657000, value: 'Travel vaccinations'}];
  reasonReference = [ResourceType.DIAGNOSTIC_REPORT, ResourceType.OBSERVATION, ResourceType.CONDITION];

  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.setupFormGroupValues();
  }

  ngOnDestroy(): void {
    if (this.valuesSubscription) {
      this.valuesSubscription.unsubscribe();
    }
  }

  get subpotentReasonArray(): FormArray {
    return this.entryUploadForm.controls.subpotentReason as FormArray;
  }

  get programEligibilityArray(): FormArray {
    return this.entryUploadForm.controls.programEligibility as FormArray;
  }

  get reactionArray(): FormArray {
    return this.entryUploadForm.controls.reaction as FormArray;
  }

  addControlToFormArray(array: FormArray): void {
    const control = new FormControl(ImmunizationSubpotentReason.RECALL, Validators.required);
    array.push(control);
  }

  deleteFormArrayElementAt(array: FormArray, index: number): void {
    array.removeAt(index);
  }

  addReactionFormGroup(): void {
    const reactionForm = this.createReactionFormGroup();
    (this.entryUploadForm.controls.reaction as FormArray).push(reactionForm);
  }

  private createReactionFormGroup(): FormGroup {
    return this.formBuilder.group({
      date: [null, Validators.required],
      detail: ['', Validators.required],
      reported: [false, Validators.required]
    });
  }

  emitSubmission(): void {
    const resource = {} as Immunization;
    const errors = [];
    Object.keys(this.entryUploadForm.controls).forEach(key => {
      Object.assign(resource, {[key]: this.entryUploadForm.get(key).value});
      if (this.entryUploadForm.get(key).hasError('required')) {
        errors.push(key);
      }
    });

    if (!this.entryUploadForm.valid) {
      console.error('Errors: ', errors);
      this.validateAllFormFields(this.entryUploadForm);
    } else {
      this.onSubmitEmitter.emit(resource);
      this.entryUploadForm.reset();
    }
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  hasRequiredError(control: string): boolean {
    if (!this.entryUploadForm.controls[control]) {
      return false;
    }
    return this.entryUploadForm.controls[control].touched && this.entryUploadForm.controls[control].hasError('required');
  }

  private setupFormGroupValues(): void {
    if (this.defaultInputValues) {
      this.valuesSubscription = this.defaultInputValues.subscribe(imm => {
        Object.keys(imm).forEach(key => {
          if (this.entryUploadForm.controls[key]) {
            if (Array.isArray(imm[key])) {
              imm[key].forEach(item => {
                if (typeof item === 'object') {
                  const reactionFormGroup = this.createReactionFormGroup();
                  reactionFormGroup.setValue(item);
                  (this.entryUploadForm.controls[key] as FormArray).push(reactionFormGroup);
                } else {
                  (this.entryUploadForm.controls[key] as FormArray).push(new FormControl(item, Validators.required));

                }
              });
            } else {
              this.entryUploadForm.controls[key].setValue(imm[key]);
            }
          }
        });
        this.cd.detectChanges();
      });
      this.cd.detectChanges();
    }
  }
}
