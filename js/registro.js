// Función para guardar los registros en localStorage
function saveLogToLocalStorage(logEntries) {
    localStorage.setItem('logEntries', JSON.stringify(logEntries));
}

// Función para cargar los registros desde localStorage
function loadLogFromLocalStorage() {
    const savedLogs = localStorage.getItem('logEntries');
    return savedLogs ? JSON.parse(savedLogs) : [];
}

// Función para agregar una fila a la tabla
function addLogRow(i_e, date, type, category, amount, description) {
    const logEntries = document.getElementById('log-entries');

    const row = document.createElement('tr');
    row.classList.add(i_e); // 'income' o 'expense'
    const arrow = document.createElement('div');

    // Crear celdas
    const typeCell = document.createElement('td');
    typeCell.textContent = '';
    arrow.classList.add(i_e === 'income' ? 'up' : 'down');
    typeCell.appendChild(arrow);

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

    const deleteCell = document.createElement('td');
    const deleteContainer = document.createElement('div');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = '../assets/icons/trashcan.svg';
    deleteIcon.setAttribute('alt', 'Eliminar');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.addEventListener('click', () => {

        // Notificación Toastify
        Toastify({
            text: `${"Registro eliminado correctamente"}
            Tipo: ${type}
            Fecha: ${date}`,
            duration: 6000,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(225deg, lightcoral 20%, red 70%, darkred 90%)",
                border: "1px solid whitesmoke",
                borderRadius: ".5em",
                padding: "1em",
                color: "whitesmoke",
                fontWeight: "600",
                textAlign: "center"
            },
        }).showToast();

        deleteLogRow(row, { i_e, date, type, category, amount, description });
    });

    deleteCell.appendChild(deleteContainer);
    deleteContainer.appendChild(deleteIcon);

    // Agregar celdas en orden a la fila
    row.appendChild(typeCell);
    row.appendChild(dateCell);
    row.appendChild(typeInfoCell);
    row.appendChild(categoryCell);
    row.appendChild(amountCell);
    row.appendChild(descriptionCell);
    row.appendChild(deleteCell);

    // Insertar fila en la tabla
    logEntries.appendChild(row);
}

// Función para eliminar una fila de la tabla y del almacenamiento
function deleteLogRow(row, entry) {
    const logEntries = document.getElementById('log-entries');
    logEntries.removeChild(row);

    const numericAmount = parseFloat(entry.amount);
    updateBalance(-numericAmount, entry.i_e);

    logEntriesArray = logEntriesArray.filter(e =>
        !(e.i_e === entry.i_e &&
            e.date === entry.date &&
            e.type === entry.type &&
            e.category === entry.category &&
            e.amount === entry.amount &&
            e.description === entry.description)
    );

    saveLogToLocalStorage(logEntriesArray);
}

// Función para manejar la adición de un nuevo registro
function addNewLog(i_e, date, type, category, amount, description) {
    const newLog = { i_e, date, type, category, amount, description };
    logEntriesArray.push(newLog);

    // Ordenar por fecha (más antiguos primero)
    logEntriesArray.sort((a, b) => new Date(a.date) - new Date(b.date));

    saveLogToLocalStorage(logEntriesArray);

    // Volver a renderizar la tabla completa ordenada
    renderLogTable();
}

// Función para renderizar toda la tabla
function renderLogTable() {
    const logEntriesTable = document.getElementById('log-entries');
    logEntriesTable.innerHTML = "";

    logEntriesArray.forEach(entry => {
        addLogRow(entry.i_e, entry.date, entry.type, entry.category, entry.amount, entry.description);
    });

    // Hacer scroll hasta la última fila
    scrollToLastRow();
}

// Función para hacer scroll hasta la última fila de la tabla
function scrollToLastRow() {
    const rows = document.querySelectorAll('#log-entries tr');
    if (rows.length > 0) {
        rows[rows.length - 1].scrollIntoView({ behavior: 'smooth' });
    }
}

// Variable global con los registros cargados
let logEntriesArray = loadLogFromLocalStorage();

// Cargar la tabla al iniciar
document.addEventListener("DOMContentLoaded", () => {
    // Ordenar por fecha ascendente (más antiguos primero)
    logEntriesArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    renderLogTable();
});
