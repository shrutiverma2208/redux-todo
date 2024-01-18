import React, {useState} from 'react'
import todo from './todo.css'
import { addTodo,deleteTodo,removeTodo,toggleStrikeThrough,undoTodo,editTodo,unStrikeTodo,cancelEdit} from '../actions/index'
import { useSelector,useDispatch } from 'react-redux';
import restore from "../images/restore.jpeg";
import deleteIcon from "../images/deleteIcon.png";
import strikeText from "../images/strikeText.jpeg";
import editIcon from "../images/editIcon.png";
import done from "../images/done.png";
import cancle from "../images/cancle.png";

const Todo = () => {

const[inputData, setInputData]=useState('');
const [editing,setEditing]=useState(null);


const list= useSelector((state)=>state.todoReducers.list);
const deletedList= useSelector((state)=>state.todoReducers.deletedList);


const dispatch= useDispatch();


  return (
    <>
    <div className='main-div'>
      <div className='chlid-div'>
       
        <h2>Add your items here</h2>
        

        <div className='add-items'>
          <input type="text" placeholder="Enter items..."
           value={inputData}  onChange={(e)=>setInputData(e.target.value)}></input>
           <i className='fa fa-plus add-btn' onClick={()=> { if (inputData.trim() !== '') {
            dispatch(addTodo(inputData,  setInputData("")))}}}></i>
 
        </div>
        <div style={{display:'inline-block',textDecoration:'none'}}>
            {
              list.map((elem)=>{
                
                return(
                  
                     <div className="eachItem"  
                        style={{textDecoration: elem.isStrikeThrough ? "line-through" : "none"}} 
                        key={elem.id}>
                        {elem.isEditing?
                             <>
                           <input  style={{padding:'1px 1px'}} type="text"  value={inputData}
                           placeholder="Enter edited item here..."
                            onChange={(e)=>setInputData(e.target.value)}>
                          </input>
                          <button>   
                            <img src={done}   width={'15px'}
                            onClick={()=>{if(inputData .trim()!=='') {
                               
                               dispatch(editTodo(editing,inputData),setEditing(null),setInputData)
                               
                            }}}>
                            </img>
                          </button>

                         <button>
                            <img src={cancle}   width={'15px'}
                            onClick={()=>dispatch(cancelEdit()
                              )}>
                           </img>
                        </button>
                      </>
                        :<h3> {elem.data}--{elem.time}</h3> 
                        }   
                   <div>
                      
                          
                        
                        
                          
                         {elem.isStrikeThrough? 
                         <>
                           <button>
                             <img src={deleteIcon} style={{padding:'1px 1px'}} width={'30px'} alt="" 
                             onClick={()=>dispatch(deleteTodo(elem.id))}
                             ></img>
                           </button>
                           <button>
                             <img style={{padding:'1px 1px'}} src={restore} width={'30px'}  alt=""
                             disable={!elem.isStrikeThrough}
                             onClick={()=>dispatch(unStrikeTodo(elem.id))} ></img>
                           </button>
                           </>:<>
                        <button>
                         
                           <img src={editIcon} style={{padding:'1px 1px'}} width={'30px'} alt="" 
                           onClick={()=>
                         
                           dispatch(editTodo(elem.id,elem.data), setEditing(elem.id),
                           setInputData(elem.data))
                         }
                           ></img>

                       </button>
                         <button>
                         <img src={strikeText} 
                         style={{padding:'1px 1px'}} width={'30px'} 
                         disable={elem.isStrikeThrough}
                         onClick={()=>dispatch(toggleStrikeThrough(elem.id))}>
                         </img>
                       </button>
                        </>
                        }
                        
                         
                         
                  </div>
                            
           </div>
            )
                })
        }
          

         </div>
            <div className='showItems'>
               <button className='btn effect04' 
               data-sm-link-text="remove All" 
               onClick={()=>dispatch(removeTodo())}>
                <span>Clear List</span></button>
               
           </div>
      </div>
    </div>
    </>
  )
}

export default Todo