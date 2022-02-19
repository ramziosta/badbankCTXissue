import { Link } from "react-router-dom";
function Logout() {
 
  return (
    <div style={{height:"710px"}}>
     <Link to ="/login" class="fa fa-user" ></Link>
      <h1 style={{textAlign: 'center', marginTop:"5rem"}}>Account Logout</h1>
    </div>
  );
}

export default Logout;
