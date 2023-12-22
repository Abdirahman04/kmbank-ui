function homeData() {
    const stringUser = localStorage.getItem('kmbankUser')
    const user = JSON.parse(stringUser)

    let userName = `${user.firstName} ${user.lastName}`

    document.getElementById('user-name').innerHTML = userName
    document.getElementById('balance').innerHTML = user.balance
}

homeData()