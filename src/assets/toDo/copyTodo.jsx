import Title from "../components/title/title";
import AddTask from "../components/addTask/addTask";
import Button from "../components/buttons/button";
import Task from "../components/task/task";
import axios from "axios";
import { useState, useEffect} from "react";
function ToDo() {
  let [newTask, setNewTask] = useState("");
  let [editTask, setEditTask] = useState(null);
  let [tasks, setTasks] = useState([]);
  let [isSubmit, setIsSubmit] = useState(false);
  let [statusTasks, setStatusTasks] = useState("all");

  //let [statusClick, setStatusClick] = useState("");
  //in j dada
  // let[doneTasks,setDoneTasks]=useState(false)
  // let[toDoTasks,setToDoTasks]=useState(false)
  //let [selectedId,setSelectedId]=useState(0)

  

  useEffect(() => {
    const abortController = new AbortController();
    //---------------------in j dada-----------------------------------------
    statusTasks === "done" &&
      axios.get("http://localhost:3000/todos?status=true").then((res) =>
        setTasks(
          res.data
          // setDoneTasks(false)
        )
      );
    statusTasks === "todo" &&
      axios.get("http://localhost:3000/todos?status=false").then(
        (res) => setTasks(res.data)
        // setToDoTasks(false)
      );
    statusTasks === "all" &&
      axios
        .get("http://localhost:3000/todos")
        .then((res) => setTasks(res.data));
    //------------------------------------------------------------------------------------------------------
    
    return () => {
        abortController.abort();
      };


  }, [isSubmit, statusTasks]);

  useEffect(() => {
    editTask ? setNewTask((newTask) => editTask.task) : setNewTask("");
  }, [editTask]);

  function handleSubmit() {
    editTask
      ? axios
          .patch(`http://localhost:3000/todos/${editTask.id}`, {
            task: newTask,
          })
          .then(
            setIsSubmit(!isSubmit),
            setNewTask("")
          )
      : axios
          .post("http://localhost:3000/todos", {
            // task:newTask.current.value,
            task: newTask,
            status: false,
          })
          .then(
            setIsSubmit(!isSubmit),
            setNewTask("")
          );
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then(setIsSubmit(!isSubmit));
  }
  function handleTik(id, tasksStatus) {
    axios
      .patch(`http://localhost:3000/todos/${id}`, {
        status: !tasksStatus,
      })
      .then(setIsSubmit(!isSubmit));
  }
  function handleEdit(task) {
    setEditTask((editTask) => task);

    //mitone dobare az tarigh id select fetch bokhore nemidonam kodom dorost tare?
  }

  //-------------------------------------------------------------------------------------------
  function handleBtnDone() {
    setStatusTasks("done");
    
  }

  function handleBtnTodo() {
    
    setStatusTasks("todo");
  }
  function handleBtnAll() {
    
    setStatusTasks("all");
    
  }

  return (
    <div className="w-[600px] mx-auto mt-8  p-4 flex flex-col justify-center align-middle  border rounded-xl">
      <Title>
        <h1 className="font-bold text-xl">TodoInput</h1>
      </Title>
      <AddTask
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
      />
      <Title>
        <h1 className="font-bold text-xl">TodoList</h1>
      </Title>
      <div className="grid grid-cols-3 gap-4 ">
        <Button classMore="bg-cyan-900 " callBack={handleBtnAll}>
          All
        </Button>
        <Button classMore="bg-cyan-900  " callBack={handleBtnDone}>
          Done
        </Button>
        <Button classMore="bg-cyan-900 " callBack={handleBtnTodo}>
          Todo
        </Button>
      </div>
      {
        // (doneTasks.length>0?doneTasks:toDoTasks.length>0?toDoTasks:tasks).map(task=>
        tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            handleDelete={handleDelete}
            handleTik={handleTik}
            handleEdit={handleEdit}
          />
        ))
      }

      <div className="grid grid-cols-2 gap-4 ">
        <Button classMore="bg-red-700 ">Delete done tasks</Button>
        <Button classMore="bg-red-700 ">Delete all tasks</Button>
      </div>
    </div>
  );
}

export default ToDo;
