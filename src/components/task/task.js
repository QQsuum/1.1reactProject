import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = (props) => {
  const [taskTimer, setTaskTimer] = useState({
    min: props.taskTimer.min,
    sec: props.taskTimer.sec,
  })
  const { min, sec } = taskTimer

  let timer
  const onTimeStop = () => {
    if (!timer) return
    clearInterval(timer)
    timer = undefined
  }
  const onTimeStart = () => {
    if (timer || timer !== undefined) return
    timer = setInterval(() => timePlus(taskTimer), 1000)
  }
  const timePlus = (prevState) => {
    if (taskTimer.sec === 0 && taskTimer.min > 0) {
      setTaskTimer((prev) => {
        return { min: prev.min - 1, sec: 59 }
      })
    } else if (taskTimer.sec === 0 && taskTimer.min === 0) {
      setTaskTimer((prev) => {
        return { min: 0, sec: 0 }
      })
    } else {
      setTaskTimer((prev) => {
        return { min: prev.min, sec: prev.sec - 1 }
      })
    }
  }
  useEffect(() => {
    onTimeStart()
    return () => clearInterval(timer)
  }, [min, sec])

  useEffect(() => onTimeStop(), [])

  const { label, created, onDeleted, onCompleted, onEdited } = props

  const minutes = min < 10 ? `0${min}` : min
  const seconds = sec < 10 ? `0${sec}` : sec
  const whenCreated = () => {
    let date = formatDistanceToNow(created, { includeSeconds: true })
    if (date.includes('less than')) {
      date = date.replace('less than', '')
    }
    return date
  }
  return (
    <div className="view">
      <input className="toggle" type="checkbox" onClick={onCompleted} />
      <label>
        <span className="title">{label}</span>
        <span className="description">
          <button className="icon icon-play" onClick={onTimeStart}></button>
          <button className="icon icon-pause" onClick={onTimeStop}></button>
          <span className="timerTodo">
            {minutes}:{seconds}
          </span>
        </span>
        <span className="created">created {whenCreated()} ago</span>
      </label>
      <button className="icon icon-edit" onClick={onEdited} />
      <button className="icon icon-destroy" onClick={onDeleted} />
    </div>
  )
}

export default Task
