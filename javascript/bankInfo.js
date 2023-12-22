function bankInfo() {
    const usersBtn = document.getElementById('users')
    const basicTransactionBtn = document.getElementById('basicTransaction')
    const transferTransactionBtn = document.getElementById('transferTransaction')
    const tab = document.getElementById('tab')

    urlTemplate = "http://localhost:8080/api/v1/"

    usersBtn.addEventListener('click', (event) => {
        event.preventDefault()
        tab.innerHTML = ''

        const url = `${urlTemplate}user`

        fetch(url).then(res => res.json()).then(data => displayData(data, tab))
    })

    basicTransactionBtn.addEventListener('click', (event) => {
        event.preventDefault()
        tab.innerHTML = ''

        const url = `${urlTemplate}basicTransaction`

        fetch(url).then(res => res.json()).then(data => displayData(data, tab))
    })

    transferTransactionBtn.addEventListener('click', (event) => {
        event.preventDefault()
        tab.innerHTML = ''

        const url = `${urlTemplate}transferTransaction`

        fetch(url).then(res => res.json()).then(data => displayData(data, tab))
    })
}

function displayData(data, tab) {
    data.forEach(element => {
        const obj = document.createElement('div')
        obj.innerHTML = JSON.stringify(element)

        tab.appendChild(obj)
    });
}

bankInfo()