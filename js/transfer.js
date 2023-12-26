function depositData() {
    const user = JSON.parse(localStorage.getItem('kmbankUser'))

    const btn = document.getElementById('btn')
    const err = document.getElementById('err')

    btn.addEventListener('click', (event) => {
        event.preventDefault()

        const amount = document.getElementById('amount').value
        const pass = document.getElementById('pass').value
        const recipient = document.getElementById('recipient').value

        verifyPassword(user.accountNumber, pass).then(data => {
            if (!data) err.innerHTML = "incorrect password!"
            else transferHandler(user.id, user.accountNumber, amount, recipient)
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

function transferHandler(id, accNumber, balance, recipient) {
    getUser(recipient).then(data => {
        transfer(id, accNumber, balance, data.id)
    })
}

function transfer(id, accNumber, balance, recipient) {
    const bdd = {
        senderId: id,
        recipientId: recipient,
        balance: balance
    }

    const url = "http://localhost:8080/api/v1/send"
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
            getUser(accNumber).then(data => {
                localStorage.setItem('kmbankUser', JSON.stringify(data))
                window.location.href = "home.html"
            })
        }
    })
}

function getUser(accNumber) {
    return fetch(`http://localhost:8080/api/v1/user/account/${accNumber}`)
    .then(res => res.json())
}

depositData()