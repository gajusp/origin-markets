import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TodoFilterPipe } from 'src/app/pipe/todo-filter.pipe';
import { AppService } from 'src/app/services/app.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from "./todo.component";



const mockTodoListData = [
  {
    "id": 1,
    "label": "Broadband Bill",
    "description": "Pay broadband bill using credit card or other payment options. Pay broadband bill using credit card or other payment options. Pay broadband bill using credit card or other payment options",
    "category": "bureaucracy",
    "done": false
  },
  {
    "id": 2,
    "label": "Room Rent",
    "description": "Pay room rent to owner",
    "category": "house",
    "done": false
  },
  {
    "id": 3,
    "label": "Gym appointment",
    "description": "Gym appointment on 20 Dec 2021 @05 pm",
    "category": "house",
    "done": false
  }
];

const mockTodoTask = {
  "id": 9,
  "label": "Bank appointment 3",
  "description": "Bank appointment on 20 Dec 2021 @03:00 pm",
  "category": "house",
  "done": false
};

describe("TodoComponent", () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, ReactiveFormsModule, HttpClientTestingModule, SharedModule],
      declarations: [TodoComponent, TodoListComponent, AddTodoComponent, TodoFilterPipe],
      providers: [AppService, FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todoListColl = mockTodoListData;

    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load all todo list items", () => {
    component.todoListColl = mockTodoListData;

    expect(component.todoListColl.length).toBe(mockTodoListData.length);
  });

  it('should mark the task as done', () => {
    component.todoListColl = mockTodoListData;
    const todoModel = component.todoListColl[0];
    todoModel.done = true;
    fixture.detectChanges();

    spyOn(component, 'onMarkTodo').and.callThrough();
    component.onMarkTodo(todoModel);
    expect(component.onMarkTodo).toHaveBeenCalled();

    expect(component.todoListColl.filter(item => !item.done).length).toBe(2);
  });

  it('should update the todo task', () => {
    component.todoListColl = mockTodoListData;
    const todoModel = component.todoListColl[0];
    todoModel.label = 'testing label';
    todoModel.description = 'testing description';
    todoModel.category = 'house';
    component.selectedTodoItem = todoModel;
    fixture.detectChanges();

    spyOn(component, 'onUpdateTodo').and.callThrough();
    component.onUpdateTodo(todoModel);
    expect(component.onUpdateTodo).toHaveBeenCalledWith(todoModel);

    expect(component.todoListColl.filter(item => item.label === todoModel.label).length).toBe(1);
  });

  it('should delete the task', () => {
    component.todoListColl = mockTodoListData;
    const todoModel = component.todoListColl[0];
    fixture.detectChanges();

    spyOn(component, 'onDeleteTodo').and.callThrough();
    component.onDeleteTodo(todoModel);
    expect(component.onDeleteTodo).toHaveBeenCalledWith(todoModel);
  });
});
