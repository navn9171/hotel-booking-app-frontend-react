import React, { useState } from 'react';
import { useNavigate , useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css";

const BookHotel = () => {
    // alert(useParams().id)
    const [hotelId, setHotelId] = useState(useParams().id)
    const [userId, setUserId] = useState(1)
    const [roomBooked, setRoomBooked] = useState()
    const [checkInDate, setCheckInDate] = useState(new Date())
    const [checkOutDate, setCheckOutDate] = useState(new Date())

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        var data = JSON.stringify({"booking" : {
            "hotel_id" : Number(hotelId),
            "user_id" : userId,
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
        await axios.post("http://localhost:3000/api/v1/book", data, config)
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
      <div class="w-75 mx-auto shadow p-5">
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          class="text-center border border-light py-1"
          action=""
        >
          <h1 class="py-3">Book Hotel</h1>
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
            Book
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookHotel