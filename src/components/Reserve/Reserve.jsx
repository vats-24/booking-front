import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import "./reserve.css"
import useFetch from '../../hooks/useFetch'

const Reserve = ({setOpen, hotelId}) => {
//selected room
  const [selectedRoom, setSelectedRoom] = useState([])
  const {data,loading,error} = useFetch(`http://localhost:8080/api/hotels/room/${hotelId}`)

  // const handleSelect = (e) =>{
  //   const checked =  e.target.checked;
  //   const value = e.target.value;
  //   setSelectedRoom(
  //     checked
  //        ? []
  //   )
  // }
  return (
    <div className="reserve">select
        <div className="rcontainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your Rooms! </span>
        {data.map(item=>(
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rprice">{item.price}</div>
            </div>
              {item.roomNumbers.map(roomNumber=>(
                <div className="room">
                <label>{roomNumber.number}</label>
                <input type='checkbox' value={roomNumber._id} onChange={handleSelect}/>
                </div>
              ))}
            </div>
        ))}
        </div>
    </div>
  )
}

export default Reserve