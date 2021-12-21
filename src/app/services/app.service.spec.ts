import { HttpClient, HttpHandler, HttpResponse } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import * as rxjs from 'rxjs';

import { TodoModel } from '../models/todo.model';
import { AppService } from './app.service';



const mockTodoListData = [

  {
    "id": 4,
    "label": "Broadband Bill",
    "description": "Pay broadband bill using credit card or other payment options. Pay broadband bill using credit card or other payment options. Pay broadband bill using credit card or other payment options",
    "category": "bureaucracy",
    "done": false
  },
  {
    "id": 5,
    "label": "Room Rent",
    "description": "Pay room rent to owner",
    "category": "house",
    "done": false
  },
  {
    "id": 6,
    "label": "Gym appointment",
    "description": "Gym appointment on 20 Dec 2021 @03 pm",
    "category": "house",
    "done": false
  },
  {
    "id": 7,
    "label": "Taxes1112",
    "description": "Start doing my taxes and contact my accountant jhon for advice",
    "category": "bureaucracy",
    "done": true
  }
];

const mockURL = 'http://localhost:3000/tasks'
const mockSelectedTodo = {
  "id": 6,
  "label": "Gym appointment",
  "description": "Gym appointment on 20 Dec 2021 @05 pm",
  "category": "house",
  "done": true
}

describe('AppService', () => {
  let appService: AppService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        HttpClient,
        HttpHandler,
        HttpTestingController,
        FormBuilder,
        AppService
      ],
      imports: [BrowserModule],
    });

    appService = TestBed.inject(AppService);

    httpClient = TestBed.inject(HttpClient);
  });


  it('should be created', () => {
    expect(appService).toBeTruthy();
  });

  it('should get all todo list, check if todo list present', () => {
    const httpResponse: HttpResponse<TodoModel[]> = {
      status: 200,
      body: mockTodoListData as TodoModel[],
    } as HttpResponse<TodoModel[]>;

    spyOn(appService, "getAllTodoList");
    spyOn(httpClient, 'get').and.returnValue(rxjs.of(httpResponse));

    let todoListResults$ = new rxjs.Observable();
    appService.getAllTodoList();
    expect(httpClient.get).not.toHaveBeenCalled();

    todoListResults$.subscribe((result) => {
      expect(result).toEqual(mockTodoListData as TodoModel[]);
    });
  });

  it('getAllTodoList should throw error', () => {
    const httpResponse = {
      status: 500,
      body: {
        errorCode: '500',
        errorDescription: 'something went wrong',
      }
    };

    spyOn(httpClient, 'get').and.returnValue(rxjs.of(httpResponse));

    appService.getAllTodoList().subscribe(
      (errorData: any) => {
        expect(errorData.body).toEqual({
          errorCode: '500',
          errorDescription: 'something went wrong',
        } as any);
      });
  });

  it('should get todo task by id', () => {
    const httpResponse: HttpResponse<TodoModel> = {
      status: 200,
      body: mockSelectedTodo as TodoModel,
    } as HttpResponse<TodoModel>;

    spyOn(appService, "getTodoItemById");
    spyOn(httpClient, 'get').and.returnValue(rxjs.of(httpResponse));

    let todoTaskResults$ = new rxjs.Observable();
    appService.getTodoItemById(6);
    expect(httpClient.get).not.toHaveBeenCalled();

    todoTaskResults$.subscribe((result) => {
      expect(result).toEqual(mockSelectedTodo as TodoModel);
    });
  });

  it('should add new todo task to the list', () => {
    const httpResponse: HttpResponse<TodoModel> = {
      status: 200,
      body: mockSelectedTodo as TodoModel,
    } as HttpResponse<TodoModel>;

    spyOn(appService, "addTodoItem");
    spyOn(httpClient, 'get').and.returnValue(rxjs.of(httpResponse));

    let todoResults$ = new rxjs.Observable();
    appService.addTodoItem(mockSelectedTodo);
    expect(httpClient.get).not.toHaveBeenCalled();

    todoResults$.subscribe((result) => {
      expect(result).toEqual(mockSelectedTodo as TodoModel);
    });
  });

  it('should update todo task', () => {
    mockSelectedTodo.label = 'testing label';

    const httpResponse: HttpResponse<TodoModel> = {
      status: 200,
      body: mockSelectedTodo as TodoModel,
    } as HttpResponse<TodoModel>;

    spyOn(appService, "updateTodoItem");
    spyOn(httpClient, 'get').and.returnValue(rxjs.of(httpResponse));

    let todoTaskResults$ = new rxjs.Observable();
    appService.updateTodoItem(mockSelectedTodo);
    expect(httpClient.get).not.toHaveBeenCalled();

    todoTaskResults$.subscribe((result) => {
      expect(result).toEqual(mockSelectedTodo as TodoModel);
    });
  });

  it('should delete todo task by id', () => {
    const httpResponse: HttpResponse<TodoModel> = {
      status: 200,
      body: mockSelectedTodo as TodoModel,
    } as HttpResponse<TodoModel>;

    spyOn(appService, "removeTodoItem");
    spyOn(httpClient, 'get').and.returnValue(rxjs.of(httpResponse));

    let todoTaskResults$ = new rxjs.Observable();
    appService.removeTodoItem(mockSelectedTodo.id);
    expect(httpClient.get).not.toHaveBeenCalled();

    todoTaskResults$.subscribe((result) => {
      expect(result).toEqual(mockSelectedTodo as TodoModel);
    });
  });

  it('should build add task form', () => {
    const fromGroup = appService.buildTodoFormGroup();

    expect(fromGroup.valid).toBeFalsy();
  });

  it('should build add task form & patch value to form', () => {
    const fromGroup = appService.buildTodoFormGroup();

    fromGroup.patchValue({
      "id": 3,
      "label": "Taxes",
      "description": "Start doing my taxes and contact my accountant jhon for advice",
      "category": "bureaucracy",
      "done": true
    });

    expect(fromGroup.valid).toBeTruthy();
    expect(fromGroup.value.id).toBe(3);

    expect(fromGroup.value.done).toBeTruthy();
  });
});
