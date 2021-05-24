import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {ImmunizationStatus} from '../../../models/resources/immunization';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'fhir-select-input',
  templateUrl: './fhir-select-input.component.html',
  styleUrls: ['./fhir-select-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FhirSelectInputComponent),
    multi: true
  }]

})
export class FhirSelectInputComponent implements ControlValueAccessor, AfterViewInit {
  @Input()
  label: string;
  @Input()
  options: string[] = [];
  value: any;
  onTouched: () => void;
  onChange: (value) => void;
  disabled: boolean;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(input: any): void {
    this.value = input;
  }

  isInputAnObjectArray(): boolean {
    return this.options && typeof this.options[0] === 'object';
  }
}
