function profileData() {
    const stringUser = localStorage.getItem('kmbankUser')
    const user = JSON.parse(stringUser)

    inner('accNumber', user.accountNumber)
    inner('fname', user.firstName)
    inner('lname', user.lastName)
    inner('age', user.age)
    inner('email', user.email)
    inner('balance', user.balance)
    
    const updateBtn = document.getElementById('update')
    const deleteBtn = document.getElementById('delete')
    const form = document.getElementById('updateForm')
    const closeFormBtn = document.getElementById('closeForm')
    const btn = document.getElementById('btn')

    getUserData(user.accountNumber).then(data => {
        innerValue('fname-form', data.firstName)
        innerValue('lname-form', data.lastName)
        innerValue('dob-form', data.dob)
        innerValue('email-form', data.email)
        innerValue('pass-form', data.password)
        innerValue('acc-form', data.accountNumber)

        updateBtn.addEventListener('click', (event) => {
            event.preventDefault()

            form.style.display = "block"
        })

        closeFormBtn.addEventListener('click', (event) => {
            event.preventDefault()

            form.style.display = "none"
        })

        btn.addEventListener('click', (event) => {
            event.preventDefault()
    
            const bdd = {
                accountNumber: document.getElementById('acc-form').value,
                firstName: document.getElementById('fname-form').value,
                lastName: document.getElementById('lname-form').value,
                dob: document.getElementById('dob-form').value,
                email: document.getElementById('email-form').value,
                password: document.getElementById('pass-form').value
            }
    
            const options = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bdd)
            }
        
            const url = `http://127.0.0.1:8080/api/v1/user/${user.id}`

            const accNumber = document.getElementById('acc-form').value
            fetch(url, options).then(res => {
                if (!res.ok) throw new Error("Error updating account!")
                else {
                    updateLocalStorage(accNumber).then(data => {
                        localStorage.setItem('kmbankUser', JSON.stringify(data))
                        window.location.href = "profile.html"
                    })
                }
            })
        })

        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault()

            let confirmation = confirm("Are you sure you want to delete this account?")
            if (confirmation) {
                const url = `http://127.0.0.1:8080/api/v1/user/${user.id}`

                const options = {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                }

                fetch(url, options).then(res => {
                    if (!res.ok) throw new console.error("Error deleting account!");
                    else {
                        localStorage.clear()
                        window.location.href = "index.html"
                    }
                })
            }
        })
    })
}

function inner(id, data) {
    document.getElementById(id).innerHTML = data
}

function innerValue(id, data) {
    document.getElementById(id).value = data
}

function updateLocalStorage(accNumber) {
    return fetch(`http://localhost:8080/api/v1/user/account/${accNumber}`)
    .then(res => res.json())
}

function getUserData(accNumber) {
    url = `http://localhost:8080/api/v1/user/raw/${accNumber}`
    return fetch(url).then(res => res.json())
}

profileData()