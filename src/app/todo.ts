export class Todo {
  id: number;
  title: string;
  complete: boolean;

  constructor(todo: Todo) {
    Object.assign(this,todo);
  }
}
