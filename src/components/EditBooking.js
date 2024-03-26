import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditBooking = () => {
    const [bookingId, setBookingId] = useState(useParams().id)
    const [roomBooked, setRoomBooked] = useState(0)
    const [checkInDate, setCheckInDate] = useState(new Date())
    const [checkOutDate, setCheckOutDate] = useState(new Date())

    const navigate = useNavigate();

    useEffect(() => {
        getBookingById();
    }, [])

    const getBookingById = async() => {
        await axios.get(`http://localhost:3000/api/v1/booking/${bookingId}`)
        .then(function(response){
            console.log(response);
            setRoomBooked(response.data.no_of_room);
            setCheckInDate(response.data.check_in)
            setCheckOutDate(response.data.check_out)
        })
        .catch(function(error){
            console.log(error);
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        var data = JSON.stringify({"booking" : {
            "no_of_room" : Number(roomBooked),
            "check_in" : checkInDate,
            "check_out" : checkOutDate
        }})
        
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        console.log(data);
        await axios.put(`http://localhost:3000/api/v1/booking/${bookingId}`, data, config)
        .then(function(response){
            alert(response.data);
            navigate('/bookings');
        })
        .catch(function(error){
            console.log(error);
        });
    };

    return (
        <div className="container py-5">
            <div className="w-75 mx-auto shadow p-5">
                <form
                onSubmit={(e) => {
                    onSubmit(e);
                }}
                className="text-center border border-light py-1"
                action=""
                >
                <h1 className="py-3 text-center">Edit Hotel Details</h1>
                CHECK-IN
                <DatePicker style={{display:"block"}} showIcon selected={checkInDate} onChange={(date) => setCheckInDate(date)} />

                CHECK-OUT
                <DatePicker showIcon selected={checkOutDate} onChange={(date) => setCheckOutDate(date)} />

                <input 
                    onChange={(event)=>{setRoomBooked(event.target.value)}}
                    value={roomBooked}
                    type="text"
                    placeholder="Number Of Room"
                    className="mb-2 py-2 mt-2"
                    id="name"
                    name="name"/>

                <button
                    class="btn btn-outline-success btn-lg btn-block w-100"
                    type="submit"
                >
                    Update Details
                </button>
                </form>
            </div>
        </div>
    )
}

export default EditBooking