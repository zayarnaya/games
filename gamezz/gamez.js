"use strict";


//надо нарисовать поле. Есть блочки blocky. В них надо засунуть цифры из массива
let field = [
    [1, 1, 1, 2, 1, 3, 1, 4, 1, ],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, ],
];
//alert(field[1][1].toString());
function drawFieldInit() {
    //document.getElementsByClassName("blocky").write="<p>" + field[0][0].toString() + "</p>";
    for (let i = 0; i < 2; i++) {
        for (let k = 0; k < 9; k++) {
            //document.write("<div " + "class =" + '"blocky"' + " onclick = 'turnBlack(this)'>" + "<p>" + field[i][k]+ "</p>" + "</div>");
            document.write("<div " + "class =" + '"blocky"' + " id = " + "'" + i + "-" + k + "'" + 
            " onclick = 'addListener(this)'>" + "<p>" + field[i][k]+ "</p>" + "</div>");
            //document.write("<div " + "class =" + '"blocky"' + " onclick = this.classList.toggle('del')>" + "<p>" + field[i][k]+ "</p>" + "</div>");
        }
        document.write("<br>");
    }
    document.write("<input type=" + "'button'" + "value= " + "'Done-zo'" + "onclick = 'nextField()'" +  "/>")
}
drawFieldInit();

/*
function checkOut() {
    //работает
    let fieldStr = field[0];
    fieldStr.splice(0, 1, null);
    field.splice(0, 1, fieldStr);
    alert(field);

}
checkOut();
*/
/*
function checkHor() {
    //если между выбранным (мы можем получить его координаты) и вторым выбранным только null
    //ааа бля надо же еще второе число выбрать
    // разбираемся с листнером
    if ()
}
*/
function addListener(el) {
    el.addEventListener('click', whatToDo(el));

}


let checkArray = []; //массив, куда собирается field
let lastID = []; //массив, где содержатся координаты последнего элемента field

let idSelected;
let numSelected;
let isSelected = false;
let isRow; //координаты ряда для numSelected, первое число индекса
let isCol; //координаты столбца для numSelected, второе число индекса

let idSelected1;
let numSelected1;
let isRow1; //координаты ряда для numSelected1, первое число индекса
let isCol1; //координаты столбца для numSelected1, второе число индекса

function whatToDo(b) {
    if (isSelected == false) {
        holdThatThought(b); //хз что тут надо в аргументы писать
    }
    else {selectSecond(b);}

}


function holdThatThought(a) {
    a.classList.toggle('selected');
    let numberId = a.id;
    let innerID = numberId.split("-");
    let firstId = innerID[0];
    let secondId = innerID[1];
    numSelected = field[firstId][secondId];
    isSelected = true;
    isRow = firstId;
    isCol = secondId;
    idSelected = numberId;
    //как теперь определить второй клик?
}

function selectSecond(c) {
    //запуталась
    //у нас есть выбранное число numSelected. надо внешние переменные с координатами - сделали isRow и isCol
    //надо внешние переменные второго числа видимо. Предположим, сделали
    let numberId = c.id;
    let innerID = numberId.split("-");
    let firstId = innerID[0];
    let secondId = innerID[1];
    numSelected1 = field[firstId][secondId];
    //isSelected = true;
    isRow1 = firstId;
    isCol1 = secondId;
    idSelected1 = numberId;
    if (checkHor(numSelected, numSelected1) == true) {
        alert("lets delete"); //работает
        document.getElementById(idSelected).classList.toggle('selected'); //убрали выделение
        deleteNumber(document.getElementById(idSelected));
        deleteNumber(document.getElementById(idSelected1));
        //и вот что тут писать, а? А? айди видимо обратно разделывать или вывести в глобальные


    }
    else alert('something is wrong');

}

function formCheckArray() {
    let lastIDRow = field.length-1;
    let lastIDCol = field[lastIDRow].length-1;
    lastID = [lastIDRow, lastIDCol];
    //формируем массив checkArray - последний ряд обрабатываем отдельно!
    for (let i = 0; i<lastIDRow-1; i++) {
        for (let k = 0; k<9; k++) {
            checkArray = checkArray.push(field[i][k]);
        }
    }
    //обрабатываем последний ряд
    for (let k = 0; k < lastIDCol; k++) {
        checkArray = checkArray.push(field[lastIDRow][k]);
    }
    return checkArray;

}

function checkEq(a, b) {

    alert(f + " " + s)
    if (f == s) {
        return true;
    }
    else return false;

}

function checkHor(f, s) {
formCheckArray();
let //запуталась. надо на бумаге


}
/*
function checkVert() {

}*/


function deleteNumber(elem) {
    //вроде работает
    let numberId = elem.id;
    let innerID = numberId.split("-");
    let firstId = innerID[0];
    let secondId = innerID[1];
    //alert(innerID + " " + firstId + " " + secondId);
    let fieldStr = field[firstId];
    fieldStr.splice(secondId, 1, null);
    field.splice(firstId, 1, fieldStr);
    //alert(field);
    elem.classList.toggle('del'); //стерли, сделали черным

}



function nextField() {
    alert('here we go');
    //drawFieldInit();
}
/*
function turnBlack(elem) {
    //не работает
    //let oneSquareId = this.id;
    //alert(elem.id);
    //а так работает только непонятно нахрена нам айди
    elem.classList.toggle('del');


}
*/

 //  document.write("<div " + "class =" + '"blocky"' + ">" + "<p>" + field[0][0]+ "</p>" + "</div>");
