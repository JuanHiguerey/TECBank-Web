function Get(){
    let inicio = 1;
    let fin = 1000000;

    let aleatorio=inicio+Math.floor(Math.random()*fin);
    return aleatorio;
}

module.exports = {
    Get
 };