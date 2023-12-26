function register() {
    const btn = document.getElementById('btn')
    const err = document.getElementById('err')
    const form = document.getElementById('registerForm')

    const url = "http://localhost:8080/api/v1/user"

    btn.addEventListener('click', (event) => {
        event.preventDefault()
        
        let acc = document.getElementById('acc').value
        let fname = document.getElementById('fname').value
        let lname = document.getElementById('lname').value
        let dob = document.getElementById('dob').value
        let email = document.getElementById('email').value
        let pass = document.getElementById('pass').value

        const bdd = {
            accountNumber: acc,
            firstName: fname,
            lastName: lname,
            dob: dob,
            email: email,
            password: pass
        }

        if (formValidation(bdd)) {
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

function formValidation(body) {
    const cpass = document.getElementById('cpass').value;

    const fnameErr = document.getElementById('error-message-fname');
    const lnameErr = document.getElementById('error-message-lname');
    const dobErr = document.getElementById('error-message-dob');
    const emailErr = document.getElementById('error-message-email');
    const accErr = document.getElementById('error-message-acc');
    const passErr = document.getElementById('error-message-pass');
    const cpassErr = document.getElementById('error-message-cpass');

    if (body.firstName == "") {
        fnameErr.innerHTML = "Fill in your first name!";
        return false;
    }
    else {
        fnameErr.innerHTML = ""
    }
    if (body.lastName == "") {
        lnameErr.innerHTML = "Fill in your last name!";
        return false;
    }
    else {
        lnameErr.innerHTML = ""
    }
    if (body.dob == "") {
        dobErr.innerHTML = "Fill in your date of birth!";
        return false;
    }
    else {
        dobErr.innerHTML = ""
    }
    if (body.email == "") {
        emailErr.innerHTML = "Enter an email address!";
        return false;
    }
    else if (!isValidEmail(body.email)) {
        emailErr.innerHTML = "Enter a valid email address!";
        return false;
    }
    else {
        emailErr.innerHTML = ""
    }

    if (body.accountNumber == "") {
        accErr.innerHTML = "Fill in your account number!";
        return false;
    }
    else if (body.accountNumber.length < 9 || body.accountNumber.length > 10) {
        accErr.innerHTML = "Account number should be either nine or ten digits long!";
        return false;
    }
    else {
        accErr.innerHTML = ""
    }
    if (body.password == "") {
        passErr.innerHTML = "Enter a password!";
        return false;
    }
    else {
        passErr.innerHTML = ""
    }
    if (cpass != body.password) {
        cpassErr.innerHTML = "Should be the same as the password entered above!";
        return false;
    }
    else {
        cpassErr.innerHTML = ""
    }
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    return emailRegex.test(email);
  }

register()