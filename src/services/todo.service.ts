import { error } from "console";
import * as todoRepositories from "../repositories/todo.repository"
import { NewTodo, Todo, UpdateTodo } from "../Types/todo.types";
import { getPool } from "../db/config";


export const listTodos = async () => await todoRepositories.getAllTodos()
export const createTodo = async (newtodo: NewTodo) => await todoRepositories.createTodo(newtodo)

//get all todos
export const getAllTodos = async ():Promise<Todo[]> =>{
const pool = await getPool(); //await for DB connection
const results = await pool.request().query('SELECT * FROM Todods')
return results.recordset
}


export const getTodo = async (id: number) => {
    
    //bad request
if(isNaN(id)){
    throw new Error('Invalid todoid')
}
    const existingtodo = await todoRepositories.getTodoById(id)
    if(!existingtodo){
        throw new Error('Todo not found')
    }
    return existingtodo;
}


export const deleteTodo = async (id: number) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Invalid todoid')
    }
    const existingtodo = await todoRepositories.getTodoById(id)
    if (!existingtodo) {
        throw new Error('Todo not found')
    }
    return await todoRepositories.deleteTodo(id)

}

export const updateTodo = async(id:number, todo:UpdateTodo) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Invalid todoid')
    }
    const existingtodo = await todoRepositories.getTodoById(id)
    if (!existingtodo) {
        throw new Error('Todo not found')
    }
    
    return await todoRepositories.updateTodo(id, todo);  
}