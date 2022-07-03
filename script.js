import toolDB from './database.json' assert {type: 'json'}

const draggables = document.querySelectorAll('.draggable')
const nests = document.querySelectorAll('.planner__right__nest')
const toolList = document.querySelector('.toolList')
/* const lis = [...document.querySelector('.toolList').getElementsByTagName('li')] */



function createListOfTools() {
    for (let i = 0; i < toolDB.toolList.length; i++) {

        const li = document.createElement('li');
        toolList.appendChild(li)
        li.innerHTML = `${toolDB.toolList[i].toolNumber}_${toolDB.toolList[i].toolName}`
    }
}
createListOfTools()









draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

nests.forEach(nest => {
    nest.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(nest, e.clientX)
        const draggable = document.querySelector('.dragging')

        if (afterElement == null) {
            nest.appendChild(draggable)
        } else {
            nest.insertBefore(draggable, afterElement)
        }


    })
})

function getDragAfterElement(nest, x) {
    const draggableElements = [...nest.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = x - box.left - box.width / 2

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}
