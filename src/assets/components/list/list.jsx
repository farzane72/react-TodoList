import Task from "../task/task";
import Title from "../title/title";
function List(props) {
  const { tasks, handleDelete, handleTik, handleEdit, statusTasks, dispatch ,isModal,selectedId} = props;

  return (
    <div>
      {tasks.length === 0 && statusTasks === "done" && (
        <Title>You didn't do anything</Title>
      )}
      {tasks.length === 0 && statusTasks === "todo" && (
        <Title>You did all your tasks</Title>
      )}
      {tasks.length === 0 && statusTasks === "all" && (
        <Title>You didn't enter any task</Title>
      )}
      {tasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          handleDelete={handleDelete}
          handleTik={handleTik}
          handleEdit={handleEdit}
          dispatch={dispatch}
          isModal={isModal}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
}

export default List;
