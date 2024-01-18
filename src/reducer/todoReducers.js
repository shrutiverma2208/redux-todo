
const initialData={
    list:[],
    deletedList:[]
};


const todoReducers = (state=initialData,action)=>{
    switch(action.type){
        case "ADD":

        const {id,data,time} =action.payload;

        return{
            ...state,
            list: [
                ...state.list,
                {
                    id:id,
                    data:data,
                    isStrikeThrough:false,
                    time:time,
                    isEditing:false,
                      
                }
            ]
        }
    
        case "Delete":
         
        const deletedItem=state.list.find(list=>list.id===action.id)
        const newList= state.list.filter((elem)=>(elem.id !==action.id))
       
           
  
        return{
            ...state,
           list:newList, 
           deletedList:[...state.deletedList, deletedItem],
           
        };

        case "DeleteAll":return{
            ...state,
            list:[]
        }
       
        
      
              case "StrikeThrough":

              return {
                  ...state,
                  list: state.list.map((elem) =>
                    elem.id === action.id
                      ? { ...elem, isStrikeThrough:true }
                      : elem
                  ),
                };

         case "Undo":
            
            
              const lastDeleted=state.deletedList[state.deletedList.length-1]
                return {
                    ...state,
                    list: [...state.list, lastDeleted],
                    deletedList: state.deletedList.filter(elem => elem.id !== lastDeleted.id),
                }
         case "Edit":

         return{
           ...state,
           list: state.list.map(elem=>
            elem.id===action.payload.id ? {...elem,isEditing:true}:elem),
        
         };

         case "UnStrike":
            return{
                ...state,
                list:state.list.map((elem)=>
                elem.id === action.id?{...elem, isStrikeThrough:false}:
                elem
                ),
            }

         case "CancelEdit":
            return{
                ...state,
        
            }   
            
          
        
        default: return state;
    }
};
export default todoReducers