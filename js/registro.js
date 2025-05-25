// Función para guardar los registros en localStorage
function saveLogToLocalStorage(logEntries) {
    localStorage.setItem('logEntries', JSON.stringify(logEntries));
}

// Función para cargar los registros desde localStorage
function loadLogFromLocalStorage() {
    const savedLogs = localStorage.getItem('logEntries');
    return savedLogs ? JSON.parse(savedLogs) : [];
}

// Función para agregar un nuevo registro al log
let logEntriesArray = loadLogFromLocalStorage();

// Función para agregar una fila a la tabla
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

// Función para cargar los registros al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Limpiar la tabla antes de cargar los registros
    const logEntriesTable = document.getElementById('log-entries');
    logEntriesTable.innerHTML = ""; // Limpiamos la tabla

    // Cargar los registros guardados en localStorage y mostrarlos
    logEntriesArray.forEach(entry => {
        addLogRow(entry.i_e, entry.date, entry.type, entry.category, entry.amount, entry.description);
    });
});

// Función para manejar la adición de un nuevo registro
function addNewLog(i_e, date, type, category, amount, description) {
    // Agregar el nuevo registro al array
    const newLog = { i_e, date, type, category, amount, description };
    logEntriesArray.push(newLog);

    // Guardar los registros en localStorage
    saveLogToLocalStorage(logEntriesArray);

    // Agregar el nuevo registro a la tabla
    addLogRow(i_e, date, type, category, amount, description);
}
