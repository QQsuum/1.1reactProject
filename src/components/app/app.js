import React, { Component } from 'react'

import TaskList from '../task-list/task-list'
import AppHeader from '../header/header'
import AppFooter from '../footer/footer'
import NewTaskForm from '../new-task-form/new-task-form'

import './app.css'

export default class App extends Component {
  maxId = 100

  makeFilteredArr = (arr, filter) => arr.filter((el) => el.status === filter)

  createTodoItem = (label) => ({
    label,
    created: new Date(),
    status: 'active',
    id: this.maxId++,
  })

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id)

      const newData = [...todoData.slice(0, ind), ...todoData.slice(ind + 1)]

      return { todoData: newData, currentList: newData }
    })
  }

  comleteItem = (id) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id)
      const newItem = todoData[ind]
      if (newItem.status === 'active') {
        newItem.status = 'completed'
      } else {
        newItem.status = 'active'
      }
      const newArr = [...todoData.slice(0, ind), newItem, ...todoData.slice(ind + 1)]
      return { todoData: newArr, currentList: newArr }
    })
  }

  addItem = (label) => {
    const newItem = this.createTodoItem(label)
    this.setState(({ todoData }) => {
      const newArr = [newItem, ...todoData]
      return { currentList: newArr, todoData: newArr }
    })
  }

  showAll = () => {
    this.setState(({ todoData }) => ({ currentList: todoData }))
  }

  showCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = this.makeFilteredArr(todoData, 'completed')
      return { currentList: newArr }
    })
  }

  showActive = () => {
    this.setState(({ todoData }) => {
      const newArr = this.makeFilteredArr(todoData, 'active')
      return { currentList: newArr }
    })
  }

  clearCompletedTasks = () => {
    this.setState(({ todoData }) => {
      const newArr = this.makeFilteredArr(todoData, 'active')
      return { todoData: newArr, currentList: newArr }
    })
  }

  editStatus = (id, status) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id)
      const newItem = todoData[ind]
      newItem.status = status

      const newArr = [...todoData.slice(0, ind), newItem, ...todoData.slice(ind + 1)]
      return { currentList: newArr, todoData: newArr }
    })
  }

  onEdited = (id) => this.editStatus(id, 'editing')

  editingItem = (label, id) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id)
      const newItem = todoData[ind]
      newItem.label = label
      const newArr = [...todoData.slice(0, ind), newItem, ...todoData.slice(ind + 1)]
      return { currentList: newArr, todoData: newArr }
    })
  }

  onEditedDone = (id) => this.editStatus(id, 'active')

  state = {
    createdDate: new Date(),
    todoData: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    currentList: [],
  }

  constructor(props) {
    super(props)
    this.state.currentList = this.state.todoData
  }

  render() {
    const activeItems = this.state.todoData.filter((el) => el.status === 'active').length

    return (
      <section className="todoapp">
        <AppHeader />

        <NewTaskForm onItemAdded={this.addItem} />

        <section className="main">
          <TaskList
            todos={this.state.currentList}
            onDeleted={this.deleteItem}
            onCompleted={this.comleteItem}
            onEdited={this.onEdited}
            onItemEdited={this.editingItem}
            onEditedDone={this.onEditedDone}
          />
          <AppFooter
            leftItems={activeItems}
            showAllTasks={this.showAll}
            showActiveTasks={this.showActive}
            showCompletedTasks={this.showCompleted}
            clearCompletedTasks={this.clearCompletedTasks}
          />
        </section>
      </section>
    )
  }
}
