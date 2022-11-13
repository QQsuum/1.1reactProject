
import React from 'react'

import Task from '../task/task'
import './task-list.css'

const TaskList = (props) => {
  const onEnterDown = (e, id) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      props.onItemEdited(e.target.value, id)

      props.onEditedDone(id)
    }
  }
  
  const { todos, onDeleted, onCompleted, onEdited } = props

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
        <input
          type="text"
          className="edit"
          defaultValue={task.label}
          onKeyDown={(e) => onEnterDown(e, id)}
        />
      </li>
    )
  })

  return <ul className="todo-list">{tasks}</ul>
}

export default TaskList
