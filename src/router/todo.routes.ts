// src/router/todo.routes.ts
import { Express } from "express";
import * as todoController from '../controllers/todo.controllers'
import { isAuthenticated } from "../middleware/bearAuth";
import { adminOnly, userOnly, adminUser } from "../middleware/bearAuth";

const todoRoutes = (app: Express) => {
    // PROTECTED ROUTES - Require authentication
    app.get('/todos', isAuthenticated, todoController.getTodos);
    app.post('/todos', isAuthenticated, todoController.createTodo);
    app.get('/alltodos', isAuthenticated, todoController.getAllTodosController);
  
    // PUBLIC ROUTES - No authentication required
    app.get('/todos/:id', todoController.getTodoById);
    app.put('/todos/:id', todoController.updateTodo);
    app.delete('/todos/:id', todoController.deleteTodo);
    app.post('/addtodo', todoController.AddTodoController);

    //role based authorization 
    // Mixed access - both admins and users can view todos
    app.get('/todos', adminUser, todoController.getTodos);
  
    // Public access - anyone can view individual todo (no middleware)
    app.get('/todos/:id', todoController.getTodoById);
  
    // Admin only - only admins can create todos
    app.post('/todos', adminOnly, todoController.createTodo);
  
    // Mixed access - both roles can update (business logic in controller can add more restrictions)
    app.put('/todos/:id', adminUser, todoController.updateTodo);
  
    // Admin only - only admins can delete todos
    app.delete('/todos/:id', adminOnly, todoController.deleteTodo);

    // Practice routes with no restrictions
    app.get('/alltodos', todoController.getAllTodosController);
    app.post('/addtodo', todoController.AddTodoController);
}

export default todoRoutes;
