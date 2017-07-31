import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoServiceService {

  todos: Todo[];
  todoId: number = 0;

  constructor() {
    let persistedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    this.todos = persistedTodos.map((todo: {id: number, title: string, complete: boolean}) => {
      return new Todo({id: this.todoId++, title: todo.title, complete: todo.complete});
    });
  }

  getTodos(type: string): Todo[] {
    switch(type) {
      case 'active':
        return this.todos.filter((obj: Todo) => obj.complete === false);
      case 'complete':
        return this.todos.filter((obj: Todo) => obj.complete === true);
      default:
        return this.todos;
    }
  }

  private updateStorage() {
    localStorage.setItem('todos',JSON.stringify(this.todos));
  }

  private getWithComplete(complete: boolean): Todo[] {
    return this.todos.filter((obj: Todo) => obj.complete === complete);
  }

  allComplete() {
    return this.todos.length === this.getWithComplete(true).length;
  }

  setAllComplete(complete: boolean): void {
    this.todos.forEach((todo: Todo) => todo.complete = complete);
    this.updateStorage();
  }

  removeCompleted() {
    this.todos = this.getWithComplete(false);
    this.updateStorage();
  }

  getRemaining() {
    return this.getWithComplete(false);
  }

  getCompleted() {
    return this.getWithComplete(true);
  }

  toggleCompletion(todo: Todo) {
    todo.complete = !todo.complete;
    this.updateStorage();
  }

  removeTodo(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateStorage();
  }

  addTodo(title:string) {
    if(title==null || title==undefined || title=="")
      return;
    this.todos.push(new Todo({id: this.todoId++, title: title, complete: false}));
    this.updateStorage();
  }

}
