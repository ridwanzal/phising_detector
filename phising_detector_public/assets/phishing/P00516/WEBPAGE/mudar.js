function Mudarestado(el) {
    var display = document.getElementById(el).style.display;

    if(display == "none")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}