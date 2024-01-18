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
import logo from "../images/logo.png";
import { hover } from '@testing-library/user-event/dist/hover';

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
       <img style={{marginTop:'3rem',maxHeight:'11vh',marginLeft:'2rem',backgroundColor:"green"}} src={logo}></img>
        <h2>Add your items here</h2>
        

        <div className='add-items'>
          <input style={{padding:"6px 8px",borderRadius:'15px'}} type="text" placeholder="Enter items..."
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
                        :
                        <div style={{display:'flex'}}><h3> {elem.data}</h3> <div style={{fontSize:'12px', fontStyle:'italic', color:'white', margin:'auto 1em'}}> Created at {elem.time}</div> </div>
                        }   
                   <div>
                      
                          
                        
                        
                          
                         {elem.isStrikeThrough? 
                         <>
                           <button>
                             <img src={deleteIcon} width={'20px'} alt="" 
                             onClick={()=>dispatch(deleteTodo(elem.id))}
                             ></img>
                           </button>
                           <button>
                             <img style={{padding:'1px 1px'}} src={restore} width={'20px'}  alt=""
                             disable={!elem.isStrikeThrough}
                             onClick={()=>dispatch(unStrikeTodo(elem.id))} ></img>
                           </button>
                           </>:<>
                        <button style={{margin:'1em' }}>
                         
                           <img src={editIcon}  width={'20px'} alt="" 
                           onClick={()=>
                         
                           dispatch(editTodo(elem.id,elem.data), setEditing(elem.id),
                           setInputData(elem.data))
                         }
                           ></img>

                       </button>
                         <button>
                         <img src={strikeText} 
                         style={{padding:'1px 1px'}} width={'20px'} 
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
            <div className='clearItem'>
               <button  style={{backgroundColor: 'rgb(181, 73, 40)',
    color:'aliceblue',padding:'8px 20px',opacity:'.8',cursor:'pointer', hover:{opacity:'1.5'},borderRadius:'8px' }}
               onClick={()=>dispatch(removeTodo())}>
                Clear List</button>
               
           </div>
      </div>
    </div>
    </>
  )
}

export default Todo