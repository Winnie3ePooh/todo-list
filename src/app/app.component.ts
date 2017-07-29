import { Component, OnInit } from '@angular/core';

import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'ITS WORK';
  todos: Todo[] = []
  lastId: number = 0;
  cacheText: string = '';
  editingTodo: Todo;

  ngOnInit() {
    this.todos.push(new Todo({id: 0, text: 'test', complete: false}));
  }

  addTodo(text:string) {
    if(text==null || text==undefined || text=="")
      return;
    console.log(this.todos[this.todos.length-1]);
    this.todos.push(new Todo({id: this.lastId++, text: text, complete: false}));
  }

  removeTodo(id: number): void {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
  }

  getTodo(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  editTodo(todo: Todo): void {
    this.cacheText = todo.text;
    this.editingTodo = todo;
  }

  doneEditing(todo: Todo): void {
    let currTodo = this.getTodo(todo.id);
    if (!currTodo) return;
    this.editingTodo = null;
    Object.assign(currTodo,{text: todo.text.trim()})
    if(!todo.text) this.removeTodo(todo.id);
  }

  cancelEdit(todo: Todo): void {
    this.editingTodo = null;
    todo.text = this.cacheText;
  }

  updateTodo(id: number, values: Object = {}): void {
    let todo = this.getTodo(id);
    if (!todo) {
      return;
    }
    Object.assign(todo, values);
  }

  toggleTodoComplete(todo: Todo): void {
    this.updateTodo(todo.id, {
      complete: !todo.complete
    });
    console.log(this.todos);
  }
}
