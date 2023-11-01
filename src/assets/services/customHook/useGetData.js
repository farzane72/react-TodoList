import { TodoReducer,initialState } from "../reducers/todoReducer"
import { useReducer,useEffect } from "react"
import { GetData } from "../api";
export function useGetData() {
    // const [state, dispatch] = useReducer(TodoReducer, initialState);
    // let {  isSubmit, statusTasks } = state;


    useEffect(( isSubmit, statusTasks) => {
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
      
          // return () => {
          //   abortController.abort();
          // };
        }, [isSubmit, statusTasks]);


    return {isSubmit, statusTasks}
   
}

