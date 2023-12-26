function homeData() {
    const stringUser = localStorage.getItem('kmbankUser')
    const user = JSON.parse(stringUser)

    let userName = `${user.firstName} ${user.lastName}`

    document.getElementById('user-name').innerHTML = userName
    document.getElementById('balance').innerHTML = user.balance

    const logoutBtn = document.getElementById('logout')
    logoutBtn.addEventListener('click', () => logout())
}

homeData()

function logout() {
    localStorage.clear()
    window.location.href = "index.html"
}