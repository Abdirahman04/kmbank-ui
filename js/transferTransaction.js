function transferTransactionData() {
    const tab = document.getElementById('tab')

    const userId = JSON.parse(localStorage.getItem('kmbankUser')).id

    const url = `http://localhost:8080/api/v1/transferTransaction/${userId}`
    fetch(url).then(res => res.json()).then(data => {
        data.forEach(element => {
            const tr = document.createElement('tr')
            tr.classList.add('table-secondary')

            const tdId = document.createElement('td')
            tdId.innerHTML = element.id
            tr.appendChild(tdId)

            let transferType, target

            if (element.senderId == userId) {
                transferType ='sent'
                target = element.recipientId
            }
            else {
                transferType = 'received'
                target = element.senderId
            }

            const tdType = document.createElement('td')
            tdType.innerHTML = transferType
            tr.appendChild(tdType)

            const tdTarget = document.createElement('td')
            tdTarget.innerHTML = target
            tr.appendChild(tdTarget)

            const tdBalance = document.createElement('td')
            tdBalance.innerHTML = element.balance
            tr.appendChild(tdBalance)

            tab.appendChild(tr)
        });
    })
}

transferTransactionData()