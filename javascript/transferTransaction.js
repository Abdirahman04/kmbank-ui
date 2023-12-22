function transferTransactionData() {
    const tab = document.getElementById('tab')

    const userId = JSON.parse(localStorage.getItem('kmbankUser')).id

    const url = `http://localhost:8080/api/v1/transferTransaction/${userId}`
    fetch(url).then(res => res.json()).then(data => {
        data.forEach(element => {
            const obj = document.createElement('div')
            obj.innerHTML = JSON.stringify(element)

            tab.appendChild(obj)
        });
    })
}

transferTransactionData()