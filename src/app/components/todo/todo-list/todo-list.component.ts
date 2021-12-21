import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TodoModel } from 'src/app/models/todo.model';
import { TodoFilterType } from 'src/app/models/Utils';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() todoList: TodoModel[];

  @Output() markTodoEvent = new EventEmitter<TodoModel>();
  @Output() updateTodoEvent = new EventEmitter<TodoModel>();
  @Output() deleteTodoEvent = new EventEmitter<TodoModel>();

  todoFilterType = TodoFilterType;
  filterType = TodoFilterType.All;


  todoTrackByFn(index: number, item: TodoModel): number {
    return item.id;
  }

  onMarkDone(item: TodoModel): void {
    const todoItem: TodoModel = {
      ...item,
      done: !item.done,
    };

    this.markTodoEvent.emit(todoItem);
  }

  onUpdateTask(item: TodoModel): void {
    this.updateTodoEvent.emit(item);
  }

  onDeleteTask(item: TodoModel): void {
    this.deleteTodoEvent.emit(item);
  }

  onAllTask(): void {
    this.filterType = TodoFilterType.All;
  }

  onPendingTask(): void {
    this.filterType = TodoFilterType.Pending;
  }

  onCompletedTask(): void {
    this.filterType = TodoFilterType.Complete;
  }
}
