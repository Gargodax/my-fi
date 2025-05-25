document.addEventListener("DOMContentLoaded", () => {
    const expenseTypeSelect = document.querySelector('#expense-type');
    const expenseCategorySelect = document.querySelector('#expense-category');
    const expenseDate = document.querySelector('#expense-date');
    const expenseAmount = document.querySelector('#expense-amount');
    const expenseDescription = document.querySelector('#expense-description');
    const addExpenseButton = document.querySelector('#add-expenses-item');

    const categories = {
        "Fijo": ["Alquiler", "Servicios públicos", "Internet", "Seguros", "Transporte"],
        "Variable": ["Comida", "Entretenimiento", "Ropa", "Salud", "Educación", "Ahorros"],
        "Eventual": ["Viajes", "Regalos", "Mantenimiento"]
    };

    function validateExpenseForm() {
        const typeSelected = expenseTypeSelect.selectedIndex > 0;
        const categorySelected = expenseCategorySelect.selectedIndex > 0;
        const dateFilled = expenseDate.value.trim() !== "";
        const amountFilled = expenseAmount.value.trim() !== "" && parseFloat(expenseAmount.value) > 0;

        addExpenseButton.disabled = !(typeSelected && categorySelected && dateFilled && amountFilled);
    }

    // Desactivar botón por defecto
    addExpenseButton.disabled = true;

    // Actualizar categorías cuando se selecciona tipo
    expenseTypeSelect.addEventListener("change", () => {
        expenseCategorySelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.text = "Seleccionar";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        expenseCategorySelect.appendChild(defaultOption);

        const selectedType = expenseTypeSelect.options[expenseTypeSelect.selectedIndex].text;

        if (categories[selectedType]) {
            categories[selectedType].forEach(cat => {
                const option = document.createElement("option");
                option.value = cat.toLowerCase();
                option.textContent = cat;
                expenseCategorySelect.appendChild(option);
            });
        }

        validateExpenseForm(); // Revalidar formulario
    });

    // Escuchar cambios en campos
    expenseCategorySelect.addEventListener("change", validateExpenseForm);
    expenseDate.addEventListener("input", validateExpenseForm);
    expenseAmount.addEventListener("input", validateExpenseForm);

    // Click en botón "Cargar"
    addExpenseButton.addEventListener("click", (e) => {
        e.preventDefault();

        const defaultOption = document.createElement("option");
        defaultOption.text = "Seleccionar";
        defaultOption.disabled = true;
        defaultOption.selected = true;

        // Agregar fila a la tabla de registros
        addNewLog("expense", expenseDate.value, expenseTypeSelect.options[expenseTypeSelect.selectedIndex].text,
            expenseCategorySelect.options[expenseCategorySelect.selectedIndex].text, expenseAmount.value, expenseDescription.value);

        // Notificación Toastify
        Toastify({
            text: `${"Egreso agregado correctamente"}
            Tipo: ${expenseTypeSelect.options[expenseTypeSelect.selectedIndex].text}
            Categoría: ${expenseCategorySelect.options[expenseCategorySelect.selectedIndex].text}
            Fecha: ${expenseDate.value}`,
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

        //Actualizar monto del balance
        updateBalance(expenseAmount.value, 'expense');

        // Limpiar campos
        expenseTypeSelect.selectedIndex = 0;
        expenseCategorySelect.innerHTML = ""; // Limpia categorías
        expenseCategorySelect.appendChild(defaultOption); // Agregar opción por defecto ("Seleccionar")
        expenseDate.value = "";
        expenseAmount.value = "";
        expenseDescription.value = "";

        // Deshabilitar botón hasta que el formulario esté completo nuevamente
        addExpenseButton.disabled = true;
    });
});