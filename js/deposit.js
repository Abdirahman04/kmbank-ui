function depositData() {
    const user = JSON.parse(localStorage.getItem('kmbankUser'))

    const btn = document.getElementById('btn')
    const err = document.getElementById('err')

    btn.addEventListener('click', (event) => {
        event.preventDefault()

        const amount = document.getElementById('amount').value
        const pass = document.getElementById('pass').value

        verifyPassword(user.accountNumber, pass).then(data => {
            if (!data) err.innerHTML = "incorrect password!"
            else depositHandler(user.id, user.accountNumber, amount)
        })
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

    return fetch(url, fetchOptions)
    .then(res => res.json())
}

function depositHandler(id, accNumber, balance) {
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
            updateLocalStorage(accNumber).then(data => {
                localStorage.setItem('kmbankUser', JSON.stringify(data))
                window.location.href = "home.html"
            })
        }
    })
}

function updateLocalStorage(accNumber) {
    return fetch(`http://localhost:8080/api/v1/user/account/${accNumber}`)
    .then(res => res.json())
}

depositData()