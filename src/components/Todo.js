import React, {useState} from 'react'
import todo from './todo.css'
import { updateList,editTodo,cancelEdit} from '../actions/index'
import { useSelector,useDispatch } from 'react-redux';
import restore from "../images/restore.jpeg";
import deleteIcon from "../images/deleteIcon.png";
import strikeText from "../images/strikeText.jpeg";
import editIcon from "../images/editIcon.png";
import done from "../images/done.png";
import cancle from "../images/cancle.png";
import add from "../images/add.png";
import logo from "../images/logo.png";

const Todo = () => {

const[inputData, setInputData]=useState('');
const [editing,setEditing]=useState(null);


const list= useSelector((state)=>state.todoReducers.list);
const toggleSoftDeleteHandler = (id) => {
    const updatedData = list.map(element => {
        if(element.id === id){
          element.isStrikeThrough = !element.isStrikeThrough;
          return element
        }else {
          return element
        }
      })
    dispatch(updateList(updatedData))
  }

const deleteAllHandler = () => {
  const updatedData = []
  dispatch(updateList(updatedData))
}

const addItemHandler =(data)=>{
  if(!data){
    return
  }
  const newElement={
            id:new Date().getTime().toString(),
            data:data,
            isStrikeThrough:false,
            time:new Date().toLocaleString(),
            updatedAt:new Date().toLocaleString(),
            isEditing:false,
  }
  const newList=list.concat([newElement])
  dispatch(updateList(newList))
  setInputData('')
}
const handlePermanentDelete = (id)=>{
  const updatedData= list.filter((element)=>(element.id !==id))
  
  dispatch(updateList(updatedData))
}
const handleEditTodo = (id)=>{
  const updatedData = list.map(element => {
    if(element.id === id){
      element.isEditing = !element.isEditing;
      return element
    }else {
      return element
    }})
    console.log(updatedData)
  dispatch(updateList(updatedData))
  
  
}
 
const handleUpdateTodo=(id,data)=>{

  if(!data){
return
  }
  const updatedData=list.map(element=>{
    if(element.id===id){
      element.data=data
      element.isEditing=false
      element.updatedAt=new Date().toLocaleString()
    }
    return element
   
  } 
   
  )
  
  dispatch(updateList(updatedData))

    setInputData('') 
    
  }


const dispatch= useDispatch();

  return (
    <>
    <div className='main-div'>
      <div className='chlid-div'>
       <img style={{marginTop:'3rem',maxHeight:'11vh',marginLeft:'2rem',backgroundColor:"green"}} src={logo}></img>
        <h2 style={{marginTop:'3rem'}}>Add your items here</h2>
        

        <div className='add-items'>
          
          <input style={{padding:"6px 8px",borderRadius:'15px',width:"300px",margin:'50px 25px'}}
             type="text" 
             placeholder="Apple"
             value={inputData}  
             onChange={(e)=>setInputData(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && addItemHandler(inputData)}>
          </input>

           <button>
            <img src={add} width="16px" 
             style={{width:'25px',marginBottom:'-2px'}} 
             onClick={()=> {addItemHandler(inputData)}}>
            </img>
           </button>
       </div>
        <div className='list-items'>
        
            {
              list.map((elem)=>{
                
                return(
                 
                     <div className="eachItem"  
                        style={{textDecoration: elem.isStrikeThrough ? "line-through" : "none"}} 
                        key={elem.id}>
                        {elem.isEditing?
                             <>
                           <input  style={{padding:"4px 6px",height:"30px",width:'400px',borderRadius:'15px',color:"white",backgroundColor:"grey",fontSize:"large",fontStyle:"italic"}}
                           type="text" 
                            value={inputData}
                            
                            onChange={(e)=>setInputData(e.target.value)}>
                          </input>
                          <button style={{margin:'auto 1px' }}>   
                            <img 
                            src={done}  
                             width={'20px'}
                            onClick={()=>handleUpdateTodo(elem.id,inputData)}>
                            </img>
                          </button>

                         <button style={{margin:'auto 1px' }}>
                            <img 
                            src={cancle}  
                             width={'20px'}
                             
                            onClick={()=>handleEditTodo(elem.id)}>
                           </img>
                        </button>
                      </>
                        :
                        
                        <div className='items'>
                          
                        <h4 style={{marginBottom:'6px'}}> {elem.data}</h4> 
                        <div style={{display:'inline-grid'}}>
                        <div style={{fontSize:'10px', fontStyle:'italic', color:'white',display:'flex'}}>
                          
                          <span style={{margin:'12px'}}>Created At :{elem.time}</span><span style={{margin:'12px'}}>Last Modified : {elem.updatedAt}</span> 
                          </div>
                        </div>
                        </div>
                        }   
                   <div>
                       
                         {elem.isStrikeThrough? 
                         <>
                           <button style={{margin:'auto 5px' }}>
                             <img src={deleteIcon} width={'20px'} alt="" 
                             onClick={()=>handlePermanentDelete(elem.id)}
                             ></img>
                           </button>
                           <button>
                             <img style={{padding:'1px 1px'}} src={restore} width={'20px'}  alt=""
                             disable={!elem.isStrikeThrough}
                             onClick={()=>toggleSoftDeleteHandler(elem.id)} ></img>
                           </button>
                           </>:(elem.isEditing?null:<>
                                <button style={{margin:'auto 5px' }}>
                                
                                  <img src={editIcon}  width={'20px'} alt="" 
                                  onClick={()=>handleEditTodo(elem.id)
                                          }
                                  ></img>

                              </button>
                              <button>
                                <img src={strikeText} 
                                  width={'20px'} 
                                disable={elem.isStrikeThrough}
                                onClick={()=>toggleSoftDeleteHandler(elem.id)}>
                                </img>
                            </button>
                        </>)
                        }
                        
                         
                            
                  </div>
                            
          
                 </div>
               
            )
                })
        }
       

      </div>
            <div >
               <button  className='clearItem'
               onClick={()=>deleteAllHandler()}>
               <h3>Clear List</h3> </button>
               
           </div>
      </div>
    </div>
    </>
  )
}

export default Todo