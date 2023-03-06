import React, { useState } from 'react'
import { PropTypes } from 'prop-types'

import Style from './NewTaskForm.module.css'

const NewTaskForm = (props) => {
  const [taskData, setTaskData] = useState({
    name: '',
    min: 0,
    max: 0,
  })

  function handleSubmit(e) {
    e.preventDefault()
    if (taskData.min && taskData.sec && taskData.name) {
      props.addTask(taskData)
      e.preventDefault()
      e.target.reset()
      setTaskData({})
    } else {
      let noAdd = document.createElement('p')
      noAdd.classList.add('noAdd')
      noAdd.innerText = 'Not all fields are filled in'
      e.target.prepend(noAdd)
    }
  }

  function handleInputChange(e) {
    let noAdd = document.querySelector('.noAdd')
    noAdd ? noAdd.remove() : null
    const value = e.target.value
    const name = e.target.name
    parseInt(value)
      ? setTaskData((t) => {
          return {
            ...t,
            [name]: value / 1,
          }
        })
      : null
    name === 'name'
      ? setTaskData((t) => {
          return {
            ...t,
            [name]: value,
          }
        })
      : null
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className={Style.new_todo}
          placeholder="What needs to be done?"
          onChange={handleInputChange}
        ></input>
        <input
          name="min"
          className={Style.inputTime}
          min={1}
          max={60}
          type="number"
          placeholder="min"
          onChange={handleInputChange}
        ></input>
        <input
          name="sec"
          className={Style.inputTime}
          min={1}
          max={60}
          type="number"
          placeholder="sec"
          onChange={handleInputChange}
        ></input>
        <button className={Style.hidden} type="submit"></button>
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}

export default NewTaskForm
