let counter = 0;



export default function getUniqueId() {
    counter++;
    return 'id-' + counter;
}