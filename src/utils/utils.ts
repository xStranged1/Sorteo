import { sequelize } from "../config/config";

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

export const checkConstraints = async () => {
    try {
        const result = await sequelize.query(`
        SELECT *
        FROM information_schema.table_constraints
        WHERE table_name = 'raffleNumbers';
      `);

        console.log(result[0]); // Muestra las restricciones encontradas
    } catch (error) {
        console.error('Error al consultar restricciones:', error);
    }
}

export const dropNumberUniqueConstraint = async () => {
    try {
        const result = await sequelize.query(`
        ALTER TABLE "raffleNumbers" DROP CONSTRAINT "raffleNumbers_number_key";
        `
        );

        console.log(result[0]); // Muestra las restricciones encontradas
    } catch (error) {
        console.error('Error al consultar restricciones:', error);
    }
}
