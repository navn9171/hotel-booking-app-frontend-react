import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";

const Bookings = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        fetchAllBookings();
    }, [])

    const fetchAllBookings = async() => {
        axios.get('http://localhost:3000/api/v1/bookings')
        .then(function(response){
            setBookings(response.data);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    const cancleBooking = async(id) => {
        await axios.delete(`http://localhost:3000/api/v1/booking/${id}`)
        .then(function(response){
            alert(response.data);
            fetchAllBookings();
        })
        .catch(function(error){
            console.log(error);
        });
    }

    return (
        <div className="container">
            <h1>All Bookings</h1>
            <table className="table shadow table-hover table-bordered ">
                <thead className="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Hotel Name</th>
                    <th scope="col">Check In Date</th>
                    <th scope="col">Check Out Date</th>
                    <th scope="col">Rooms Booked</th>
                    <th scope="col">location</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={booking.booking_id}>
                            <th scope="row">{booking.booking_id}</th>
                            <td>{booking.hotel_name}</td>
                            <td>{booking.check_in_date}</td>
                            <td>{booking.check_out_date}</td>
                            <td>{booking.no_of_room}</td>
                            <td>{booking.location}</td>
                            <td>
                                <Link className='btn btn-outline-primary' to={`/editBooking/${booking.booking_id}`}>Edit</Link>
                                <Link onClick={()=> cancleBooking(booking.booking_id)} style={{marginLeft:"20px"}} className="btn btn-outline-danger">Cancel</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Bookings