// Inicialización de variables
const ingresos = [];
const egresos = [];


// Función principal para interacción
function iniciarApp() {
    let continuar = true;

    while (continuar) {
        const opcion = prompt("Seleccione una opción:\n1. Registrar Ingreso\n2. Registrar Egreso\n3. Calcular Balance\n4. Ver Registros\n5. Salir");

        switch (opcion) {
            case '1':
                agregarIngreso();
                break;
            case '2':
                agregarEgreso();
                break;
            case '3':
                calcularBalance();
                break;
            case '4':
                mostrarRegistros();
                break;
            case '5':
                continuar = false;
                alert("Gracias por usar My-Fi.");
                break;
            default:
                alert("Opción no válida, por favor intente nuevamente.");
        }
    }
}

// Iniciar web app
iniciarApp();
