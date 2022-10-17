import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends Component {
  static defaultProps = {
    label: 'New Task',
  }

  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
    onEdited: PropTypes.func,
  }

  render() {
    const { label, created, onDeleted, onCompleted, onEdited } = this.props

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCompleted} />
        <label>
          <span className="description">{label}</span>
          <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEdited} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
    )
  }
}
