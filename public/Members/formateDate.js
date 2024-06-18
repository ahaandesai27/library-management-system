export function formatDate(date) {
    // Get the day, month, and year from the date object
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-based, so add 1
    let year = date.getFullYear();

    // Format day and month to always have two digits
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Combine into the desired format
    return `${day}-${month}-${year}`;
}

export function parseDate(input) {
    const parts = input.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}