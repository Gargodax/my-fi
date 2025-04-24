document.addEventListener("DOMContentLoaded", () => {

    const incomeForm = document.getElementById("entries");
    const incomeTypeSelect = document.getElementById("income-type");
    const incomeDate = document.getElementById("income-date");
    const incomeAmount = document.getElementById("income-amount");
    const incomeDescription = document.getElementById("income-description");
    const addIncomeButton = document.getElementById("add-income-item");

    // Función para validar si todos los campos requeridos están completos
    function validateIncomeForm() {
        const typeSelected = incomeTypeSelect.selectedIndex > 0;
        const dateFilled = incomeDate.value.trim() !== "";
        const amountFilled = incomeAmount.value.trim() !== "" && parseFloat(incomeAmount.value) > 0;

        addIncomeButton.disabled = !(typeSelected && dateFilled && amountFilled);
    }

    // Desactivar botón por defecto
    addIncomeButton.disabled = true;

    // Escuchar cambios en los campos requeridos
    incomeTypeSelect.addEventListener("change", validateIncomeForm);
    incomeDate.addEventListener("input", validateIncomeForm);
    incomeAmount.addEventListener("input", validateIncomeForm);

    // Click en botón "Cargar"
    addIncomeButton.addEventListener("click", (e) => {
        e.preventDefault();

        // Agregar fila a la tabla de registros
        addNewLog("income", incomeDate.value, incomeTypeSelect.options[incomeTypeSelect.selectedIndex].text,
            "-", incomeAmount.value, incomeDescription.value);

        // Actualizar monto del balance
        updateBalance(incomeAmount.value, 'income');


        // Limpiar campos
        incomeTypeSelect.selectedIndex = 0;
        incomeDate.value = "";
        incomeAmount.value = "";
        incomeDescription.value = "";

        // Deshabilitar botón hasta que el formulario esté completo nuevamente
        addIncomeButton.disabled = true;
    });
});