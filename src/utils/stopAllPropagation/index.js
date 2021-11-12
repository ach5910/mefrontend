export default function stopAllPropagation(e) {
    if (!e) return;
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) e.nativeEvent.stopImmediatePropagation();
}