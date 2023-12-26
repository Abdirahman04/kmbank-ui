function bankInfo() {
    const usersBtn = document.getElementById('usersBtn')
    const basicTransactionBtn = document.getElementById('basicTransaction')
    const transferTransactionBtn = document.getElementById('transferTransaction')
    const tableTransferTransactions = document.getElementById('tableTransferTransactions')
    const tableBasicTransactions = document.getElementById('tableBasicTransactions')
    const tableUsers = document.getElementById('tableUsers')

    urlTemplate = "http://localhost:8080/api/v1/"

    usersBtn.addEventListener('click', (event) => {
        event.preventDefault()
        
        tableTransferTransactions.style.display = 'none'
        tableBasicTransactions.style.display = 'none'
        tableUsers.style.display = (tableUsers.style.display === 'none') ? 'block' : 'none'
        basicBody = document.getElementById('users')
        basicBody.innerHTML = ""

        const url = `${urlTemplate}user`

        fetch(url).then(res => res.json()).then(data => displayData(data, basicBody))
    })

    basicTransactionBtn.addEventListener('click', (event) => {
        event.preventDefault()
        
        tableTransferTransactions.style.display = 'none'
        tableUsers.style.display = 'none'
        tableBasicTransactions.style.display = (tableBasicTransactions.style.display === 'none') ? 'block' : 'none'
        basicBody = document.getElementById('basicTransactions')
        basicBody.innerHTML = ""

        const url = `${urlTemplate}basicTransaction`

        fetch(url).then(res => res.json()).then(data => displayDataBasicTransactions(data, basicBody))
    })

    transferTransactionBtn.addEventListener('click', (event) => {
        event.preventDefault()

        tableBasicTransactions.style.display = 'none'
        tableUsers.style.display = 'none'
        tableTransferTransactions.style.display = (tableTransferTransactions.style.display === 'none') ? 'block' : 'none'
        transferBody = document.getElementById('transferTransactions')
        transferBody.innerHTML = ""

        const url = `${urlTemplate}transferTransaction`

        fetch(url).then(res => res.json()).then(data => displayDataTransferTransactions(data, transferBody))
    })
}

function displayData(data, tab) {
    data.forEach(element => {
        const tr = document.createElement('tr')
        tr.classList.add('table-secondary')

        const tdId = document.createElement('td')
        tdId.innerHTML = element.id
        tr.appendChild(tdId)

        const tdFname = document.createElement('td')
        tdFname.innerHTML = element.firstName
        tr.appendChild(tdFname)

        const tdLname = document.createElement('td')
        tdLname.innerHTML = element.lastName
        tr.appendChild(tdLname)

        const tdAge = document.createElement('td')
        tdAge.innerHTML = element.age
        tr.appendChild(tdAge)

        const tdEmail = document.createElement('td')
        tdEmail.innerHTML = element.email
        tr.appendChild(tdEmail)

        const tdAcc = document.createElement('td')
        tdAcc.innerHTML = element.accountNumber
        tr.appendChild(tdAcc)

        const tdBalance = document.createElement('td')
        tdBalance.innerHTML = element.balance
        tr.appendChild(tdBalance)

        tab.appendChild(tr)
    })
}

function displayDataTransferTransactions(data, transferBody) {
    data.forEach(element => {
        const tr = document.createElement('tr')
        tr.classList.add('table-secondary')

        const tdId = document.createElement('td')
        tdId.innerHTML = element.id
        tr.appendChild(tdId)

        const tdSenderId = document.createElement('td')
        tdSenderId.innerHTML = element.senderId
        tr.appendChild(tdSenderId)

        const tdRecipientId = document.createElement('td')
        tdRecipientId.innerHTML = element.recipientId
        tr.appendChild(tdRecipientId)

        const tdBalance = document.createElement('td')
        tdBalance.innerHTML = element.balance
        tr.appendChild(tdBalance)

        transferBody.appendChild(tr)
    })
}

function displayDataBasicTransactions(data, basicBody) {
    data.forEach(element => {
        const tr = document.createElement('tr')
        tr.classList.add('table-secondary')

        const tdId = document.createElement('td')
        tdId.innerHTML = element.id
        tr.appendChild(tdId)

        const tdUserId = document.createElement('td')
        tdUserId.innerHTML = element.userId
        tr.appendChild(tdUserId)

        const tdTransactionType = document.createElement('td')
        tdTransactionType.innerHTML = element.transactionType
        tr.appendChild(tdTransactionType)

        const tdBalance = document.createElement('td')
        tdBalance.innerHTML = element.balance
        tr.appendChild(tdBalance)

        basicBody.appendChild(tr)
    });
} 

bankInfo()