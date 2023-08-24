import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);
   
    

    const loadDoctorData = async () => {
        try {
            const response = await fetch('http://localhost:3001/doctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setDoctors(data);
                } else {
                    console.error('No doctor data found.');
                }
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadDoctorData();
    }, []);

    const handleAppointment = async (selectedDoctor) => {
        let userEmail = localStorage.getItem("userEmail");
        // const currentDate = new Date();
        // const orderTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      //  console.log("Generated order_time:", orderTime);
      //console.log("Sig",selectedDoctor.signature)
          await fetch("http://localhost:3001/myDoctor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: [
                    {
                        name: selectedDoctor.name,
                        degree: selectedDoctor.degree,
                        img:selectedDoctor.img,
                        specialization:selectedDoctor.Specialization,
                        id:selectedDoctor._id,
                        experience: selectedDoctor.experience,
                        hosptial:selectedDoctor.hosptil,
                        roomNo:selectedDoctor.roomNo,
                        signature:selectedDoctor.signature,
                        
                     //   time: orderTime,
                    }
                ],
                email: userEmail,
                order_date: new Date().toDateString(),
              
            })
        });
        

        // Handle the response as needed
    };

    return (
        <div className='container'>
            <div className='row'>
           
                {doctors.map(doctor => (
                    <div key={doctor._id} className="col-12 col-md-6 col-lg-3">
                        <div className="card" style={{ width: '100%' }}>
                            <img src={doctor.img} className="card-img-top h-200" alt="..." style={{ height: "210px" }} />
                            <div className="card-body">
                                <h5 className="card-title">{doctor.name}</h5>
                                <h6>{doctor.degree}</h6>
                                <h6 className="card-text">{doctor.Specialization}</h6>
                                <h6 className="card-text">{doctor.hosptil}</h6>
                                 <h6 className='catd-text'>{doctor.experience}</h6>
                                <div className='container w-100'>
                                    <hr />
                                    {
                                        (localStorage.getItem("authToken")) ?  <button className='btn btn-success justify-center' onClick={() => handleAppointment(doctor)}>Appointment</button> : 
                                        <Link  to="/login">Please Login</Link>
                                    }
                       
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctor;
