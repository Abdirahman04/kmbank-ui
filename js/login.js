function verifyUser() {
    const btn = document.getElementById("btn");

    btn.addEventListener("click", (event) => {
        event.preventDefault()
        const accNumber = document.getElementById("accNumber").value;
        const pass = document.getElementById("password").value;

        const body = {
            accountNumber: accNumber,
            password: pass
        }

        const url = "http://localhost:8080/api/v1/user/login";
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        const err = document.getElementById("err")

        fetch(url,fetchOptions)
            .then(res => res.json())
            .then(data => {
                if (!data) err.innerHTML = "Incorrect credentials";
                else getUserData(accNumber, body)
            })
    })
}

function getUserData(accNumber, body) {
    const url = `http://localhost:8080/api/v1/user/account/${accNumber}`

    fetch(url, body)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('kmbankUser', JSON.stringify(data))
            window.location.href = "home.html"
        })
}

verifyUser();