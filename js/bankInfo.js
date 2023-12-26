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
        const tr = createTableRow(['table-secondary', 'transfer-transaction-row']);

        appendTableCell(tr, element.id);
        appendTableCell(tr, element.firstName);
        appendTableCell(tr, element.lastName);
        appendTableCell(tr, element.age);
        appendTableCell(tr, element.email);
        appendTableCell(tr, element.accountNumber);
        appendTableCell(tr, element.balance);

        tab.appendChild(tr)
    })
}

function displayDataTransferTransactions(data, transferBody) {
    data.forEach(element => {
        const tr = createTableRow(['table-secondary', 'transfer-transaction-row']);

        appendTableCell(tr, element.id);
        appendTableCell(tr, element.senderId);
        appendTableCell(tr, element.recipientId);
        appendTableCell(tr, element.balance);

        transferBody.appendChild(tr)
    })
}

function displayDataBasicTransactions(data, basicBody) {
    data.forEach(element => {
        const tr = createTableRow(['table-secondary', 'basic-transaction-row']);

        appendTableCell(tr, element.id);
        appendTableCell(tr, element.userId);
        appendTableCell(tr, element.transactionType);
        appendTableCell(tr, element.balance);

        basicBody.appendChild(tr);
    });
}

function createTableRow(classes) {
    const tr = document.createElement('tr');
    if (classes) {
        tr.classList.add(...classes);
    }
    return tr;
}

function appendTableCell(row, content) {
    const td = document.createElement('td');
    td.innerHTML = content;
    row.appendChild(td);
}

bankInfo()