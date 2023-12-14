import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Reserve = ({setOpen, hotelId}) => {
  return (
    <div className="reserve">
        <div className="rcontainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your Rooms! </span>
        </div>
    </div>
  )
}

export default Reserve