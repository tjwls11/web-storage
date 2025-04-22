document.getElementById('signup-btn').addEventListener('click', () => {
  const id = document.getElementById('signup-id').value.trim()
  const pw = document.getElementById('signup-pw').value.trim()

  if (!id || !pw) {
    alert('아이디와 비밀번호를 입력해주세요.')
    return
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]')

  if (users.some((user) => user.id === id)) {
    alert('이미 존재하는 아이디입니다.')
    return
  }

  users.push({ id, password: pw })
  localStorage.setItem('users', JSON.stringify(users))
  alert('회원가입 완료! 로그인 페이지로 이동합니다.')
  location.href = 'login.html'
})
