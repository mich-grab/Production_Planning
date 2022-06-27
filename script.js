const draggables = document.querySelectorAll('.draggable')
const nests = document.querySelectorAll('.planner__right__nest')


draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

nests.forEach(nest => {
    nest.addEventListener('dragover', () => {
        console.log('dragover')
    })
})
