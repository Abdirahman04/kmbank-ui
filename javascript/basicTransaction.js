function basicTransactionData() {
    const tab = document.getElementById('tab')

    const userId = JSON.parse(localStorage.getItem('kmbankUser')).id

    const url = `http://localhost:8080/api/v1/basicTransaction/${userId}`
    fetch(url).then(res => res.json()).then(data => {
        data.forEach(element => {
            console.log(element)
        });
    })
}

basicTransactionData()