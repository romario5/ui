let counter = 0;



export default function getUniqueId() {
    counter++;
    return 'uis-id-' + counter;
}