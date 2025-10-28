//new todo
export interface NewTodo {
    todo_name: string;
    description: string;
    due_date: string;
    user_id: number;

}

//update todo
export interface UpdateTodo {
    todo_name: string;
    description: string;
    due_date: string;
    user_id: number;
    
}
export interface Todo {
    todo_id: number;
    todo_name: string;
    description: string;
    created_at: string;
    due_date: string;
    user_id: number;

}