function removeChilds(parent, childs) {
    childs.forEach(child => parent.removeChild(child));
}

function appendChilds(parent, childs) {
    childs.forEach(child => parent.appendChild(child));
}