



export const updateList=(data)=>{
    return{  
        type:"UPDATE_LIST",
        payload : data,
        }
    }



export const cancelEdit=()=>{
    return{
        type:"CancelEdit",
    
    }
}