import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import jsPDF from 'jspdf';

const ApoiLet = () => {
    const [doctorData, setDoctorData] = useState({});
    const [patient, setPatient] = useState({});

    const fectPatientDet = async () => {
        try {
            const response = await fetch("http://localhost:3001/auth/patientDetail", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            if (response.ok) {
               
                const jsonResponse = await response.json();
                setPatient(jsonResponse);
               // console.log("Fetched patient data:", jsonResponse);
            } else {
                console.error("Request failed:", response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
       
    };





    const fetchMyOrder = async () => {
        // console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:3001/myDoctor/MyDoctordata", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setDoctorData(response)
        })

   }

    useEffect(() => {
        fetchMyOrder();
        fectPatientDet();
    }, [])


    const addDaysToDate = (date, days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }
    
    const downloadpdf = (doctorData) => {
        const pdf = new jsPDF();
        pdf.setFont('Arial', 'normal');


       const titleText = 'Appointment Letter';
    const titleFontSize = 20;
    const titleWidth = pdf.getStringUnitWidth(titleText) * titleFontSize / pdf.internal.scaleFactor;
    const xTitle = (pdf.internal.pageSize.width - titleWidth) / 2;

    // Title
    pdf.setFontSize(titleFontSize);
    pdf.text(titleText, xTitle, 20);
        
       
        pdf.text('Doctor Details:', 10, 40);

        pdf.setFontSize(12);

        pdf.text(`Doctor id: ${doctorData.id}`, 10, 50);
        pdf.text(`Doctor Name: ${doctorData.name}`, 10, 60);
        pdf.text(`Specialization: ${doctorData.specialization}`, 10, 70);
        pdf.text(`Hospital Name: ${doctorData.hosptial}`, 10, 80);
        pdf.text(`Room Num: ${doctorData.roomNo}`, 10, 90);
        pdf.text(`Time: 9 AM - 3 PM`, 10, 100);
        pdf.text(`Date: ${addDaysToDate(new Date(), 2).toDateString()}`, 10, 110);
        pdf.save('appointment_letter.pdf');

        pdf.setFontSize(20); 
        pdf.text('Patient Details:', 10, 130);
 
        pdf.setFontSize(12);

        pdf.text(`Appointment Id: ${patient.orderData._id}`, 10, 140);
        pdf.text(`Name: ${patient.orderData.name}`, 10, 150);
        pdf.text(`Email: ${patient.orderData.email}`, 10, 160);
        pdf.text(`Address: ${patient.orderData.location}`, 10, 170);

        // const image =  doctorData.img;
        // if(image){
        // pdf.addImage(image,'JPEG',15, 40, 40, 40);
        // console.log("Image",image)
        // }

        pdf.text('Signature of Doctor', 10, 250);

          if (doctorData.signature) {
             pdf.addImage(doctorData.signature, 'JPEG', 10, 250, 50, 20);
           }

        

        pdf.save('appointment_letter.pdf');
    };



    return ( 
        <div>
 
            <div className='container'>
                <div className='row'>
                    
                    {doctorData !== {} ? Array(doctorData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='m-auto mt-5 text-center'>
                                                            <div className='a4-size-page'>
                                                                <h2>Appointment Letter</h2>

                                                                <img src={arrayData.img} className='image' alt='' />
                                                                <div className='doctor_detail'>
                                                                    <h3>Doctor Details</h3>

                                                                    <div>Doctor id : {arrayData.id}</div>
                                                                    <div>Doctor Name : {arrayData.name}</div>
                                                                    <div>Specialization : {arrayData.specialization}</div>
                                                                    <div>Hosptial Name : {arrayData.hosptial}</div>
                                                                    <div>Room Num  : {arrayData.roomNo} </div>
                                                                    <div>Time : 9 AM - 3 PM</div>
                                                                    <div>Date : {addDaysToDate(new Date(), 2).toDateString()}</div>


                                                                </div>
                                                                <div className='doctor_detail'>
                                                                    <h5>Patient Details</h5>   
                                                                   <div>Appoinment Id : {patient.orderData._id}</div>  
                                                                   <div>Name : {patient.orderData.name}</div>
                                                                   <div>email : {patient.orderData.email}</div>
                                                                   <div>Address: {patient.orderData.location}</div>

                                                                </div>
                                                                <div className='signature'>
                                                                    <h7>Signature of Doctor</h7>
                                                                    <img src={arrayData.signature} className='img_sig' alt='' />
                                                                    <button className='btn' onClick={() => downloadpdf(arrayData)}>Download</button>
                                                                </div>


                                                            </div>

                                                           

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

           <div><Footer/></div>
        </div>
    );
}

export default ApoiLet;
