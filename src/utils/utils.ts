export function isValidISO8601(fecha: any) {
    // Expresión regular para validar el formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Verifica el formato de la fecha
    if (!regex.test(fecha)) {
        return false;
    }

    // Crea un objeto Date a partir de la fecha
    const [año, mes, dia] = fecha.split('-').map(Number);
    const fechaObj = new Date(año, mes - 1, dia);

    // Verifica si la fecha es válida
    return fechaObj.getFullYear() === año &&
        fechaObj.getMonth() === mes - 1 &&
        fechaObj.getDate() === dia;
}
