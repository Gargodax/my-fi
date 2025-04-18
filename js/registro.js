function addLogRow(i_e, date, type, category, amount, description) {
    const logEntries = document.getElementById('log-entries');

    const row = document.createElement('tr');
    row.classList.add(i_e); // 'income' o 'expense'

    // Crear celdas
    const typeCell = document.createElement('td');
    typeCell.textContent = i_e === 'income' ? '🟢' : '🔴';

    const dateCell = document.createElement('td');
    dateCell.textContent = date;

    const typeInfoCell = document.createElement('td');
    typeInfoCell.textContent = type;

    const categoryCell = document.createElement('td');
    categoryCell.textContent = category;

    const amountCell = document.createElement('td');
    amountCell.textContent = `$${parseFloat(amount).toFixed(2)}`;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = description;

    // Agregar celdas en orden a la fila
    row.appendChild(typeCell);
    row.appendChild(dateCell);
    row.appendChild(typeInfoCell);
    row.appendChild(categoryCell);
    row.appendChild(amountCell);
    row.appendChild(descriptionCell);

    // Insertar fila en la tabla
    logEntries.appendChild(row);
}
