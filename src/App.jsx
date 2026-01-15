import React,{useState,useRef} from 'react'
import './App.css'

const App = () => {
  const [collection,setCollection]=useState([]);
  const [display_type,setDisplay_type]=useState('All');
  const input_todo_task=useRef();

  //adding taks
  function adding_task(){
    if(!input_todo_task.current.value.trim()) {
      alert("Enter your task")
    }else{
    setCollection([...collection,{task: `${input_todo_task.current.value}` , checked:false}])
    input_todo_task.current.value='';}
  }

  //toggle checkbox
  function checkbox_toggle(id){

    setCollection(prev=>
      prev.map((item,index)=>
         id===index ? {...item , checked:!item.checked} : item
      )
    )

  }


  function edit_function(id){

     setCollection(prev=>
      prev.filter((item,index)=>{
         if(index===id){
            input_todo_task.current.value=`${item.task}`;
            return false;
         }
            return true;
      })
    
     )
  }


  function delete_function(id){

    setCollection(prev=>
      prev.filter((item,index)=>
        id===index ? false : true 
      )
    )

  }

  return (
    <div className='full_container'>
      <div className='container'>
       <div className="input_container">
          <p>Let's be prouctive...</p>

          <div className='input_list'>
            <input ref={input_todo_task} type="text" />
            <button onClick={adding_task}>Add</button> 
          </div> 

       </div>

       <div className='display_list_container'>
        <div className='category_container'>
          <button style={{backgroundColor:display_type==='All' ? 'rgb(37, 27, 148)': ''}} onClick={()=> setDisplay_type('All')}>All</button>
          <button style={{backgroundColor:display_type==='Completed' ? 'rgb(37, 27, 148)': ''}} onClick={()=> setDisplay_type('Completed')}>Completed</button>
          <button style={{backgroundColor:display_type==='Remaining' ? 'rgb(37, 27, 148)': ''}} onClick={()=> setDisplay_type('Remaining')}>Remaining</button>
        </div>

          {
            collection.filter((item)=>{
               
              if(display_type==='All'){
                return true;
              }else if(display_type==='Completed'){
                  return item.checked
                }else if(display_type==='Remaining'){
                    return !item.checked
                }
              }

            ).map((item,index)=>
           {
            return(<div className='each_task_container' key={index}>
              <input type="checkbox" checked={item.checked} onClick={()=>checkbox_toggle(index)}/>
              <p>{item.task}</p>
              <button className='edit_button' onClick={()=>edit_function(index)}>Edit</button>
              <button className='delete_button' onClick={()=> delete_function(index)}>Delete</button>
            </div>
            )
           }
          )

          }

          
       </div>
       </div>
    </div>
  )
}

export default App
