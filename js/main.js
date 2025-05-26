// Manejo del flujo y lógica de página principal

document.addEventListener('DOMContentLoaded', function () {
    // Cargar el archivo JSON con los datos de los tipos de ingreso, egreso y categorías
    fetch('/my-fi/options.json')
        .then(response => response.json())
        .then(data => {
            // Llenar las opciones de ingresos
            const incomeTypeSelect = document.querySelector('#income-type');
            data.incomeTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                incomeTypeSelect.appendChild(option);
            });

            // Llenar las opciones de tipos de egresos
            const expenseTypeSelect = document.querySelector('#expense-type');
            data.expenseTypes.forEach(expense => {
                const option = document.createElement('option');
                option.value = expense.type;
                option.textContent = expense.type;
                expenseTypeSelect.appendChild(option);
            });

            // Inicializar el select de categorías de egresos (vacío por defecto)
            const expenseCategorySelect = document.querySelector('#expense-category');
            expenseCategorySelect.innerHTML = '<option selected disabled>Seleccionar</option>'; // Limpiar opciones previas

            // Cargar las categorías cuando se seleccione un tipo de gasto
            expenseTypeSelect.addEventListener('change', function () {
                const selectedType = expenseTypeSelect.value;

                // Limpiar las categorías anteriores
                expenseCategorySelect.innerHTML = '<option selected disabled>Seleccionar</option>';

                // Buscar el objeto correspondiente al tipo de gasto seleccionado
                const selectedExpenseType = data.expenseTypes.find(expense => expense.type === selectedType);

                // Si se encuentra el tipo de gasto, agregar sus categorías
                if (selectedExpenseType) {
                    selectedExpenseType.categories.forEach(category => {
                        const option = document.createElement('option');
                        option.value = category;
                        option.textContent = category;
                        expenseCategorySelect.appendChild(option);
                    });
                }
            });
        })
        .catch(error => {
            // Notificación Toastify
            Toastify({
                text: `¡Ups! 😵‍💫
                    Ocurrió un error al cargar las opciones
                    
                    Intenta recargar la página`,
                duration: 9000,
                close: false,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "beige",
                    border: "1px solid black",
                    borderRadius: "0.25em",
                    padding: "1em",
                    color: "black",
                    fontWeight: "600",
                    textAlign: "center"
                },
            }).showToast();
        });
});

