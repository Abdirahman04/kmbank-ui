function basicTransactionData() {
    const tab = document.getElementById('tab')

    const userId = JSON.parse(localStorage.getItem('kmbankUser')).id

    const url = `http://localhost:8080/api/v1/basicTransaction/${userId}`
    fetch(url).then(res => res.json()).then(data => {
        data.forEach(element => {
            const tr = document.createElement('tr')
            tr.classList.add('table-secondary')

            const tdId = document.createElement('td')
            tdId.innerHTML = element.id
            tr.appendChild(tdId)

            const tdTransactionType = document.createElement('td')
            tdTransactionType.innerHTML = element.transactionType
            tr.appendChild(tdTransactionType)

            const tdBalance = document.createElement('td')
            tdBalance.innerHTML = element.balance
            tr.appendChild(tdBalance)

            tab.appendChild(tr)
        });
    })
}

basicTransactionData()