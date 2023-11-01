import axios from "axios";
import { Base_Url } from "../../constants";

export const GetData = async ({ endPoint, params="" }) => {
   // try {
      
      const response = await axios.get(`${Base_Url}/${endPoint}${params}`);
     // console.log(`${Base_Url}/${endPoint}${params}`);
      return response.data;
    //} 
    // catch (error) {
    //   console.log(error.response);
    //   alert(error);
    // }
  };

  export const SetData = async ({endPoint,data}) => {
    try {
    
    const res = await axios.post( `${Base_Url}/${endPoint}`,data)
   // console.log(res.data);

    } catch (error) {
       alert(error);
    }
  };

  export const UpdateData = async ({endPoint,id,data}) => {
    try {
    
    const res = await axios
    .patch(`${Base_Url}/${endPoint}/${id}`,data)

    } catch (error) {
       alert(error);
    }
  };

  export const DeleteData = async ({endPoint,id}) => {
    try {
    
    const res = await axios
    .delete(`${Base_Url}/${endPoint}/${id}`)
   // console.log(res.data);

    } catch (error) {
       alert(error);
    }
  };