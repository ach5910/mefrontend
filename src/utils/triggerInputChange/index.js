const inputTypes = [
    window.HTMLInputElement,
    window.HTMLSelectElement,
    window.HTMLTextAreaElement,
];

/**
 * Programmatically trigger React's onChange handler
 * 
 * @param {Node} node 
 * @param {string} value 
 */
const triggerInputChange = (node, value = '') => {

    // only process the change on elements we know have a value setter in their constructor
    if ( inputTypes.indexOf(node.__proto__.constructor) >-1 ) {

        // Get reference to the node's value setter
        const setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value').set;
        const event = new Event('input', { bubbles: true });

        // Update node.value then dispatch an event
        setValue.call(node, value);
        node.dispatchEvent(event);

    }
};
export default triggerInputChange;