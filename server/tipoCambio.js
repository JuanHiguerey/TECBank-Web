var axios = require('axios');
var querystring = require('querystring');
var DOMParser = require('xmldom').DOMParser;

//Formulario del web service del BCCR
//Necesita registrarse y usar el correo y token enviado al correo.
//Fechas para realizar la consulta
function indicadoresEconomicosBCCR(email, token, fechaInicio, fechaFinal) {
    try {//datos para llenar el formulario del BCCR web service y obtener los datos
        var todayDate = new Date();
        var BCCRurl = 'https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos';
        var payload = {
            FechaInicio: fechaInicio ? fechaInicio : todayDate.getDate()-1+ "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear(),
            FechaFinal: fechaFinal ? fechaFinal : todayDate.getDate()-1 + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear(),
            Nombre: 'N',
            SubNiveles: 'N',
            Indicador: 317,     // indicador de la compra del dolar
            CorreoElectronico: email,
            Token: token,
        };
        var postCompra = axios.post(BCCRurl, querystring.stringify(payload));

        payload.Indicador = 318;    //indicardor venta del dolor

        var postVenta = axios.post(BCCRurl, querystring.stringify(payload));

        payload.Indicador = 333;    //indicador del valor del eur en relacion con el dolar

        var euro = axios.post(BCCRurl, querystring.stringify(payload));

        return axios.all([postCompra, postVenta, euro]).then(axios.spread(function (compra, venta, euro) {
            var compraNode = new DOMParser().parseFromString(compra.data, 'text/xml');
            var ventaNode = new DOMParser().parseFromString(venta.data, 'text/xml'); 
            var euroNode=new DOMParser().parseFromString(euro.data, 'text/xml');
            const dolarCompra=Math.pow(parseFloat(compraNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue).toFixed(2), 1);
            const dolarVenta=Math.pow(parseFloat(ventaNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue).toFixed(2), 1);
            const euroD=Math.pow(parseFloat(euroNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue).toFixed(2), 1);

            return [{
                Nombre: 'Dolar $',
                Compra: dolarCompra,
                Venta: dolarVenta },
                {
                    Nombre: 'Euro €',
                    Compra: (dolarCompra*euroD).toFixed(2),
                    Venta: (dolarVenta*euroD).toFixed(2)
                }
            ];
        }));

    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {indicadoresEconomicosBCCR};