import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ErrorMessageComponent } from './error-message.component';



@Component({
  selector: 'test-error-comp',
  template: `
  <form [formGroup]="formGrp" (ngSubmit)="onSubmitItem()">
      <div class="form-group">
        <label for="tile"> Title </label>

        <input id="tile" type="text" class="form-control" formControlName="label" />

        <app-error-message formControlName="label" key="required">Please enter the task</app-error-message>
      </div>

    <div class="form-group">
      <label for="description"> Description </label>

      <input id="description" type="text" class="form-control" formControlName="description" />

      <app-error-message [control]="formGrp.get('description')" key="required">Please enter the description</app-error-message>
    </div>

    <div>
      <button class="btn-submit" type="submit">
        Submit form
      </button>
    </div>
  </form>
  `,
})
export class MockErrorComponent {
  formBuilder = new FormBuilder();

  formGrp: FormGroup;

  constructor() {
    this.formGrp = this.formBuilder.group({
      label: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  onSubmitItem() {
    this.formGrp.markAllAsTouched();

    console.dir(this.formGrp);
  }
}

describe('ErrorMessageComponent', () => {
  let errorComponent: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  let mockErrorComp: MockErrorComponent;
  let mockErrorCompFixture: ComponentFixture<MockErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, ReactiveFormsModule, FormsModule],
      declarations: [ErrorMessageComponent, MockErrorComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    errorComponent = fixture.componentInstance;
    fixture.detectChanges();

    mockErrorCompFixture = TestBed.createComponent(MockErrorComponent);
    mockErrorComp = mockErrorCompFixture.componentInstance;
    mockErrorCompFixture.detectChanges();
  });

  it('should create error message component', () => {
    expect(errorComponent).toBeTruthy();
  });

  it('should create MockErrorComponent component', () => {
    expect(errorComponent).toBeTruthy();
  });

  it('should show error message on invalid form ', () => {
    const button = mockErrorCompFixture.debugElement.nativeElement.querySelector('.btn-submit');
    fixture.detectChanges();

    button.click();
    mockErrorComp.onSubmitItem();

    expect(mockErrorComp.formGrp.valid).toBe(false);
  });
});
