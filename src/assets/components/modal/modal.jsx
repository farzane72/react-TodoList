

function Modal(props) {
  const { type, text, taskId, handleDelete, dispatch } = props;

  function modalYes(taskId) {
    handleDelete(taskId);
    dispatch({ type: "modal", payload: {id:0,type:""} });
  }
  function modalNo() {
   // console.log("noooooo");
    dispatch({ type: "modal", payload:{id:0,type:""} });
  }
  
 
  return (
    <>
      <div className="w-[300px] bg-cyan-900 absolute right-4 top-4 p-4 flex justify-center items-center border rounded-md">
        <div className="   text-white flex flex-col gap-4">
          <p>{text}</p>

          <div className="flex justify-center gap-4">
            {type === "delete" && (
              <button
                className="bg-white text-cyan-900 border-cyan-900 px-2 py-1 rounded-md"
                onClick={() => modalYes(taskId)}
              >
                Yes
              </button>
            )}
            <button
              className="bg-white text-cyan-900 border-cyan-900 px-2 py-1 rounded-md"
              onClick={() => modalNo()}
            >
              {(type === "delete") ? "No" : "Ok"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
