import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TodoModel } from 'src/app/models/todo.model';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  @Input() todoFormGrp: FormGroup;

  @Output() addTodoEvent = new EventEmitter<TodoModel>();
  @Output() clearAllEvent = new EventEmitter();

  todoCategory = ['house', 'bureaucracy', 'appointment'];

  isUpdateMode = false;

  ngOnInit(): void {
    this.todoFormGrp.get('id').valueChanges.subscribe((id: number) => {
      this.isUpdateMode = id === null ? false : true;
    });
  }

  onAddUpdateItem(): void {
    this.todoFormGrp.markAllAsTouched();

    if (this.todoFormGrp.valid) {
      const todo = this.todoFormGrp.getRawValue();
      todo.id ||= Date.now();

      this.addTodoEvent.emit(todo);
    }
  }

  onResetForm(): void {
    this.clearAllEvent.emit();
  }
}
