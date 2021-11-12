/**
 * Calculates the lineHeight of an element
 * @param {Node} element 
 * 
 * @returns {number} lineHeight
 */
export default function getLineHeight(element) {
    let temp = document.createElement(element.nodeName);
    temp.className = element.className;
    temp.setAttribute("style", `margin:0px;padding:0px;`);
    if (temp.type == "textarea") temp.rows = 1;
    temp.innerHTML = "test";
    temp = element.parentNode.appendChild(temp);
    const ret = temp.clientHeight;
    temp.parentNode.removeChild(temp);
    return ret;
}