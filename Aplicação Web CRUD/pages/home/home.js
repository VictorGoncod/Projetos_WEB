function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Error ao fazer logout');
    })
}

findTransactions();

function findTransactions() {
    firebase.firestore()
        .collection('transactions')
        .get()
        .then(snapshot => {
            const transactions = snapshot.docs.map(doc => doc.data());
            addTransactionsToScreen(transactions);
        })
}

function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);

        const date = document.createElement('p');
        date.innerHTML = formatDate(transaction.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transaction.money);
        li.appendChild(money);

        const type = document.createElement('p');
        type.innerHTML = transaction.transactionType;
        li.appendChild(type);

        if (transaction.description) {
            const description = document.createElement('p');
            description.innerHTML = transaction.description;
            li.appendChild(description);
        }

        orderedList.appendChild(li);
    });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`
}

const fakeTransactions = [{
    type: 'expense',
    date: '2022-01-01',
    money: {
        currency: 'R$',
        value: 10.00,
    },
    transactionType: 'Supermercado'
},{
    type: 'income',
    date: '2023-10-14',
    money: {
        currency: 'R$',
        value: 609.00,
    },
    transactionType: 'Salario',
    description: 'Empresa A'
},{
    type: 'expense',
    date: '2023-10-14',
    money: {
        currency: 'R$',
        value: 609.00,
    },
    transactionType: 'Salario',
    description: 'Empresa A'
}]