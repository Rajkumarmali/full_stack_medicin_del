import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Modal from '../Model';
import Cart from '../pages/Cart';
import { useCart } from './ContextRed';
const Navbar = () => {

  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false)
  const data = useCart()


  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">Medicine</Link>
        <Link className="navbar-brand fs-1 fst-italic" to="/doctor">Doctor</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            {/* <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
            </li> */}
            {
              (localStorage.getItem("authToken")) ?
              <div>
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myorder">MyMedicines</Link>
                </li> 
                
                </div>: ""
            }
            {
              (localStorage.getItem("authToken")) ?
              <div>
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myApoi">Appointment Letter</Link>
                </li> 
                
                </div>: ""
            }
          </ul>
           
          {
            (!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="signup">SignUp</Link>
                
              </div> : <div>

                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>My Cart {""}
                  {
                    data.length>0&&(<Badge pill bg='danger'>{data.length}</Badge>)
                  }
                </div>
                {
                  cartView?<Modal onClose={()=>{setCartView(false)}}><Cart/></Modal>:null
                }
                <div className='btn bg-white text-success mx-2' onClick={handleLogout}>LogOut</div>

              </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
