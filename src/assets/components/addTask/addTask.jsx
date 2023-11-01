
import Button from "../buttons/button";
import Note from "../../../../public/svgs/note";
import axios from "axios";

function AddTask(props) {
    let{newTask,dispatch,handleSubmit,editTask,inputRef}=props
  
    
    function handleSubmit2(e){
      e.preventDefault()
      handleSubmit()
    }

    
   
  return (
    <div className="p-4 border rounded-sm ">
      <form  className="flex flex-col gap-4" onSubmit={(e)=>handleSubmit2(e)}>
        <div className="flex ">
          <div className="bg-cyan-900 p-1 flex justify-center items-center rounded-l-sm">
            {/* <Note /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="w-full border pl-4 rounded-r-sm  "
            placeholder="New Todo"
            value={newTask}
            onChange={e=>dispatch({type:"addTask",payload:e.target.value})
              //setNewTask(newTask=>e.target.value)
            }
           // ref={newTask}
           ref={inputRef}
          />
        </div>
        <Button classMore="bg-cyan-900 ">{editTask?"Edit":"Add new Task"}</Button>
      </form>
     
    </div>
  );
}
//{editTask?"Edit":"Add new Task"}
export default AddTask;
