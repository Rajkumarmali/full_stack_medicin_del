import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';







const Home = () => {

    const [medicineItme, setMedicineItem] = useState([])
    const [medicineCategory, setMedicineCategory] = useState([]);
    const [search, setSearch] = useState('')

    

    const loadData = async () => {
        const response = await fetch('http://localhost:3001/displayItem', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        // console.log(responseData[0],responseData[1])
        setMedicineItem(responseData[0]);
        setMedicineCategory(responseData[1]);

    }

    



    useEffect(() => {
        loadData();
      //  loadDoctorData();
    }, [])
    // console.log(doctor)
    return (
        <div>

            <div>
                <div id="carouselExampleRide" className="carousel slide h-30" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel '>
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active" style={{ "height": "700px" }}>
                            <img src="https://wallpaperaccess.com/full/4204887.jpg" className="d-block w-100 " alt="..." />
                        </div>
                        <div className="carousel-item" style={{ "height": "700px" }}>
                            <img src="https://c1.wallpaperflare.com/preview/213/765/189/first-aid-kit-first-aid-kit-medical.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" style={{ "height": "700px" }}>
                            <img src="https://cdn.pixabay.com/photo/2016/12/05/19/49/syringe-1884784_640.jpg" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>



            <div className='container'>
                {
                    medicineCategory !== [] ? medicineCategory.map((data) => {
                        return (
                            <div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {
                                    medicineItme !== [] ? medicineItme.filter((item) => (item.CategoryName === data.CategoryName) &&
                                        ((item.name.toLowerCase().includes(search.toLocaleLowerCase())) ||
                                            (item.description.toLowerCase().includes(search.toLocaleLowerCase())))
                                    )
                                        .map(filterItme => {
                                            return (
                                                <div key={filterItme._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card medicineItem={filterItme}
                                                    ></Card>

                                                </div>
                                            )
                                        }) : ""
                                }

                            </div>
                        )
                    }) : ''
                }


            </div>

            <div><Footer /></div>

        </div>
    );
}

export default Home;
