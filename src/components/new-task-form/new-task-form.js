import React, { Component } from 'react'
import './new-task-form.css'

class NewTaskForm extends Component {
  onLabelChange = (e) => {
    this.setState({ label: e.target.value })
  }

  onEnterDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.props.onItemAdded(this.state.label)
      e.target.value = ''
      this.setState({ label: 'New Task' })
    }
  }

  state = {
    label: 'New Task',
  }

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={this.onEnterDown}
        onChange={this.onLabelChange}
      />
    )
  }
}
export default NewTaskForm
