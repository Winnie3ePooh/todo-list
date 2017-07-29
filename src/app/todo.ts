export class Todo {
  id: number;
  text: string = '';
  complete: boolean;

  constructor(todo: Todo) {
    Object.assign(this,todo);
  }
}
