import React from 'react';
import { useCart, useDispatchCart} from '../components/ContextRed';


const Cart = () => {

    const data = useCart();
   const dispatch = useDispatchCart();
   
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The cart is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        
        let response = await fetch("http://localhost:3001/myOrder", { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
          })
        });
     //   console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
          dispatch({ type: "DROP" })
        }
       
      }
    


    const totalPrice = data.reduce((total, medicine) => total + medicine.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'>
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((medicine, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{medicine.name}</td>
                                <td>{medicine.qty}</td>

                                <td>{medicine.price}</td>
                                <td ><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} >X</button> </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
