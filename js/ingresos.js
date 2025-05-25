document.addEventListener("DOMContentLoaded", () => {

    const incomeTypeSelect = document.querySelector('#income-type');
    const incomeDate = document.querySelector('#income-date');
    const incomeAmount = document.querySelector('#income-amount');
    const incomeDescription = document.querySelector('#income-description');
    const addIncomeButton = document.querySelector('#add-income-item');

    // Función para validar si todos los campos requeridos están completos
    function validateIncomeForm() {
        const dateFilled = incomeDate.value.trim() !== "";
        const typeSelected = incomeTypeSelect.selectedIndex > 0;
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


        // Validar formulario antes de agregar
        if (addIncomeButton.disabled) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        // Agregar fila a la tabla de registros
        addNewLog("income", incomeDate.value, incomeTypeSelect.options[incomeTypeSelect.selectedIndex].text,
            "Ingresos", incomeAmount.value, incomeDescription.value);

        // Notificación Toastify
        Toastify({
            text: `${"Ingreso agregado correctamente"}
            Tipo: ${incomeTypeSelect.options[incomeTypeSelect.selectedIndex].text}
            Fecha: ${incomeDate.value}`,
            duration: 6000,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(225deg, lightgreen 20%, green 70%, darkgreen 90%)",
                border: "1px solid whitesmoke",
                borderRadius: ".5em",
                padding: "1em",
                color: "black",
                fontWeight: "600",
                textAlign: "center"
            },
        }).showToast();

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