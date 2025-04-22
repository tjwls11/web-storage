import { loadTodoList } from './todo-data.js'
import { renderTodoList, addTodoItem, handleListClick } from './todo-ui.js'

document.addEventListener('DOMContentLoaded', () => {
  loadTodoList()
  renderTodoList()

  document.getElementById('add-button').addEventListener('click', addTodoItem)
  document
    .getElementById('todo-board')
    .addEventListener('click', handleListClick)
})
