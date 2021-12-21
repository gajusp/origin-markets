import { TodoFilterType } from '../models/Utils';
import { TodoFilterPipe } from './todo-filter.pipe';


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
    "description": "Gym appointment on 20 Dec 2021 @05 pm",
    "category": "house",
    "done": true
  }
];

describe('TodoFilterPipe', () => {
  const filterPipe = new TodoFilterPipe();

  it('create an instance', () => {
    expect(filterPipe).toBeTruthy();
  });

  it('should return the all todo task', () => {
    expect(mockTodoListData.length).toBe(3);
  });

  it('should return the completed todo task', () => {
    const completedTodoList = filterPipe.transform(mockTodoListData, TodoFilterType.Complete);

    expect(completedTodoList[0].done).toBe(true);
  });

  it('should return the pending todo task', () => {
    const completedTodoList = filterPipe.transform(mockTodoListData, TodoFilterType.Pending);

    expect(completedTodoList[0].done).toBe(false);
  });
});
