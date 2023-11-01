
const initialState={
    newTask:"",
    editTask:null,
    tasks:[],
    isSubmit:false,
    statusTasks:"all",
    loading:false,
    isModal:"",
    selectedId:0
    

}
function TodoReducer(state,action) {

    switch(action.type){
        case("get"):
            return {...state,tasks:action.payload,loading:false}
        case("addTask"):
          //  if(action.payload ==="") return {...state}
           // else
             return {...state,newTask:action.payload}
           
        case("newTask"):
            return {...state,newTask:(state.editTask ?state.editTask.task:"")}
        case("submit"):
            return {...state,isSubmit:!state.isSubmit,newTask:"",editTask:null}
        case("reRender"):
            return {...state,isSubmit:!state.isSubmit}
        case("edit"):
            return {...state,editTask:action.payload}
        case("done"):
            return {...state,statusTasks:"done"}
        case("todo"):
            return {...state,statusTasks:"todo"}
        case("all"):
            return {...state,statusTasks:"all"}
        case("error"):
            return {...state,statusTasks:"error"}
        case("loading"):
            return {...state,loading:true}
        case("modal"):
        console.log(action.payload);
           // return {...state,isModal:{status:action.payload.status,type:action.payload.type},selectedId:action.payload.id}
          // return {...state,isModal:action.payload[0],selectedId:action.payload[1]}
          return {...state,isModal:action.payload.type,selectedId:action.payload.id}
       

        default:
            throw new Error("you didn't choose any case");

    }
   
}

export {initialState,TodoReducer};