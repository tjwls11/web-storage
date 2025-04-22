const loginBtn = document.getElementById('login-btn')
const logoutBtn = document.getElementById('logout-btn')
const authArea = document.getElementById('auth-area')
const loginForm = document.getElementById('login-form')
const userDisplay = document.getElementById('user-display')

const currentUser = sessionStorage.getItem('currentUser')
let currentUserPw = sessionStorage.getItem('currentUserPw')

if (currentUser && !currentUserPw) {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const userInfo = users.find((user) => user.id === currentUser)
  if (userInfo) {
    currentUserPw = userInfo.password
    sessionStorage.setItem('currentUserPw', currentUserPw)
  }
}

if (currentUser) {
  loginForm.classList.add('hidden')
  authArea.classList.remove('hidden')
  const pwDisplay = currentUserPw ? `, PW: ${currentUserPw}` : ''
  userDisplay.textContent = `ID: ${currentUser}${pwDisplay}`
}

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const id = document.getElementById('login-id').value.trim()
    const pw = document.getElementById('login-pw').value.trim()

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find((user) => user.id === id && user.password === pw)

    if (found) {
      sessionStorage.setItem('currentUser', id)
      sessionStorage.setItem('currentUserPw', pw)
      alert('로그인 성공')
      location.reload()
    } else {
      alert('아이디 또는 비밀번호가 틀렸습니다.')
    }
  })
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUserPw')
    alert('로그아웃되었습니다.')
    location.reload()
  })
}
