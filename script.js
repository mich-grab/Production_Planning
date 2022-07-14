import toolDB from './database.json' assert {type: 'json'}

let draggables = document.getElementsByName('guide')
const nests = document.querySelectorAll('.planner__right__nest')
const toolList = document.querySelector('.toolList')

const info_toolIDs = document.getElementById('tool_id')
const info_toolNames = document.getElementById('tool_name')
const info_toolNumbers = document.getElementById('tool_number')
const info_toolGuidelist = document.getElementById('tool_guideList')
const info_plannerRightBottom = document.querySelector('.planner__right__bottom')

let tools = []
let toolListArray = []

function createListOfTools() {

    for (let i = 0; i < toolDB.toolList.length; i++) {

        const li = document.createElement('li')
        li.setAttribute('class', 'tool')
        toolList.appendChild(li)
        li.innerHTML = `${toolDB.toolList[i].toolNumber}_${toolDB.toolList[i].toolName}`
        toolListArray[i] = `${toolDB.toolList[i].toolNumber}_${toolDB.toolList[i].toolName}`

        tools = document.querySelectorAll('.tool')
    }
}
createListOfTools()

/* console.log(toolListArray)
console.log(toolList)
let newArray = [...toolList.children]
console.log(toolList)
console.log(newArray)
 */


tools.forEach(tool => {

    tool.addEventListener('click', () => {
        tools.forEach(tool2 => {
            tool2.classList.remove('active')
        })
        tool.classList.add('active')
        fillToolInfo(tool.innerText)

    })


})

function fillToolInfo(toolFullName) {
    for (let i = 0; i < toolDB.toolList.length; i++) {
        if (toolFullName == toolListArray[i]) {
            info_toolIDs.innerText = toolDB.toolList[i].id
            info_toolNames.innerText = toolDB.toolList[i].toolName
            info_toolNumbers.innerText = toolDB.toolList[i].toolNumber
            let guides_list = ''
            for (let j = 0; j < toolDB.toolList[i].guideList.length; j++) {
                console.log(guides_list)
                guides_list += toolDB.toolList[i].guideList[j].guide
                console.log(guides_list)
            }
            info_toolGuidelist.innerText = guides_list

            createGuides(i)
        }
    }
}



function createGuides(number) {

    for (let i = 0; i < toolDB.toolList[number].guideList.length; i++) {
        let newDiv = document.createElement('div')
        newDiv.innerHTML = `${toolDB.toolList[number].guideList[i]}`
        newDiv.classList.add('process', 'draggable', 'red')
        newDiv.setAttribute('draggable', true)
        newDiv.name = 'guide'
        info_plannerRightBottom.appendChild(newDiv)
        draggables.append(newDiv)
    }
    /* console.log(draggables) */

}



/* console.log(draggables) */


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
