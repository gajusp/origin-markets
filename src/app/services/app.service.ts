import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { TodoModel } from '../models/todo.model';
import { EnvService } from './env.service';


@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private http: HttpClient,
    private envService: EnvService,
    private fb: FormBuilder
  ) { }

  getAllTodoList(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.envService.tasksUrl);
  }

  getTodoItemById(id: number): Observable<TodoModel> {
    return this.http.get<TodoModel>(`${this.envService.tasksUrl}/${id}`);
  }

  addTodoItem(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(this.envService.tasksUrl, todo);
  }

  updateTodoItem(updatedTodoItem: TodoModel): Observable<TodoModel> {
    return this.http.patch<TodoModel>(
      `${this.envService.tasksUrl}/${updatedTodoItem.id}`,
      updatedTodoItem
    );
  }

  removeTodoItem(id: number): Observable<any> {
    return this.http.delete<TodoModel>(`${this.envService.tasksUrl}/${id}`);
  }

  buildTodoFormGroup(): FormGroup {
    return this.fb.group({
      id: [null],
      label: [null, [Validators.required]],
      description: [null, [Validators.required]],
      category: [null, [Validators.required]],
      done: [false],
    });
  }
}
