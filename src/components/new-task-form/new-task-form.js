import React, {  useState } from 'react'
import './new-task-form.css'

const NewTaskForm = (props) => {
  const [label, setLabel] = useState('New Task')
  const [min, setMin] = useState(15)
  const [sec, setSec] = useState(0)

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }
  const onMinChange = (e) => {
    if (isNaN(parseInt(e.target.value)) && e.target.value !== '') return
    setMin(e.target.value)
  }
  const onSecChange = (e) => {
    if (isNaN(parseInt(e.target.value)) && e.target.value !== '') return
    setSec(e.target.value)
  }

  const onEnterDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      props.onItemAdded(label, min, sec)

      setLabel('New Task')
      setMin(15)
      setSec(0)
    }
  }

  return (
    <div className="new-todo-form">
      <input
        value={label}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={onEnterDown}
        onChange={onLabelChange}
      />
      <input
        value={min}
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        onKeyDown={onEnterDown}
        onChange={onMinChange}
      />
      <input
        value={sec}
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        onKeyDown={onEnterDown}
        onChange={onSecChange}
      />
    </div>
  )
}

export default NewTaskForm
