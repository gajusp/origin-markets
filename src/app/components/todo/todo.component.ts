import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TodoModel } from "src/app/models/todo.model";
import { AppService } from "src/app/services/app.service";


@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit, OnDestroy {
  @Input() todoListColl: TodoModel[];

  unsubscribeAll = new Subject<void>();

  todoFormGrp: FormGroup;
  selectedTodoItem: TodoModel;

  constructor(
    private appService: AppService,
    private cdRef: ChangeDetectorRef
  ) {
    this.getAllTodo();
  }

  ngOnInit(): void {
    this.todoFormGrp = this.appService.buildTodoFormGroup();
  }

  /**
   * Add or Update the todo task
   * @param todo model
   */
  onAddUpdateTodoItem(todoModel: TodoModel): void {
    // Update todo task
    if (this.selectedTodoItem) {
      this.appService.updateTodoItem(todoModel)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(this.onResetFormGroup.bind(this));

      return;
    }

    // Add todo task
    this.appService.addTodoItem(todoModel)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(this.onResetFormGroup.bind(this));
  }

  /**
   * Mark as complete todo task
   * @param todoModel
   */
  onMarkTodo(todoModel: TodoModel): void {
    this.appService
      .updateTodoItem(todoModel)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(this.getAllTodo.bind(this));
  }

  /**
   * Update mode - modify the existing todo task
   * @param todoModel
   */
  onUpdateTodo(todoModel: TodoModel): void {
    this.selectedTodoItem = todoModel;

    this.todoFormGrp.patchValue({ ...this.selectedTodoItem });

    // scroll to top of the screen
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

    this.cdRef.markForCheck();
  }

  /**
   * Delete todo task
   * @param todoModel 
   */
  onDeleteTodo(todoModel: TodoModel): void {
    this.appService
      .removeTodoItem(todoModel.id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(this.onResetFormGroup.bind(this));


    //  this.todoListColl.splice(index,1); // can also used to remove the todo task 
  }

  /**
   * Reset the Form, update mode & getAll todo tasks
   */
  onResetFormGroup(): void {
    this.getAllTodo();

    this.selectedTodoItem = null;
    this.todoFormGrp.reset();
  }

  /**
   * Get all todo tasks
   */
  private getAllTodo(): void {
    this.appService.getAllTodoList().subscribe((todoList: TodoModel[]) => {
      this.todoListColl = todoList;

      this.cdRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
