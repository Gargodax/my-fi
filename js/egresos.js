// Función para agregar egresos
function agregarEgreso() {
    // Menú para seleccionar tipo de gasto (fijo, variable o eventual)
    const tipoGasto = prompt("Seleccione el tipo de gasto:\n1. Gastos Fijos\n2. Gastos Variables\n3. Gastos Eventuales");

    let categoria = '';

    // Dependiendo del tipo de gasto, seleccionamos la categoría específica
    switch (tipoGasto) {
        case '1': // Gastos Fijos
            categoria = prompt("Seleccione la categoría de gasto fijo:\n1. Alquiler\n2. Servicios Públicos\n3. Internet\n4. Seguro\n5. Transporte");
            switch (categoria) {
                case '1': categoria = 'Alquiler'; break;
                case '2': categoria = 'Servicios Públicos'; break;
                case '3': categoria = 'Internet'; break;
                case '4': categoria = 'Seguro'; break;
                case '5': categoria = 'Transporte'; break;
                default: alert("Opción no válida."); return;
            }
            break;
        case '2': // Gastos Variables
            categoria = prompt("Seleccione la categoría de gasto variable:\n1. Comida\n2. Entretenimiento\n3. Ropa\n4. Salud\n5. Educación\n6. Ahorros");
            switch (categoria) {
                case '1': categoria = 'Comida'; break;
                case '2': categoria = 'Entretenimiento'; break;
                case '3': categoria = 'Ropa'; break;
                case '4': categoria = 'Salud'; break;
                case '5': categoria = 'Educación'; break;
                case '6': categoria = 'Ahorros'; break;
                default: alert("Opción no válida."); return;
            }
            break;
        case '3': // Gastos Eventuales
            categoria = prompt("Seleccione la categoría de gasto eventual:\n1. Viajes\n2. Regalos\n3. Mantenimiento");
            switch (categoria) {
                case '1': categoria = 'Viajes'; break;
                case '2': categoria = 'Regalos'; break;
                case '3': categoria = 'Mantenimiento'; break;
                default: alert("Opción no válida."); return;
            }
            break;
        default:
            alert("Opción no válida.");
            return;
    }

    const monto = parseFloat(prompt("Ingrese el monto del egreso:"));
    const fecha = prompt("Ingrese la fecha del egreso (Formato: DD/MM/AAAA)");

    if (isNaN(monto)) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }

    egresos.push({ categoria, monto, fecha });
    alert(`Egreso registrado: ${monto} en la categoría ${categoria} el ${fecha}`);
}