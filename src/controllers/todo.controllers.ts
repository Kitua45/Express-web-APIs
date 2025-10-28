import { Request, Response} from "express"
import {getPool } from "../db/config"
import * as todoServices from '../services/todo.service'


export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await todoServices.listTodos()
        res.status(200).json(todos)
        
        
    } catch (error) {
        res.status(500).json({ error: 'internal server error'})
    }
}

export const createTodo = async (req:Request, res:Response) => {
    const { todo_name, description, due_date, user_id } =req.body;

    try{
        const todo = req.body
        const result = await todoServices.createTodo(todo)

        res.status(201).json(result)

    } catch (error:any) {
        res.status(500).json({ error:error.message})


    }
}
//get todo by Id
export const getTodoById = async(req: Request, res: Response) => {
const id = parseInt(req.params.id)
//bad request
if(isNaN(id)){
    return res.status(400).json({message: 'Invalid todoid'})
}
    try{
       const todo = await todoServices.getTodo(id) 
       if (todo){
        res.status(200).json(todo)
       } else {
        res.status(404).json({ message: 'Todo not found' })
       }
    } catch (error) {
       if (error instanceof Error && error.message === 'Todo not found') {
        return res.status(404).json({ message: 'Todo not found' })
       } else if (error instanceof Error && error.message === 'Invalid todoid') {
        res.status(400).json({message: 'Invalid todoid'})
       } else {
        res.status(500).json({ error: 'Internal server error' })
       }
    }
}

//delete a todo y id
export const deleteTodo = async(req: Request, res: Response) => {
   const id = parseInt(req.params.id); 


   try{
        const result = await todoServices.deleteTodo(id)
        res.status(204).json(result)

   } catch (error: any) {
    if (error instanceof Error && error.message === 'Todo not found') {
        return res.status(404).json({ message: 'Todo not found' })
       } else if (error instanceof Error && error.message === 'Invalid todoid') {
        res.status(400).json({message: 'Invalid todoid'})
    } else {

    
    res.status(500).json({ error: 'Internal server error' })
   }

}
}
export const updateTodo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const todo = req.body
    try{
        const result = await todoServices.updateTodo(id, todo)
    } catch (error:any) {
        if (error instanceof Error && error.message === 'Todo not found') {
        return res.status(404).json({ message: 'Todo not found' })
       } else if (error instanceof Error && error.message === 'Invalid todoid') {
        res.status(400).json({message: 'Invalid todoid'})
    } else {

    
    res.status(500).json({ error: 'Internal server error' })
   }

    }
}






// duplicate stub removed
