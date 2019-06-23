export function toHumanString(num) {
    if (num > 1000) {
        return parseInt(num/1000) + 'k'
    } else {
        return num
    }
}
