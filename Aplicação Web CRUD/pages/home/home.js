function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Error ao fazer logout');
    })
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
    transactionType: 'Salario'
    decription: 'Empresa A'
},{
    type: 'expense',
    date: '2023-10-14',
    money: {
        currency: 'R$',
        value: 609.00,
    },
    transactionType: 'Salario'
    decription: 'Empresa A'
}]