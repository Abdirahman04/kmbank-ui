function verifyUser() {
    const btn = document.getElementById("btn");

    btn.addEventListener("click", () => {
        const accNumber = document.getElementById("accNumber").value;
        const pass = document.getElementById("password").value;

        const body = {
            accountNumber: accNumber,
            password: pass
        }


    })
}