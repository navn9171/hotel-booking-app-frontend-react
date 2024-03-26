import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function HotelsListing() {
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        fetchAllHotels();
        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    }, [])

    const fetchAllHotels = async () => {
        await axios.get("http://localhost:3000/api/v1/hotel")
        .then(function (response){
            setHotels(response.data)
            // console.log(hotels);
        })
        .catch(function (error){
            console.log(error);
        });
    }

    return(
        <div className="container mt-5">
            <table class="table shadow table-hover table-bordered ">
                <thead class="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Hotel Name</th>
                    <th scope="col">location</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {hotels.map((hotel, index) => (
                        <tr>
                            <th scope="row">{hotel.id}</th>
                            <td>{hotel.name}</td>
                            <td>{hotel.location}</td>
                            <td>
                                <Link to={`/bookHotel/${hotel.id}`} style={{marginLeft:"20px"}} class="btn btn-outline-primary mr-1">Book</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HotelsListing;