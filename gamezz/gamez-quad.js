"use strict";

//переменные
let squareArray = [];
squareArray.length = 100;
//squareArray.length = 100;
let num = 1; //число которое будет печататься на поле
let idFirst;
let idSecond;



//функции
function squareField() {
    let count = 0;
    for (let i = 0; i <100; i++) {
        squareArray.push(null);
        //заполнили массив
        
    }
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let div = document.createElement('div');
            div.className = "blank";
            div.id = count;
            div.setAttribute("onclick", "addListener(this)"); //тааак. а что он запускать будет? надо видимо новые странички вешать!
            //div.innerHTML = "<p>" + "0" + "</p>"; 
            div.innerHTML = "0"; 

            document.body.append(div);    
            count ++;
        }
        let br = document.createElement('br');
        document.body.append(br);
    }

}

function addListener(elem) {
    elem.addEventListener('click', whatNow(elem));
}

function whatNow(x) {
    console.log(typeof(squareArray[x.id]))
    if (typeof(squareArray[x.id]) == 'undefined') {
    console.log("1: " + idFirst + " 2: " + idSecond + " число: " + num);
    if (num == 1) {
        addNumbers(x);
        idFirst = x.id;
    }
    else if (1 < num < 99) {
        idSecond = x.id; // разобраться с последовательностью присвоения idSecond!
        console.log("idFirst " + idFirst + "; idSecond " + idSecond);
        console.log(checkKnight(idFirst, idSecond));
        if (checkKnight(idFirst, idSecond) == true) {
            console.log(Math.abs(idFirst - idSecond));
            addNumbers(x); //поставили число
            idFirst = x.id; //переслали айди в переменную первого айди
        }
        else if (checkKnight(idFirst, idSecond) == false) {
            alert("Сделайте ход конем!");
            //idSecond = idFirst;
        }
        else alert("Что-то не так");

    }
    else if (num == 99) {
        if (checkKnight(idFirst, idSecond) == true) {
            addNumbers(x); 
            alert("Congrats!")
        }
    
    }
    else alert("smtg wrong");
}
else if (typeof(squareArray[x.id]) != 'undefined') {
    x.className = 'blank'; //теоретически выключаем обратно
    x.innerHTML = "<p>" + "0" + "</p>"; //а черт. надо проверить и отключить тогда все следующие!
    //с айди разобраться - должен откатываться. думать!
    delete squareArray[x.id];
}
}

function addNumbers(x) {
    //x.className = 'blocky';
    x.classList.toggle('blacky');//работает
    x.innerHTML = "<p>" + num + "</p>"; 
    squareArray[x.id] = num; //переносим в массив
    num++;
// работает, имена добавляются
}

function checkKnight(x, y) {
    switch(Math.abs(x - y)) {//добавить для другой конфигурации хода
        case 8:
        case 12:
        case 19:
        case 21:
            return true;
            break;
        default: 
        return false;
        break;
    }
    
    /*
    if (Math.abs(x - y) == 8 || 12 || 18 || 22) {
        return true;
    }
    else return false;
    */

}

squareField();