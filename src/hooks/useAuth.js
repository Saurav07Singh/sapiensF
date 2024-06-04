import { useContext } from "react";
import AppContext from "../context/AuthProvider";

const useAuth= ()=>{
    return useContext(AppContext);
}

export default useAuth;