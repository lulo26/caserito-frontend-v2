import { useNavigate, Outlet } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../store/constant';

const PrivateRoute = ()=> {
  const localStorageToken = localStorage.getItem(ACCESS_TOKEN_NAME) 
  const navigate = useNavigate();
  if (!localStorageToken){
    navigate('/pages/login')
    return <Navigate
              to= "/pages/login"
              replace
            />
  }
  return  <Outlet/>
  }

  export default PrivateRoute