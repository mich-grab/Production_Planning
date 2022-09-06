import toolDB from './database.json' assert {type: 'json'}

let draggables = document.getElementsByName('guide')
/*  HTML COLLECTION */
let nest_1 = document.getElementsByClassName('planner__right__nest_1')
let nest_2 = document.getElementsByClassName('planner__right__nest_2')
let nest_3 = document.getElementsByClassName('planner__right__nest_3')
let nest_4 = document.getElementsByClassName('planner__right__nest_4')

let delete_array = document.getElementsByClassName('guide_icon_delete')



let nest_1_a = document.getElementById('planner__right__nest_1')
let nest_2_a = document.getElementById('planner__right__nest_2')
let nest_3_a = document.getElementById('planner__right__nest_3')
let nest_4_a = document.getElementById('planner__right__nest_4')



let nest_1_Arr = Array.from(nest_1)
let nest_2_Arr = Array.from(nest_2)
let nest_3_Arr = Array.from(nest_3)
let nest_4_Arr = Array.from(nest_4)

let nests = nest_1_Arr.concat(nest_2_Arr, nest_3_Arr, nest_4_Arr)



let draggables_nest_1 = document.getElementById('planner__right__nest_1').getElementsByClassName('process')
let draggables_nest_2 = document.getElementById('planner__right__nest_2').getElementsByClassName('process')
let draggables_nest_3 = document.getElementById('planner__right__nest_3').getElementsByClassName('process')
let draggables_nest_4 = document.getElementById('planner__right__nest_4').getElementsByClassName('process')

let draggables_nest_1_Arr = Array.prototype.slice.call(draggables_nest_1)
let draggables_nest_2_Arr = Array.prototype.slice.call(draggables_nest_2)
let draggables_nest_3_Arr = Array.prototype.slice.call(draggables_nest_3)
let draggables_nest_4_Arr = Array.prototype.slice.call(draggables_nest_4)

let nests_Arr = draggables_nest_1_Arr.concat(draggables_nest_2_Arr, draggables_nest_3_Arr, draggables_nest_4_Arr)

const printGuide = document.querySelector('.token')
const addGuide = document.querySelector('.add')
const removeGuide = document.querySelector('.remove')
const refreshGuide = document.querySelector('.refresh')

const toolList = document.querySelector('.toolList')
const info_toolIDs = document.getElementById('tool_id')
const info_toolNames = document.getElementById('tool_name')
const info_toolNumbers = document.getElementById('tool_number')
const info_toolGuidelist = document.getElementById('tool_guideList')
const info_plannerRightBottom = document.querySelector('.planner__right__bottom')

/* 
/*  Creates list of tools based on json file */
let tools = []
let toolListArray = []
let displayActiveTool = 0

/* #####################################################################
                Wypełnianie listy wg DB
   #####################################################################
*/
createListOfTools()

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
            displayActiveTool = toolFullName
            info_toolIDs.innerText = toolDB.toolList[i].id
            info_toolNames.innerText = toolDB.toolList[i].toolName
            info_toolNumbers.innerText = toolDB.toolList[i].toolNumber
            let guides_list = ''
            for (let j = 0; j < toolDB.toolList[i].guideList.length; j++) {
                guides_list += toolDB.toolList[i].guideList[j].guide
            }
            info_toolGuidelist.innerText = guides_list

            displayActiveTool = i

            createGuides(i)
        }
        else {

        }
    }
}
/* 
   #####################################################################
*/



addGuide.addEventListener('click', () => {
    console.log(delete_array)
})


removeGuide.addEventListener('click', () => {

})


printGuide.addEventListener('click', () => {

})


refreshGuide.addEventListener('click', () => {

})

function saveGuides() {
    toolDB.toolList[displayActiveTool].guideList.length = 0
    for (let i = 0; i < draggables_nest_4.length; i++) {

        toolDB.toolList[displayActiveTool].guideList[i] = { "guide": draggables_nest_4[i].innerText.slice(0, -8) }
    }

    /* console.log(draggables_nest_4[1].innerText.slice(0, -7)) */
    /* console.log(toolDB.toolList[displayActiveTool].guideList) */
}



function createGuides(number) {

    nest_4_a.innerHTML = ''

    console.log(toolDB.toolList[displayActiveTool].guideList)

    for (let i = 0; i < toolDB.toolList[number].guideList.length; i++) {
        let newDiv = document.createElement('div')

        newDiv.classList.add("process", "draggable")
        newDiv.setAttribute("draggable", "true")
        newDiv.setAttribute("name", "guide")
        newDiv.style.backgroundColor = toolDB.toolList[number].toolcolor


        let newSpanIcon = document.createElement('span')
        newSpanIcon.classList.add("fas", "fa-trash-alt", "guide_icon_delete")
        newDiv.appendChild(newSpanIcon)

        let newSpanNumber = document.createElement('span')

        newSpanNumber.innerText = toolDB.toolList[number].guideList[i].guide
        newDiv.appendChild(newSpanNumber)



        nest_4_a.append(newDiv)

        newDiv.addEventListener('dragstart', dragStart)
        newDiv.addEventListener('dragend', dragEnd)

    }

    for (let del_element of delete_array) {

        del_element.addEventListener('click', (e) => {
            del_element.parentNode.remove()
        })

    }

}

/* function refreshNestArr(nest, divArray) {
    nest = []
    for (let i = 0; i < divArray.length; i++) {
        nest.push(divArray[i])

    }
}

function refreshNest(nest, divArray) {
    nest.innerHTML = ""
    for (let i = 0; i < divArray.length; i++) {
        nest.appendChild(divArray[i])
    }

} */


let draggableTodo = null;

function dragStart() {
    draggableTodo = this;
    draggableTodo.classList.add('dragging')
}
function dragEnd() {
    draggableTodo.classList.remove('dragging')
    draggableTodo = null;

    saveGuides()
}

draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart)
    draggable.addEventListener('dragend', dragEnd)
})



function removeGuideFromArray(nestArr, position) {
    for (let i = 0; i < nestArr.length; i++) {
        if (position == i) {
            nestArr.splice(position, 1)
        }
    }
}

function addGuideToArray(nestArr, position, guide) {
    for (let i = 0; i < nestArr.length; i++) {
        if (position == i) {
            nestArr.splice(position, 0, guide)
        }
    }
}


nests.forEach(nest => {
    nest.addEventListener('dragover', e => {
        e.preventDefault()

        const afterElement = getDragAfterElement(nest, e.clientX)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            nest.appendChild(draggable)
            addGuideToArray(nest, nest.length, draggable)
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




/* #####################################################################

/* for (let draggable of draggables) {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
} */


/* for (let nest of nests) {
    console.log(nest)
    console.log(nests)
    nest.addEventListener('dragover', e => {
        e.preventDefault()

        const afterElement = getDragAfterElement(nest, e.clientX)
        const draggable = document.getElementsByClassName('.dragging')

        if (afterElement == null) {
            nest.push(draggable)
        } else {
            nest.push(draggable, afterElement)
        }
    })
}

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
} */


/* #####################################################################

/* draggables.forEach(draggable => {
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
} */
