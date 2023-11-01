import Title from "../components/title/title";
import AddTask from "../components/addTask/addTask";
import Button from "../components/buttons/button";
import List from "../components/list/list";
import { GetData, SetData, UpdateData, DeleteData } from "../services/api";
import { useEffect, useReducer,useRef } from "react";
import { TodoReducer, initialState } from "../services/reducers/todoReducer";
import Loading from "../components/loading/loading";
import Error from "../components/error/error";
//import { useGetData } from "../services/customHook/useGetData";
import Modal from "../components/modal/modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ToDo() {
  const inputRef = useRef();
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  let { newTask, editTask, tasks, loading ,isSubmit, statusTasks,isModal,selectedId} = state;

  
//-----------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
  useEffect(() => {
   // const abortController = new AbortController();
    dispatch({ type: "loading" });
    //--------------------------------------------------------------
    statusTasks === "done" &&
      GetData({
        endPoint: "todos",
        params: `?status=${true}`,
        //signal:{signal:contrller.signal}
      }).then((data) => dispatch({ type: "get", payload: data }));

    statusTasks === "todo" &&
      GetData({
        endPoint: "todos",
        params: `?status=${false}`,
      }).then((data) => dispatch({ type: "get", payload: data }));

    statusTasks === "all" &&
      GetData({
        endPoint: "todos",
        params: "",
      })
        .then((data) => dispatch({ type: "get", payload: data }))
        .catch((err) => dispatch({ type: "error" }));
    //------------------------------------------------------------------------------------------------------
    inputRef.current.focus()
    // return () => {
    //   abortController.abort();
    // };
  }, [isSubmit, statusTasks]);

  useEffect(() => {
    dispatch({ type: "newTask" });
  }, [editTask]);

  function handleSubmit() {
    editTask? 
        UpdateData({
          endPoint: "todos",
          id: `${editTask.id}`,
          data: { task: newTask },
        }).then(dispatch({ type: "submit" }))
     // : newTask !== "" &&
     : (newTask !== "") ?
     SetData({
      endPoint: "todos",
      data: {
        task: newTask,
        status: false,
      },
    }).then(dispatch({ type: "submit" }))
    
 
     :
     toast(" You didn't enter any word! ")
       // dispatch({ type: "modal", payload:{id:0,type:"emptyTask"} })

  }

  function handleDelete(id) {
   
    DeleteData({ endPoint: "todos", id: `${id}` }).then(
      dispatch({ type: "reRender" })
    );
  }
  function handleTik(id, tasksStatus) {
    
    UpdateData({
      endPoint: "todos",
      id: `${id}`,
      data: { status: !tasksStatus },
    }).then(dispatch({ type: "reRender" }));
  }
  function handleEdit(task) {
    dispatch({ type: "edit", payload: task });

    //mitone dobare az tarigh id select fetch bokhore nemidonam kodom dorost tare?
  }

  //-------------------------------------------------------------------------------------------
  function handleBtnDone() {
    dispatch({ type: "done" });
  }

  function handleBtnTodo() {
    dispatch({ type: "todo" });
  }
  function handleBtnAll() {
    dispatch({ type: "all" });
  }

  return (
    <>
      {statusTasks === "error" ? (
        <Error />
      ) : (
        <div className="w-[600px] mx-auto mt-8  p-4 flex flex-col justify-center align-middle  border rounded-xl ">
          <ToastContainer />
          <Title>TodoInput</Title>
          <AddTask
            newTask={newTask}
            dispatch={dispatch}
            handleSubmit={handleSubmit}
            editTask={editTask}
            inputRef={inputRef}
          />
          
          <>
            <Title>TodoList</Title>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4 ">
                  <Button
                    classMore={`${
                      statusTasks === "all" ? "bg-red-700" : "bg-cyan-900"
                    }`}
                    callback={handleBtnAll}
                  >
                    All
                  </Button>
                  <Button
                    classMore={`${
                      statusTasks === "done" ? "bg-red-700" : "bg-cyan-900"
                    }`}
                    callback={handleBtnDone}
                  >
                    Done
                  </Button>
                  <Button
                    classMore={`${
                      statusTasks === "todo" ? "bg-red-700" : "bg-cyan-900"
                    }`}
                    callback={handleBtnTodo}
                  >
                    Todo
                  </Button>
                </div>

                <List
                  tasks={tasks}
                  handleDelete={handleDelete}
                  handleTik={handleTik}
                  handleEdit={handleEdit}
                  statusTasks={statusTasks}
                  dispatch={dispatch}
                  isModal={isModal}
                  selectedId={selectedId}
                />

                <div className="grid grid-cols-2 gap-4 ">
                  <Button classMore="bg-red-700 ">Delete done tasks</Button>
                  <Button classMore="bg-red-700 ">Delete all tasks</Button>
                </div>
              </>
            )}
          </>
        </div>
         
      )}
      {
        // (isModal==="emptyTask" )&&
        // <Modal text="You shound enter a word " type="emptyTask"/>
      }
    </>
  );
}

export default ToDo;
