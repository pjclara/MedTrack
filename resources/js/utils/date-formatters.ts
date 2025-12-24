/**
 * Formata uma data para o formato dd/mm/yyyy (português)
 * @param date - String de data em formato ISO (yyyy-mm-dd) ou objeto Date
 * @returns String formatada como dd/mm/yyyy
 */
export const formatDateToPT = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
};

/**
 * Formata uma data para o formato dd/mm/yyyy com nome do mês por extenso
 * @param date - String de data em formato ISO (yyyy-mm-dd) ou objeto Date
 * @returns String formatada como "dd de mês de yyyy"
 */
export const formatDateToLongPT = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return dateObj.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

/**
 * Converte data do formato dd/mm/yyyy para yyyy-mm-dd (ISO)
 * @param date - String de data no formato dd/mm/yyyy
 * @returns String formatada como yyyy-mm-dd
 */
export const parseDateFromPT = (date: string): string => {
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

/**
 * Converte data do formato yyyy-mm-dd (ISO) para dd/mm/yyyy
 * @param date - String de data no formato yyyy-mm-dd
 * @returns String formatada como dd/mm/yyyy
 */
export const convertISOToPT = (date: string): string => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
};

/**
 * Converte data do formato dd/mm/yyyy para yyyy-mm-dd (ISO)
 * Útil para enviar ao backend
 * @param date - String de data no formato dd/mm/yyyy
 * @returns String formatada como yyyy-mm-dd
 */
export const convertPTToISO = (date: string): string => {
    if (!date) return '';
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
};
