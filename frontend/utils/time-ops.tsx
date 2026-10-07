import toast from "react-hot-toast";

export function addMinutes(date: Date, mins: number): string {
    const newMins = date.getMinutes() + mins;
    const remainder = Math.floor(newMins / 60);
    return `${date.getHours() + remainder}:${newMins - remainder * 60}`
}
export function convertTimeToDate(time: string, currentDate: Date): Date {
    const timeParts = time.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0); // Optionally set seconds and milliseconds
    currentDate.setMilliseconds(0);
    return currentDate
}
export function showSuccessToast(message: string) {
    toast.success(message, {
        style: {
            background: 'green',
            color: 'white',
            borderRadius: '8px',
            padding: '10px',
        },
    });
}
export function showErrorToast(message: string) {
    toast.error(message, {
        style: {
            background: 'red',
            color: 'white',
            borderRadius: '8px',
            padding: '10px',
        },
    });
}
export function getTimeString(unix: number) {
    const date = new Date(unix * 1000)
    const hour = date.getHours()
    const mins = date.getMinutes()
    let str = "";
    if (hour < 10) {
        str += "0" + hour;
    } else {
        str += hour.toFixed(0);
    }
    str += ":"
    if (mins < 10) {
        str += "0" + mins;
    } else {
        str += mins.toFixed(0);
    }
    return str;
}