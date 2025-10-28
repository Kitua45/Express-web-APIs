import { Express } from "express"
import * as todoController from '../controllers/todo.controllers'


const todoRoutes = (app: Express) => {
    app.get('/alltodos', (todoController as any).getTodos)
    app.post('/addtodo', todoController.createTodo)
    app.get('/todos/:id', todoController.getTodoById)
    app.delete('/todos/:id', todoController.deleteTodo)
    app.put('/todos/:id', todoController.updateTodo)
}
export default todoRoutes;
