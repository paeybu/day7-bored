import React, { useEffect, useState } from 'react'
import BoredItem from './BoredItem'
import axios from 'axios'
import M from 'materialize-css'

const Bored = () => {
  const BASE_URL = 'https://www.boredapi.com/api/activity'

  const [activities, setActivities] = useState([])
  const [params, setParams] = useState({
    type: '',
    participants: '',
    minPrice: '0',
    minaccessibility: '0'
  })

  useEffect(() => {
    var elems = document.querySelectorAll('select')
    var instances = M.FormSelect.init(elems, {})
    // fetchActivity()
  }, [])

  const fetchActivity = async () => {
    const res = await axios.get(
      `https://www.boredapi.com/api/activity?participants=${params.participants}&type=${params.type}&minprice=${params.minPrice}&minaccessibility=${params.minaccessibility}`
    )
    if (activities.some(item => item.key === res.data.key)) {
      M.toast({ html: 'Nothing new to show' })
    } else if (res.data.error === undefined) {
      M.toast({ html: 'Activity fetched!' })
      setActivities([...activities, res.data])
    } else if (res.data.error) {
      M.toast({ html: res.data.error })
    }
  }

  const onClick = e => {
    fetchActivity()
  }

  const onSubmit = e => {
    e.preventDefault()
    fetchActivity()
  }

  const onChange = e => {
    if (e.target.name === 'participants' && e.target.value === '0') {
      setParams({
        ...params,
        [e.target.name]: ''
      })
    } else {
      setParams({
        ...params,
        [e.target.name]: e.target.value
      })
    }
  }

  const clearParams = e => {
    e.preventDefault()
    setParams({
      type: '',
      participants: '',
      minPrice: '0',
      minaccessibility: '0'
    })

    const form = document.querySelector('#activity-form')
    form.reset()
    setActivities([])
  }

  const removeCard = key => {
    // e.preventDefault()
    const temp = [...activities]
    const index = temp.findIndex(activity => activity.key === key)
    temp.splice(index, 1)
    setActivities(temp)
  }

  return (
    <>
      <div className="row">
        <div className="col s12 m6 l4">
          <form onSubmit={onSubmit} id="activity-form">
            <div className="input-field">
              <select value={params.type} onChange={onChange} name="type">
                <option value="" selected>
                  Random
                </option>
                <option value="education">Education</option>
                <option value="recreational">Recreational</option>
                <option value="social">Social</option>
                <option value="diy"> Diy </option>
                <option value="charity"> Charity </option>
                <option value="cooking"> Cooking </option>
                <option value="relaxation"> Relaxation </option>
                <option value="music"> Music </option>
                <option value="busywork"> Busywork </option>
              </select>
              <label>Type</label>
            </div>
            <p className="range-field">
              <label htmlFor="participant">Paritcipant </label>
              <span className="grey-text text-lighten-1">
                {params.participants === '' ? 'Any' : params.participants}
              </span>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                name="participants"
                value={params.participants}
                onChange={onChange}
              />
            </p>
            <p className="range-field">
              <label htmlFor="participant">Min Accessibility </label>
              <span className="grey-text text-lighten-1">
                {params.minaccessibility}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                name="minaccessibility"
                value={params.minaccessibility}
                onChange={onChange}
              />
            </p>
            <p className="range-field">
              <label htmlFor="participant">Min price </label>
              <span className="grey-text text-lighten-1">
                {params.minPrice}
              </span>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.1"
                name="minPrice"
                value={params.minPrice}
                onChange={onChange}
              />
            </p>
            <button type="submit" className="btn waves-effect waves-light">
              Get an activity
            </button>
            <button
              className="btn red waves-effect waves-light"
              style={{ marginLeft: '10px' }}
              onClick={clearParams}
            >
              Clear
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        {/* <h3>Bored</h3> */}
        <div className="grid-wrapper">
          {activities.map(activity => (
            <BoredItem
              key={activity.key}
              activity={activity}
              removeCard={removeCard}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Bored
