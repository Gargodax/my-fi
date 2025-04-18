let currentBalance = 0;

// Cargar balance inicial desde localStorage
const savedBalance = localStorage.getItem('balance');
if (savedBalance !== null) {
    currentBalance = parseFloat(savedBalance);
    document.getElementById('balance-amount').textContent = `$${currentBalance.toFixed(2)}`;
}

function updateBalance(amount, type) {
    const balanceElement = document.getElementById('balance-amount');
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) return;

    if (type === 'income') {
        currentBalance += numericAmount;
    } else if (type === 'expense') {
        currentBalance -= numericAmount;
    }

    // Mostrar en pantalla
    balanceElement.textContent = `$${currentBalance.toFixed(2)}`;

    // Guardar en localStorage
    localStorage.setItem('balance', currentBalance.toFixed(2));
}
