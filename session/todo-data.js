export let todoList = []

export function saveTodoList() {
  sessionStorage.setItem('todoList', JSON.stringify(todoList))
}

export function loadTodoList() {
  const stored = sessionStorage.getItem('todoList')
  if (stored) {
    todoList = JSON.parse(stored).map((item) => ({
      ...item,
      date: new Date(item.date),
    }))
  }
}
