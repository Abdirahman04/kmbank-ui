function profileData() {
    const stringUser = localStorage.getItem('kmbankUser')
    const user = JSON.parse(stringUser)

    inner('accNumber', user.accountNumber)
    inner('fname', user.firstName)
    inner('lname', user.lastName)
    inner('age', user.age)
    inner('email', user.email)
    inner('balance', user.balance)    
}

function inner(id, data) {
    document.getElementById(id).innerHTML = data
}

profileData()