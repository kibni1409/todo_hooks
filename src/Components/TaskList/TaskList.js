import React, { useContext } from 'react'
import './TaskList.css'
import { PropTypes } from 'prop-types'

import Task from '../Task/Task'
import { Context } from '../../App'

const TaskList = (props) => {
  let valueContext = useContext(Context)
  let typeSort = props.Sort.find((el) => el.active === true)
  let ElementsTasks
  switch (typeSort.name) {
    case 'All':
      ElementsTasks = valueContext.map((el) => el)
      break
    case 'Active':
      ElementsTasks = valueContext.filter((el) => el.type === 'view')
      break
    case 'Completed':
      ElementsTasks = valueContext.filter((el) => el.type === 'completed')
      break
  }
  let NewElementsTasks = ElementsTasks.map((el) => (
    <Task
      task={el}
      key={el.id}
      onTypeChange={props.onTypeChange}
      onDeleted={props.onDeleted}
      onEdited={props.onEdited}
      onEditTime={props.onEditTime}
      onStart={props.onStart}
    />
  ))
  return (
    <div>
      <ul className="todoList">{NewElementsTasks}</ul>
    </div>
  )
}

TaskList.propTypes = {
  Tasks: PropTypes.arrayOf(PropTypes.object),
  onTypeChange: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
  Sort: PropTypes.arrayOf(PropTypes.object),
}

TaskList.defaultProps = {
  Tasks: [
    {
      id: 0,
      type: 'view',
      description: 'Loading',
      time: {
        year: 2023,
        month: 1,
        date: 10,
        hours: 13,
        minutes: 49,
        seconds: 15,
      },
    },
  ],
  onTypeChange: () => {},
  onDeleted: () => {},
  onEdited: () => {},
  Sort: [{ name: 'All', active: true }],
}

export default TaskList
