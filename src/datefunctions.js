export function formatDate(dateString) {
    const date = new Date(dateString);  // Create a Date object from the string
    const day = String(date.getDate()).padStart(2, '0');  // Ensure two digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Get month and ensure two digits
    const year = date.getFullYear();  // Get the full year

    return `${day}.${month}.${year}`;  // Return the formatted date
}