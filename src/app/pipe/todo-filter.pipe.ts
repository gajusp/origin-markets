import { Pipe, PipeTransform } from '@angular/core';

import { TodoModel } from '../models/todo.model';
import { TodoFilterType } from '../models/Utils';

@Pipe({
  name: 'todoFilter',
})
export class TodoFilterPipe implements PipeTransform {
  transform(value: TodoModel[], filterType: string): TodoModel[] {
    if (!value || !filterType) {
      return value;
    }

    return value.filter((item) => {
      switch (filterType) {
        case TodoFilterType.Complete:
          return item.done;
        case TodoFilterType.Pending:
          return !item.done;
        default:
          return item;
      }
    });
  }
}
