
const initialData={
    list:[],
    
};


const todoReducers = (state=initialData,action)=>{
    switch(action.type){
       
    
       
        case "UPDATE_LIST": {
            const newList = action.payload
            return {
                ...state,
                list: newList
                };
            }

         

         case "CancelEdit":
            return{
                ...state,
        
            }   
            
          
        
        default: return state;
    }
};
export default todoReducers