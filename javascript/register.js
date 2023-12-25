function register() {
    const btn = document.getElementById('btn')
    const err = document.getElementById('err')
    const form = document.getElementById('registerForm')

    const url = "http://localhost:8080/api/v1/user"

    btn.addEventListener('click', (event) => {
        let acc = document.getElementById('acc').value
        let fname = document.getElementById('fname').value
        let lname = document.getElementById('lname').value
        let dob = document.getElementById('dob').value
        let email = document.getElementById('email').value
        let pass = document.getElementById('pass').value

        if (form.checkValidity()) {
            event.preventDefault()
            const bdd = {
                accountNumber: acc,
                firstName: fname,
                lastName: lname,
                dob: dob,
                email: email,
                password: pass
            }
    
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bdd)
            }
    
            console.log(bdd);
    
            const accNumber = document.getElementById('acc').value
            fetch(url, options).then(res => {
                if (!res.ok) err.innerHTML = "Error creating account!"
                else {
                    updateLocalStorage(accNumber).then(data => {
                        localStorage.setItem('kmbankUser', JSON.stringify(data))
                        window.location.href = "home.html"
                    })
                }
            })
        }
        else console.log("error");
    })
}

function updateLocalStorage(accNumber) {
    return fetch(`http://localhost:8080/api/v1/user/account/${accNumber}`)
    .then(res => res.json())
}

register()