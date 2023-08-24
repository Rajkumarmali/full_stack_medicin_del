import React, { useState } from 'react';
import { useDispatchCart } from './ContextRed'; 
import { Link } from 'react-router-dom';

const Card = (props) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatchCart();
    // const data = useCart()
     const prices = qty*parseInt(props.medicineItem.price)
  
     const handleAddTOCart = async() => {

       
        await dispatch({
        type: "ADD",
        id: props.medicineItem._id,
        name: props.medicineItem.name,
        price: prices,
        qty: qty,
        img: props.medicineItem.img
    })
   // console.log(data)
   
  };

  
    return (
        <div>
            <div className="card mt-3" style={{ "width": '18rem' }}>
                <img src={props.medicineItem.img} className="card-img-top h-200" alt="..." style={{height:"210px"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.medicineItem.name}</h5>
                    <p className="card-text">{props.medicineItem.description}</p>   
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5 m-1'>₹ : {prices}</div>
                        <hr/>
                        {
                            (localStorage.getItem("authToken")) ? <button className='btn btn-success justify-center' onClick={handleAddTOCart}>Add to Cart</button>
                             : <Link  to="/login">Please Login</Link>
                        }
                       
                    </div>
                </div>
            </div>




        </div>
    );
}

export default Card;
