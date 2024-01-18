export const addTodo=(data)=>{
    return{
        type:"ADD",
        payload:{
            id:new Date().getTime().toString(),
            data:data,
            time:new Date().toLocaleString(),
            
        }
    }
}
export const deleteTodo=(id)=>{
    return{
        type:"Delete",
        id
         
    }
}
export const removeTodo=()=>{
    return{
        type:"DeleteAll"
    }
}

export const toggleStrikeThrough=(id)=>{

return{  
     type:"StrikeThrough",
     id
}
}
export const undoTodo=()=>{
    return{
        type:"Undo",
    }
}
export const editTodo=(id,data)=>{
    return{
        type:"Edit",
        payload:{
            id,
            data,
        }
    }
}
export const unStrikeTodo=(id)=>{
    return{
        type:"UnStrike",
        id,
    }
}
export const cancelEdit=()=>{
    return{
        type:"CancelEdit",
    
    }
}