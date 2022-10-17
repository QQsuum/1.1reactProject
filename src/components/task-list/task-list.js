import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'

class TaskList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        created: PropTypes.object,
        status: PropTypes.string,
        id: PropTypes.number,
      })
    ),
  }

  onEnterDown = (e, id) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.props.onItemEdited(e.target.value, id)

      this.props.onEditedDone(id)
    }
  }

  state = { label: '' }

  render() {
    const { todos, onDeleted, onCompleted, onEdited } = this.props

    const tasks = todos.map((task) => {
      const { id, ...taskProps } = task
      return (
        <li key={id} className={task.status}>
          <Task
            {...taskProps}
            onDeleted={() => onDeleted(id)}
            onCompleted={() => onCompleted(id)}
            taskId={id}
            onEdited={() => onEdited(id)}
          />
          <input type="text" className="edit" defaultValue={task.label} onKeyDown={(e) => this.onEnterDown(e, id)} />
        </li>
      )
    })

    return <ul className="todo-list">{tasks}</ul>
  }
}

export default TaskList
