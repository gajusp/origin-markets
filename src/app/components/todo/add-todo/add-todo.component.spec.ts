import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppService } from 'src/app/services/app.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTodoComponent } from './add-todo.component';





const patchTodoItem = {
  "id": 1,
  "label": "Title label",
  "description": "Description testing",
  "category": "house",
  "done": false
};

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let appService: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule,
        ReactiveFormsModule, SharedModule],
      declarations: [AddTodoComponent],
      providers: [AppService, HttpClient, HttpHandler, FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    appService = TestBed.inject(AppService);
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    component.todoFormGrp = appService.buildTodoFormGroup();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new todo task', () => {
    const formGroup = component.todoFormGrp
    formGroup.patchValue(patchTodoItem, { emitEvent: false });
    const button = fixture.debugElement.nativeElement.querySelector('.primary');

    fixture.detectChanges();

    spyOn(component, 'onAddUpdateItem').and.callThrough();;
    component.onAddUpdateItem();

    expect(formGroup.getRawValue().description).toEqual('Description testing');
    expect(button.textContent.trim()).toEqual('Add');
  });

  it('should clear the form data', () => {
    const formGroup = component.todoFormGrp
    formGroup.patchValue(patchTodoItem);

    const clearBtn = fixture.debugElement.nativeElement.querySelector('.secondary');
    clearBtn.click();
    component.clearAllEvent.emit();
    formGroup.reset();
    fixture.detectChanges();

    expect(formGroup.getRawValue().label).toEqual(null);
    expect(formGroup.valid).toBe(false);
  });

  it('should show update mode of add todo component', () => {
    const formGroup = component.todoFormGrp
    formGroup.patchValue(patchTodoItem);
    const button = fixture.debugElement.nativeElement.querySelector('.primary');

    fixture.detectChanges();

    expect(formGroup.valid).toBe(true);
    expect(component.isUpdateMode).toBe(true);
    expect(button.textContent.trim()).toEqual('Update');
  });
});
