 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from 'react'
import "./reserve.css"
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/searchContext';
import { getDate } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reserve = ({setOpen, hotelId}) => {
//selected room
  const [selectedRoom, setSelectedRoom] = useState([])
  const {data,loading,error} = useFetch(`http://localhost:8080/api/hotels/room/${hotelId}`)
  const {dates} = useContext(SearchContext)


  const getDatesInRange = (startDate,endDate)=>{
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime());

    const dates = []

    while(date<= end){
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate()+1 )
    }

    return dates
  }

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  const isAvailable = (roomNumber) =>{
    const isFound = roomNumber.unavailableDates.some(date=>
      allDates.includes(new Date(date).getTime())
      );
      return !isFound
  }

  const handleSelect = (e) =>{
    const checked =  e.target.checked;
    const value = e.target.value;
    setSelectedRoom(checked ? [...selectedRoom, value]: selectedRoom.filter((item)=> item !== value))
  }

  const navigate = useNavigate()

  const handleClick =async ()=>{
    try {
      await Promise.all(
        selectedRoom.map((roomId)=>{
          const res = axios.put(`http://localhost:8080/api/rooms/availability/${roomId}`,{
            dates: allDates,
          })
          return res.data
        })
      )
      setOpen(false) 
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="reserve">select
        <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        /> 
        <span>Select your Rooms! </span>
        {data.map(item=>(
          <div className="rItem">
            <div className="rInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rprice">{item.price}</div>
            </div>
            <div className="rSelectRooms"></div>
              {item.roomNumbers.map(roomNumber=>(
                <div className="room">
                <label>{roomNumber.number}</label>
                <input type='checkbox' disabled={!isAvailable(roomNumber)} value={roomNumber._id} onChange={handleSelect}/>
                </div>
              ))}
            </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        </div>
    </div>
  )
}

export default Reserve