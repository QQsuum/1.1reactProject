import React, { Component } from 'react'
import './footer.css'
import PropTypes from 'prop-types'

class TasksFilter extends Component {
  static propTypes = {
    showActiveTasks: PropTypes.func,
    showAllTasks: PropTypes.func,
    showCompletedTasks: PropTypes.func,
  }

  render() {
    const { showAllTasks, showCompletedTasks, showActiveTasks } = this.props

    return (
      <ul className="filters">
        <li>
          <button className="selected" onClick={showAllTasks}>
            All
          </button>
        </li>
        <li>
          <button onClick={showActiveTasks}>Active</button>
        </li>
        <li>
          <button onClick={showCompletedTasks}>Completed</button>
        </li>
      </ul>
    )
  }
}

class AppFooter extends Component {
  render() {
    const { leftItems, showAllTasks, showCompletedTasks, showActiveTasks, clearCompletedTasks } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{leftItems} items left</span>
        <TasksFilter
          showAllTasks={() => showAllTasks()}
          showActiveTasks={() => showActiveTasks()}
          showCompletedTasks={() => showCompletedTasks()}
        />
        <button className="clear-completed" onClick={clearCompletedTasks}>
          Clear completed
        </button>
      </footer>
    )
  }
}
export default AppFooter
