// Función para agregar ingresos
function agregarIngreso() {
    // Menú de categorías numéricas
    let categoria = prompt("Seleccione la categoría de ingreso:\n1. Sueldo\n2. Freelance\n3. Inversiones\n4. Otros Ingresos");
    const monto = parseFloat(prompt("Ingrese el monto del ingreso:"));
    const fecha = prompt("Ingrese la fecha del ingreso (Formato: DD/MM/AAAA)");

    if (isNaN(monto)) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }

    // Convertir el número de la categoría a su nombre
    switch (categoria) {
        case '1':
            categoria = 'Sueldo';
            break;
        case '2':
            categoria = 'Freelance';
            break;
        case '3':
            categoria = 'Inversiones';
            break;
        case '4':
            categoria = 'Otros Ingresos';
            break;
        default:
            alert("Opción no válida.");
            return;
    }

    ingresos.push({ categoria, monto, fecha });
    alert(`Ingreso registrado: ${monto} en la categoría ${categoria} el ${fecha}`);
}