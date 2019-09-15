import React from 'react'

const BoredItem = ({ activity, removeCard }) => {
  return (
    <div className="card hoverable">
      <i
        className="material-icons close-icon"
        onClick={() => removeCard(activity.key)}
      >
        close
      </i>
      <div className="card-content">
        <h4>
          <blockquote>{activity.activity}</blockquote>
        </h4>
        <h6 className="red-text">
          <strong>{activity.type.toUpperCase()}</strong>
        </h6>
        <p>Participants number</p>
        <p className="red-text text-darken-1">
          <strong>{activity.participants}</strong>
        </p>
        <p>Accessibility</p>
        <p className="red-text text-darken-2">
          <strong>{activity.accessibility}</strong>
        </p>
        <p>Price</p>
        <p className="red-text text-darken-3">
          <strong>{activity.price}</strong>
        </p>
      </div>
    </div>
  )
}

export default BoredItem
