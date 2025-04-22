export let todoList = []

export function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList))
}

export function loadTodoList() {
  const stored = localStorage.getItem('todoList')
  if (stored) {
    todoList = JSON.parse(stored).map((item) => ({
      ...item,
      date: new Date(item.date),
    }))
  }
}
