export function doCompact(arr, size) {
    var res = []
    for (let i = 0; i < arr.length; i += size) {
        var item = []
        for (let j = 0; j < size && i+j < arr.length; j++) {
            item.push(arr[i+j])
        }
        res.push(item)
    }
    return res
}