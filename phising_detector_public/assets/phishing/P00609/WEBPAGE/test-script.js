//меняет картнки планшетов
function showHide1(elementShow, elementsHide) {
    //Если элемент с id-шником elementShow существует
    if (document.getElementById(elementShow)) {
        //Записываем ссылку на элемент в переменную obj
        var obj = document.getElementById(elementShow);
        //Если css-свойство display не block, то:
        if (obj.style.display != "block") {
            obj.style.display = "block"; //Показываем элемент
        }
    }

    for(var i=0; i<elementsHide.length; i++) {
        if (document.getElementById(elementsHide[i])) {
            //Записываем ссылку на элемент в переменную obj
            var obj = document.getElementById(elementsHide[i]);
            //Если css-свойство display не block, то:
            if (obj.style.display != "none") {
                obj.style.display = "none"; //Скрываем элемент
            }
        }
    }
}
//меняет цвета вкладок планшета
function showHide2(elementShow, elementsHide) {
    //Если элемент с id-шником elementShow существует
    if (document.getElementById(elementShow)) {
        //Записываем ссылку на элемент в переменную obj
        var obj = document.getElementById(elementShow);
        //Если css-свойство display не block, то:
        if (obj.style.background != "#53EB02") {
            obj.style.background = "#53EB02"; //Показываем элемент
        }
    }

    for(var i=0; i<elementsHide.length; i++) {
        if (document.getElementById(elementsHide[i])) {
            //Записываем ссылку на элемент в переменную obj
            var obj = document.getElementById(elementsHide[i]);
            //Если css-свойство display не block, то:
            if (obj.style.background != "none") {
                obj.style.background = "none"; //Скрываем элемент
            }
        }
    }
}