import React, { useEffect, useState } from 'react'

import TaskList from '../task-list/task-list'
import AppHeader from '../header/header'
import AppFooter from '../footer/footer'
import NewTaskForm from '../new-task-form/new-task-form'

import './app.css'

const App = () => {
  const createTodoItem = (label, min = 15, sec = 0) => {
    return {
      label,
      created: new Date(),
      status: 'active',
      id: Math.random() + Math.random(),
      taskTimer: { min: parseInt(min), sec: parseInt(sec) },
    }
  }

  const [todoData, setTodoData] = useState([
    createTodoItem('Compl'),
    createTodoItem('Editing'),
    createTodoItem('Active'),
  ])
  const [currentList, setCurrentList] = useState([])

  const makeFilteredArr = (arr, filter) =>
    arr.filter((el) => el.status === filter)

  const deleteItem = (id) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const newArr = [...todoData.slice(0, ind), ...todoData.slice(ind + 1)]
    setTodoData(newArr)
    setCurrentList(newArr)
  }

  const comleteItem = (id) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const newItem = todoData[ind]
    if (newItem.status === 'active') {
      newItem.status = 'completed'
    } else {
      newItem.status = 'active'
    }
    const newArr = [
      ...todoData.slice(0, ind),
      newItem,
      ...todoData.slice(ind + 1),
    ]
    setTodoData(newArr)
    setCurrentList(newArr)
  }

  const addItem = (label, min, sec) => {
    const newItem = createTodoItem(label, min, sec)
    const newArr = [newItem, ...todoData]
    setTodoData(newArr)
    setCurrentList(newArr)
  }

  const showAll = () => {
    setCurrentList(todoData)
  }

  const showCompleted = () => {
    const newArr = makeFilteredArr(todoData, 'completed')
    setCurrentList(newArr)
  }

  const showActive = () => {
    const newArr = makeFilteredArr(todoData, 'active')
    setCurrentList(newArr)
  }

  const clearCompletedTasks = () => {
    const newArr = makeFilteredArr(todoData, 'active')
    setTodoData(newArr)
    setCurrentList(newArr)
  }

  const editStatus = (id, status) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const newItem = todoData[ind]
    newItem.status = status

    const newArr = [
      ...todoData.slice(0, ind),
      newItem,
      ...todoData.slice(ind + 1),
    ]
    setTodoData(newArr)
    setCurrentList(newArr)
  }

  const onEdited = (id) => editStatus(id, 'editing')

  const editingItem = (label, id) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const newItem = todoData[ind]
    newItem.label = label
    const newArr = [
      ...todoData.slice(0, ind),
      newItem,
      ...todoData.slice(ind + 1),
    ]
    setTodoData(newArr)
    setCurrentList(newArr)
  }

  const onEditedDone = (id) => editStatus(id, 'active')

  useEffect(() => setCurrentList(todoData), [])

  const activeItems = todoData.filter((el) => el.status === 'active').length

  return (
    <section className="todoapp">
      <AppHeader />

      <NewTaskForm onItemAdded={addItem} />

      <section className="main">
        <TaskList
          todos={currentList}
          onDeleted={deleteItem}
          onCompleted={comleteItem}
          onEdited={onEdited}
          onItemEdited={editingItem}
          onEditedDone={onEditedDone}
        />
        <AppFooter
          leftItems={activeItems}
          showAllTasks={showAll}
          showActiveTasks={showActive}
          showCompletedTasks={showCompleted}
          clearCompletedTasks={clearCompletedTasks}
        />
      </section>
    </section>
  )
}
export default App
