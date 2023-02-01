"use strict";
// через одномерный массив

//переменные
let mainArray = [1, 1, 1, 2, 1, 3, 1, 4, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9]; //массив где хранятся числа и нули
let isSelected = false; //есть ли выбранная ячейка

let numSelected; //выбранное первым число
let idSelected; //id числа = номер в массиве

let numSelected1; //выбранное вторым число
let idSelected1; //id второго числа = номер в массиве

let nextArray = []; //массив с актуального поля
let arrIndex = 0;
//let lastIndex = mainArray.length - 1;
//let oldIndex;

function drawFieldInit() {
    let count = 0;
    for (let i = 0; i < (mainArray.length-1)/9; i++) {

        for (let k = i*9+0; k < i*9+9; k++) {
            let div = document.createElement('div');
            div.className = "blocky";
            div.id = count;
            div.setAttribute("onclick", "addListener(this)");
            div.innerHTML = "<p>" + mainArray[k] + "</p>"; // nextArray[0]

            document.body.append(div);    
            count ++;
        }
        if (i < 1) {
        let br = document.createElement('br');
        document.body.append(br);
        //document.write("<br>");
        }
    }
    //брейк перед кнопкой
    let brbrbr = document.createElement('br');
    brbrbr.id = 'brbrbr';
    document.body.append(brbrbr);
    //делаем кнопку
    let but = document.createElement('input');
    but.type = 'button';
    but.id = 'button';
    but.value = 'Done-zo';
    but.setAttribute("onclick", "nextField()");
    document.body.append(but);


}

/*
function drawFieldInit() {
    for (let i = 0; i < (mainArray.length-1)/9; i++) {
        for (let k = i*9+0; k < i*9+9; k++) {
            //document.write("<div " + "class =" + '"blocky"' + " onclick = 'turnBlack(this)'>" + "<p>" + field[i][k]+ "</p>" + "</div>");
            document.write("<div " + "class =" + '"blocky"' + " id = " + k + 
            " onclick = 'addListener(this)'>" + "<p>" + mainArray[k]+ "</p>" + "</div>");
            //document.write("<div " + "class =" + '"blocky"' + " onclick = this.classList.toggle('del')>" + "<p>" + field[i][k]+ "</p>" + "</div>");
        }
        document.write("<br>");
    }
    document.write("<br id=brbr> <input type=" + "'button'" + "id = 'button'" + "value= " + "'Done-zo'" + "onclick = 'nextField()'" +  "/>")

}
*/
//window.onload = drawFieldInit();
drawFieldInit();


/*
document.write("<br id=brbr> <input type=" + "'button'" + "id = 'button'" + "value= " + "'Done-zo'" + "onclick = 'nextField()'" +  "/>")
formFieldNext()
setBreaks();
*/
function addListener(el) {
    el.addEventListener('click', whatToDo(el));

}

function whatToDo(b) {
    if (isSelected == false) {
        holdThatThought(b); //хз что тут надо в аргументы писать
    }
    else {selectSecond(b);}

}


function holdThatThought(a) {
    a.classList.toggle('selected');

    isSelected = true;
    idSelected = a.id;
    numSelected = mainArray[idSelected];
    //это работает
    //alert(isSelected + " " + idSelected + " " + numSelected)
}

function selectSecond(c) {
    //запуталась
    //у нас есть выбранное число numSelected. надо внешние переменные с координатами - сделали isRow и isCol
    //надо внешние переменные второго числа видимо. Предположим, сделали
        
    idSelected1 = c.id;
    numSelected1 = mainArray[idSelected1];
    if (idSelected1 == idSelected) {
        c.classList.toggle('selected');
        isSelected = false;
    }
    //alert(mainArray[18]);
    else {
    if (checkEq(numSelected, numSelected1) == true || checkTen(numSelected, numSelected1) == true) {
        //alert("сейчас сравним");
        //alert(checkHor(idSelected, idSelected1) + " " + checkVert(idSelected, idSelected1));
        if (checkHor(idSelected, idSelected1) == true || checkVert(idSelected, idSelected1) == true) {
            
            //alert("lets delete"); //работает
        document.getElementById(idSelected).classList.toggle('selected'); //убрали выделение
        console.log("Число1: " + numSelected + " айди1: " + idSelected + "; Число 2: " + numSelected1 + " айди2: " + idSelected1);
        deleteNumber(document.getElementById(idSelected));
        deleteNumber(document.getElementById(idSelected1));
        isSelected = false;
        

        }
        else alert("Между числами что-то есть");
    }
    else alert("выберите другое число");
}
}

function checkEq(a, b) {
    if (a == b) return true;
    else return false;
}

function checkTen(a, b) {
    if (a + b == 10) return true;
    else return false;
}

function checkHor(a, b) {
    //alert("running checkHor");
    let x = parseInt(a);
    let y = parseInt(b);
        if (x+1 == y) return true;
        else if(y+1 == x) return true;
        else if (x < y) {
            for (let i = x+1; i < y; i++) {
                //alert(i + " " + mainArray[i]);
                if (mainArray[i] != null) return false;
            } return true;
        }
        else {
            for (let i = y+1; i < x; i++) {
                if (mainArray[i] != null) return false;
            } return true;
        }

}

function checkVert(a, b) {
    //alert("running checkVert");
    let x = parseInt(a);
    let y = parseInt(b);
    if (x+9 == y) return true;
    else if(y+9 == x) return true;    
    else if ((x-y)%9 == 0) {
    if (x < y) {
        for (let i = x + 9; i + 9 < y; i=i+9) {
            if (mainArray[i] != null) return false;
        } return true;
    }
    else if (x > y) {
        for (let i = y + 9; i + 9 < x; i=i+9) {
            if (mainArray[i] != null) return false;
        } return true;
    }
    }
    else return false;
    }



function deleteNumber(elem) {
    let numberId = elem.id;
    mainArray.splice(numberId, 1, null);
    elem.classList.toggle('del'); //стерли, сделали черным

}

function checkArray(array) {
    return array.some(notEmpty);
}

function notEmpty(x) {
    return x != null;

}

function nextField() {
    //alert('here we go');
    //обнулили nextArray, собрали заново из mainArray без стертых значений
    if (checkArray(mainArray) == false) {
        alert("Ура! Победа!")
    }
    else {
    nextArray.length = 0;
    //oldIndex = lastIndex;
    for (let i = 0; i < mainArray.length; i++) {
        if (mainArray[i] != null) {

            nextArray.push(mainArray[i]);
            //alert(nextArray);
        }
        else continue;


    }
    //alert(nextArray);
    //mainArray.push(nextArray);
    //alert(mainArray);
    //теперь вопрос - как это дописать
    //document.getElementById('button').before(div);
    //alert(document.getElementById('button'));
    formFieldNext();
    setBreaks();
    //alert(nextArray[0]);
    //добавляем в mainArray содержимое nextArray. Вроде выглядит правильно
    for (let i = 0; i < nextArray.length; i++) {
        mainArray.push(nextArray[i]);
        //alert(mainArray);

    }
    
    //alert(mainArray);
    console.log(mainArray);
    }
}


function formFieldNext() {
let numId = mainArray.length - 1;

for (let i = 0; i < nextArray.length; i++) {
        let div = document.createElement('div');
    div.className = "blocky";
    div.setAttribute("onclick", "addListener(this)");
    div.innerHTML = "<p>" + nextArray[i] + "</p>"; // nextArray[0]
    numId = numId + 1; // = 18
    div.id = numId; // = 18

    document.getElementById('brbrbr').before(div);
    //arrIndex = arrIndex+1; //=1
}
}


function setBreaks() {
    /*let insertBreak = document.createElement('br');
    for (let i = Math.trunc((mainArray.length - 1)/9)*9; mainArray.length < i < mainArray.length - 1 + nextArray.length; i = i+9) {
    
        document.getElementById(i).before(insertBreak);         
    }*/
    //alert("starting setbreaks");
    //lastindex уже новый. Надо отдельно хранить старый. Чот дурь какая-то. Да не, вроде старый
    //let brbr = document.createElement('br');
    //document.getElementById('button').before(brbr); 
    //let toNine = //вычислить, сколько осталось до заполнения линии (количество пустых элементов), может быть 0
    //let numRows = //сколько будет полных рядов за исключением неполного первого и неполного последнего
    //let rest = //количество элементов в последнем ряду, может быть 0
    //последний индекс разделить на 9 оставить целое умножить на 9 далее циклом прибавлять 9 пока не вылезет
    //alert((lastIndex + arrIndex));
    // i у нас - это деление последнего индекса без остатка умножить на 9, то есть первый индекс последней 
    //строки mainArray
    // i растет, пока не доедет 
    //alert(mainArray.length + " " + nextArray.length)
    for (let i = Math.trunc((mainArray.length - 1)/9)*9 + 9; i < mainArray.length + nextArray.length; i = i+9) {
        let brbr = document.createElement('br');
        //alert(i);
        document.getElementById(i).before(brbr); 
        //alert("Поставили пробел");

    }
    //let brbrbr = document.createElement('br');
    //document.getElementById('button').before(brbrbr); 
    //почему второй не работает? вторую переменную делать шоле? да, сработало. Дурь.
}

//надо придумать, как "раскликнуть"
//второй раз поле не строится, хз почему. Переписать под большие дивы (no)? - done
//продумать как ставить брейк перед кнопкой, а то из-за него все слетает
//в следующей итерации опять что-то не так

//теперь в третьей итерации что-то не так - перед 46 нет брейка
//теперь оно опять аррэй не ловит
//где-то опять сбилось, почему-то не все копирует. Надо проверять. И вообще глючит
//проверка не всегда правильно срабатывает. надо придумать, что тут консолить
//подумать, как сделать сейв и анду
//при нажатии он сразу отправляет в нулл. Проверить! А, не, если еще раз нажать то он удаляет. - done
//оформить выигрыш. когда пересчитывать? при нажатии на кнопку?
//что-то ломается, если через вторую функцию сразу строить поле. чорт.
//теперь слетает пробел АААААААААААААААААААААА ладно,