import { todoList, saveTodoList } from './todo-data.js'

export function renderTodoList() {
  const board = document.getElementById('todo-board')
  board.innerHTML = ''

  const template = document.getElementById('todo-item-template')

  todoList.forEach((item, index) => {
    const clone = template.content.cloneNode(true)

    // 기본 데이터 삽입
    clone.querySelector('.todo-text').textContent = item.todo
    clone.querySelector('.todo-date').textContent = `날짜: ${
      item.date.toISOString().split('T')[0]
    }`

    const checkbox = clone.querySelector('[data-action="toggle"]')
    checkbox.checked = item.completed
    checkbox.dataset.index = index
    checkbox.id = `todo-checkbox-${index}`
    checkbox.name = `todo-checkbox-${index}`

    clone.querySelector('.edit-btn').dataset.index = index
    clone.querySelector('[data-action="delete"]').dataset.index = index
    clone.querySelector('[data-action="edit"]').dataset.index = index
    clone.querySelector('[data-action="save"]').dataset.index = index
    clone.querySelector('[data-action="cancel"]').dataset.index = index

    const editText = clone.querySelector('.edit-text')
    const editDate = clone.querySelector('.edit-date')
    editText.value = item.todo
    editDate.value = item.date.toISOString().split('T')[0]
    editText.id = `edit-text-${index}`
    editDate.id = `edit-date-${index}`

    if (item.completed) {
      clone.querySelector('.todo-item').classList.add('opacity-50')
    } else {
      clone.querySelector('.todo-item').classList.remove('opacity-50')
    }

    board.appendChild(clone)
  })
}

export function addTodoItem() {
  const input = document.getElementById('todo-input')
  const dateInput = document.getElementById('date-input')
  const text = input.value.trim()
  const dateValue = dateInput.value

  if (!text || !dateValue) {
    alert('할 일과 날짜를 입력해주세요')
    return
  }

  const newItem = {
    todo: text,
    date: new Date(dateValue),
    completed: false,
  }

  todoList.push(newItem)
  todoList.sort((a, b) => a.date - b.date)
  saveTodoList()
  renderTodoList()

  input.value = ''
  dateInput.value = ''
}

export function handleListClick(e) {
  const action = e.target.dataset.action
  const index = Number(e.target.dataset.index)
  if (isNaN(index)) return

  const item = todoList[index]
  const parent = e.target.closest('.todo-item')

  if (!parent) return

  if (action === 'delete') {
    todoList.splice(index, 1)
    saveTodoList()
    renderTodoList()
  } else if (action === 'toggle') {
    item.completed = !item.completed
    saveTodoList()
    renderTodoList()
  } else if (action === 'edit') {
    const normal = parent.querySelector('.normal-view')
    const edit = parent.querySelector('.edit-view')
    if (normal && edit) {
      normal.classList.add('hidden')
      edit.classList.remove('hidden')
    }
  } else if (action === 'cancel') {
    renderTodoList()
  } else if (action === 'save') {
    const newText = parent.querySelector('.edit-text').value.trim()
    const newDate = parent.querySelector('.edit-date').value
    if (!newText || !newDate) {
      alert('내용과 날짜를 입력하세요.')
      return
    }

    item.todo = newText
    item.date = new Date(newDate)

    todoList.sort((a, b) => a.date - b.date)

    saveTodoList()
    renderTodoList()
  }
}
