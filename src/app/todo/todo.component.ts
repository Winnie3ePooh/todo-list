import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Todo } from '../todo';
import { TodoServiceService } from '../todo-service.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoServiceService]
})

export class TodoComponent implements OnInit {

  newTodoTitle: string = '';
  cachedTitle: string = '';
  editingTodo: Todo;
  title: string = 'Todos';
  currStatus: string = '';
  route;

  constructor(
    private activateRoute: ActivatedRoute,
    private todoService: TodoServiceService
  ) {
    this.route = activateRoute;
  }

  ngOnInit() {
		this.route.params
			.map(params => params.status)
			.subscribe((status) => {
        console.log(status);
				this.currStatus = status;
			});
	}

  getTodos() {
    return this.todoService.getTodos(this.currStatus);
  }

  stopEditing(todo: Todo, editedTitle: string) {
    todo.title = editedTitle;
    this.editingTodo = null
  }

  cancelEditing(todo: Todo) {
    this.editingTodo = null;
    todo.title = this.cachedTitle;
  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
    editedTitle = editedTitle.trim();
    this.editingTodo = null;

    if (editedTitle.length === 0) {
      return this.todoService.removeTodo(todo);
    }

    todo.title = editedTitle;
  }

  editTodo(todo: Todo) {
    this.cachedTitle = todo.title;
    this.editingTodo = todo;
  }

  removeCompleted() {
    this.todoService.removeCompleted();
  }

  toggleCompletion(todo: Todo) {
    this.todoService.toggleCompletion(todo);
  }

  remove(todo: Todo) {
    this.todoService.removeTodo(todo);
  }

  addTodo() {
    if (this.newTodoTitle.trim().length) {
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }

  getRemaining(): number {
    return this.todoService.todos.length - this.todoService.getCompleted().length;
  }
}
