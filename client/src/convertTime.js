export default function(argTime) {
    const time = new Date(argTime);
    const result = time.getFullYear() + "." + time.getMonth() + "." + time.getDate() + "  " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    return result;
}