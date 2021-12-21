import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFilterPipe } from 'src/app/pipe/todo-filter.pipe';
import { TodoListComponent } from './todo-list.component';



const mockTodoListData = [
  {
    "id": 1,
    "label": "Broadband Bill",
    "description": "Pay broadband bill using credit card or other payment options.",
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

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoFilterPipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all todo list', () => {
    component.todoList = mockTodoListData;

    expect(component.todoList.length).toBe(mockTodoListData.length);
  });

  it('should load all todo list', () => {
    component.todoList = mockTodoListData;

    expect(component.todoList.length).toBe(mockTodoListData.length);
  });

  it('should mark the task as done', () => {
    component.todoList = mockTodoListData;
    const todoModel = component.todoList[0];
    todoModel.done = true;
    fixture.detectChanges();

    spyOn(component, 'onMarkDone').and.callThrough();
    component.onMarkDone(todoModel);
    expect(component.onMarkDone).toHaveBeenCalled();

    expect(component.todoList.filter(item => !item.done).length).toBe(2);
  });

  it('should update the todo task', () => {
    component.todoList = mockTodoListData;
    const todoModel = component.todoList[0];
    todoModel.label = 'testing label';
    todoModel.description = 'testing description';
    todoModel.category = 'house';
    fixture.detectChanges();

    spyOn(component, 'onUpdateTask').and.callThrough();
    component.onUpdateTask(todoModel);
    expect(component.onUpdateTask).toHaveBeenCalledWith(todoModel);

    expect(component.todoList.filter(item => item.label === todoModel.label).length).toBe(1);
  });

  it('should filter the pending tasks', () => {
    component.todoList = mockTodoListData;
    const todoModel = component.todoList[0];
    todoModel.done = true;
    fixture.detectChanges();

    spyOn(component, 'onPendingTask').and.callThrough();
    component.onPendingTask();
    expect(component.onPendingTask).toHaveBeenCalled();

    expect(component.todoList.filter(item => !item.done).length).toBe(2);
  });

  it('should filter the completed tasks', () => {
    component.todoList = mockTodoListData;
    const todoModel = component.todoList[0];
    todoModel.done = true;
    fixture.detectChanges();

    spyOn(component, 'onCompletedTask').and.callThrough();
    component.onCompletedTask();
    expect(component.onCompletedTask).toHaveBeenCalled();

    expect(component.todoList.filter(item => item.done).length).toBe(1);
  });

  it('should delete the task', () => {
    component.todoList = mockTodoListData;
    const todoModel = component.todoList[0];
    fixture.detectChanges();

    spyOn(component, 'onDeleteTask').and.callThrough();
    component.onDeleteTask(todoModel);
    expect(component.onDeleteTask).toHaveBeenCalledWith(todoModel);
  });
});
