import { Delete, Edit, Tik, RegularTik } from "../../../../public/svgs";
import axios from "axios";
import Modal from "../modal/modal";
function Task(props) {
  const { task,handleDelete,handleEdit,handleTik,dispatch,isModal,selectedId } = props;
  
  

  function DeleteTask(id){
   // dispatch({type:"modal",payload:[true,id]})
   // dispatch({ type: "modal", payload:{status:true,id:id,type:"delete"} })
   dispatch({ type: "modal", payload:{id:id,type:"delete"} })
    
    
  }
  

  return (
    <>
    <div className="p-1 border  flex justify-between  items-center  my-2">
      <div className="pl-2 ">
        <span className={` ${task.status?"line-through decoration-red-400":""}`}>{task.task}</span>
      </div>
      <div className=" flex gap-2 ">
        
        {
            task.status?
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="w-6 h-6 cursor-pointer"
              onClick={()=>handleTik(task.id,task.status)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            :
    
            <span onClick={()=>handleTik(task.id,task.status)}
              className="w-5 h-5  border-2 border-green-700  rounded-full cursor-pointer"></span>
        }


        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="orange"
          className="w-6 h-6 cursor-pointer"
          onClick={()=>handleEdit(task)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-6 h-6 cursor-pointer"
          onClick={()=>DeleteTask(task.id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
    </div>
    {
       (isModal==="delete" && (task.id===selectedId))&&(
        <Modal  taskId={task.id} handleDelete={handleDelete} dispatch={dispatch}
        text={`Are you sure for deleting  ${task.task}?`} type="delete"/>
       )
     
    }
    
    </>
  );
}

export default Task;
