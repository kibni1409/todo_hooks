import React, { useState } from 'react'

import NewTaskForm from './Components/NewTaskForm/NewTaskForm'
import TaskList from './Components/TaskList/TaskList'
import Footer from './Components/Footer/Footer'

import './App.css'

export const Context = React.createContext()
const App = () => {
  const [tasks, setTask] = useState([
    {
      id: 0,
      type: 'completed',
      description: 'Completed task',
      time: {
        year: 2023,
        month: 1,
        date: 10,
        hours: 13,
        minutes: 49,
        seconds: 15,
      },
      timer: 42000,
      start: false,
    },
    {
      id: 1,
      type: 'view',
      description: 'Editing task',
      time: {
        year: 2023,
        month: 1,
        date: 5,
        hours: 13,
        minutes: 49,
        seconds: 15,
      },
      timer: 12000,
      start: false,
    },
    {
      id: 2,
      type: 'view',
      description: 'Completed task',
      time: {
        year: 2023,
        month: 1,
        date: 9,
        hours: 13,
        minutes: 49,
        seconds: 15,
      },
      timer: 12000,
      start: false,
    },
  ])
  const [idTasks, setIdTask] = useState(3)
  const [sort, setSort] = useState([
    { name: 'All', active: true },
    { name: 'Active', active: false },
    { name: 'Completed', active: false },
  ])

  function onTypeChange(id, type) {
    const res = tasks.map((el) =>
      el.id === id
        ? {
            ...el,
            type: type,
          }
        : { ...el }
    )
    setTask(res)
  }

  function onEdited(id, message, type) {
    const res = tasks.map((el) =>
      el.id === id
        ? {
            ...el,
            description: message,
            type: type,
          }
        : {
            ...el,
          }
    )
    setTask(res)
  }

  function onDeleted(id) {
    const idx = tasks.findIndex((el) => el.id === id)
    const res = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)]
    setTask(res)
  }

  function addTask(task) {
    let data = new Date()
    let newTime = {
      year: data.getFullYear(),
      month: data.getMonth(),
      date: data.getDate(),
      hours: data.getHours(),
      minutes: data.getMinutes(),
      seconds: data.getSeconds(),
    }

    const newTask = {
      id: idTasks,
      type: 'view',
      description: task.name,
      time: newTime,
      timer: task.min * 60000 + task.sec * 1000,
    }

    const res = [...tasks]

    res.push(newTask)
    setIdTask((id) => id + 1)
    setTask(res)
  }

  function sortChange(name) {
    const res = sort.map((el) => {
      if (el.name === name) {
        return {
          active: true,
          name: el.name,
        }
      } else {
        return {
          active: false,
          name: el.name,
        }
      }
    })
    setSort(res)
  }

  function clearCompleted() {
    let res = []
    tasks.map((el) => (el.type !== 'completed' ? res.push(el) : null))
    setTask(res)
  }

  function onEditTime(id, time) {
    const res = tasks.map((el) =>
      el.id === id
        ? {
            ...el,
            timer: time,
          }
        : {
            ...el,
          }
    )
    setTask(res)
    setTask(res)
  }

  function onStart(id, bool) {
    const res = tasks.map((el) =>
      el.id === id
        ? {
            ...el,
            start: bool,
          }
        : {
            ...el,
          }
    )
    setTask(res)
  }

  return (
    <Context.Provider value={tasks}>
      <div className="todoapp">
        <NewTaskForm addTask={addTask} />
        <TaskList
          onTypeChange={onTypeChange}
          onDeleted={onDeleted}
          onEdited={onEdited}
          Sort={sort}
          onEditTime={onEditTime}
          onStart={onStart}
        />
        <Footer Sort={sort} sortChange={sortChange} clearCompleted={clearCompleted} />
      </div>
    </Context.Provider>
  )
}

export default App
