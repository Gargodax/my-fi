// Función para calcular el balance
function calcularBalance() {
    const totalIngresos = ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
    const totalEgresos = egresos.reduce((total, egreso) => total + egreso.monto, 0);
    const balance = totalIngresos - totalEgresos;

    alert(`Total Ingresos: ${totalIngresos}\nTotal Egresos: ${totalEgresos}\nBalance: ${balance}`);
}

// Función para mostrar todos los ingresos y egresos
function mostrarRegistros() {
    let registros = "";

    // Mostrar ingresos
    registros += "Ingresos:\n";
    ingresos.forEach(ingreso => {
        registros += `${ingreso.categoria}: ${ingreso.monto} el ${ingreso.fecha}\n`;
    });

    // Mostrar egresos
    registros += "\nEgresos:\n";
    egresos.forEach(egreso => {
        registros += `${egreso.categoria}: ${egreso.monto} el ${egreso.fecha}\n`;
    });

    alert(registros);
}