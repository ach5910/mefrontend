export default function logError(msg) {
    return function catchError(err) {
        console.log(msg, err);
    };
}