function processData(input) {
    // given date format is dd-mm-yyyy
    const dates = input.split(' ');
    const start = dates[0].split('-');
    const end = dates[1].split('-');
    // change date format to yyyy-mm-dd for comparison
    const startDate = new Date(start[2], start[1] - 1, start[0]);
    const endDate = new Date(end[2], end[1] - 1, end[0]);
    let count = 0;
    for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
        if (isPrime(i.getDate())) {
            count++;
        }
    }
    return count;
}
const input = "02-08-2025 04-09-2025";
const result = processData(input);
console.log(result);
