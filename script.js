//  Variables that contains the item of each box
let areas = {
    a:null,
    b:null,
    c:null
};

//  ---- Events ----
//  more than 1 item, so we user querySelectorAll
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach(area => {
    //  When drag the item on the area, the function will be called
    area.addEventListener('dragover', dragOver);
    //  "when the item is in an area that can drop but you remove from this area
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

//  Allow to sent the item back to the neutral Area
document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);


//  ---- Functions Item ----
function dragStart(e){
    e.currentTarget.classList.add('dragging');
};

function dragEnd(e){
    e.currentTarget.classList.remove('dragging');
};

//  ---- Functions Area ----
function dragOver(e){
    if(e.currentTarget.querySelector('.item') === null){
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }

};

function dragLeave(e){
    e.currentTarget.classList.remove('hover');  
};

function drop(e){
    e.currentTarget.classList.remove('hover');

    //  Saves the item which was dropped by getting the class
    let dragItem = document.querySelector('.item.dragging');

    /*  
        Check if there is an item on the selected area
        All the events of the object will be transfered with
        Also avoid that 2 itens take the same place 
    */
    if(e.currentTarget.querySelector('.item') === null){
        //  appendChild go to the object and insert an item into the object at the end
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }

};

//  Functions Neutral Area
function dragOverNeutral(e){
    e.preventDefault();
    e.currentTarget.classList.add('hover');
};

function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e){
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

//  Logic Funcions
function updateAreas(){
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });

    //  Correct Sequence
    if(areas.a === '1' && areas.b === '2' && areas.c === '3'){
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }

};
