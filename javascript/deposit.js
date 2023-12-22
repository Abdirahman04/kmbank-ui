function depositData() {
    const user = JSON.parse(localStorage.getItem('kmbankUser'))

    const btn = document.getElementById('btn')
    const amount = document.getElementById('amount')
    const pass = document.getElementById('pass')
    const err = document.getElementById('err')

    btn.addEventListener('click', (event) => {
        event.preventDefault()

        if (!verifyPassword(user.accountNumber, pass)) err.innerHTML = "incorrect password!"
        else depositHandler(user.id, user.accountNumber, amount)
    })
}

function verifyPassword(accNumber, pass) {
    const bdd = {
        accountNumber: accNumber,
        password: pass
    }

    const url = "http://localhost:8080/api/v1/user/login";
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bdd)
    }

    fetch(url, fetchOptions)
    .then(res => res.json())
}

function depositHandler(id, balance, accNumber) {
    const bdd = {
        id: id,
        balance: balance
    }

    const url = "http://localhost:8080/api/v1/deposit"
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bdd)
    }

    fetch(url, fetchOptions)
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error: status ${res.status}`)
        else {
            updateLocalStorage(accNumber)
            window.location.href = "home.html"
        }
    })
}

function updateLocalStorage(accNumber) {
    fetch(`http://localhost:8080/api/v1/account/${accNumber}`)
    .then(res => res.json())
    .then(data => localStorage.setItem('kmbankUser', JSON.stringify(data)))
}

depositData()