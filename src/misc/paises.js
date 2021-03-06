export const countryList = [
	"Afganistán",
	"Albania",
    "Alemania",
	"Algeria",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antártida",
	"Antigua y Barbuda",
    "Arabia Saudita",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaiyán",
	"Bahamas",
	"Baréin",
	"Bangladesh",
	"Barbados",
	"Bélgica",
	"Belice",
	"Benín",
	"Bermudas",
	"Bhután",
    "Bielorrusia",
	"Bolivia",
	"Bosnia y Herzegovina",
	"Botsuana",
	"Brasil",
	"Brunéi",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Camboya",
	"Camerún",
	"Canadá",
    "Caribe Neerlandés",
    "Catar",
	"Chad",
	"Chile",
	"China",
    "Chipre",
    "Ciudad del Vaticano",
	"Colombia",
	"Comoras",
    "Corea del Norte",
    "Corea del Sur",
    "Costa de Marfil",
	"Croacia",
	"Cuba",
	"Curazao",
	"Dinamarca",
	"Dominica",
	"Ecuador",
	"Egipto",
	"El Salvador",
    "Emiratos Árabes Unidos",
	"Eritrea",
    "Eslovaquia",
	"Eslovenia",
    "España",
    "Estados Federados de Micronesia",
    "Estados Unidos de América",
	"Estonia",
	"Esuatini",
	"Etiopía",
	"Islas Feroe",
    "Filipinas",
	"Finlandia",
    "Fiyi",
	"Francia",
	"Gabón",
	"Gambia",
	"Georgia",
	"Ghana",
	"Gibraltar",
    "Granada",
	"Grecia",
    "Groenlandia",
	"Guadalupe",
	"Guam",
	"Guatemala",
    "Guayana Francesa",
	"Guernsey",
	"Guinea",
	"Guinea-Bisáu",
    "Guinea Ecuatorial",
	"Guyana",
	"Haití",
	"Honduras",
	"Hong Kong",
	"Hungría",
	"India",
	"Indonesia",
	"Irán",
	"Irak",
	"Irlanda",
    "Isla Bouvet",
    "Isla de Man",
    "Isla de Navidad",
    "Isla Norfolk",
    "Islandia",
    "Islas Caimán",
    "Islas Cocos (Keeling)",
    "Islas Cook",
    "Islas Georgias del Sur y Sandwich del Sur",
    "Islas Heard y McDonald",
    "Islas Malvinas",
    "Islas Marianas del Norte",
    "Islas Marshall",
    "Islas Pitcairn",
    "Islas Salomón",
    "Islas Turcas y Caicos",
    "Islas Ultramarinas Menores de Estados Unidos",
    "Islas Vírgenes Británicas",
	"Islas Vírgenes de los Estados Unidos",
	"Israel",
	"Italia",
	"Jamaica",
	"Japón",
	"Jersey",
	"Jordania",
	"Kazajistán",
	"Kenia",
    "Kirguistán",
	"Kiribati",
	"Kuwait",
	"Laos",
	"Lesoto",
    "Letonia",
    "Líbano",
	"Liberia",
	"Libia",
	"Liechtenstein",
	"Lituania",
	"Luxemburgo",
	"Macao",
    "Macedonia del Norte",
	"Madagascar",
    "Malasia",
	"Malaui",
	"Maldivas",
	"Malí",
	"Malta",
    "Marruecos",
	"Martinica",
    "Mauricio",
	"Mauritania",
	"Mayotte",
	"México",
	"Moldavia",
	"Mónaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Mozambique",
	"Myanmar (Birmania)",
	"Namibia",
	"Nauru",
	"Nepal",
	"Nicaragua",
	"Níger",
	"Nigeria",
	"Niue",
	"Noruega",
    "Nueva Caledonia",
	"Nueva Zealand",
	"Omán",
    "Países Bajos",
	"Pakistán",
	"Palaos",
	"Palestina",
	"Panamá",
	"Papúa Nueva Guinea",
	"Paraguay",
	"Perú",
    "Polinesia Francesa",
	"Polonia",
	"Portugal",
	"Puerto Rico",
    "Reino Unido",
    "República Centroafricana",
    "República Checa",
    "República del Congo",
    "República Democrática del Congo",
    "República Dominicana",
	"Rumanía",
	"Rusia",
	"Ruanda",
	"Reunión",
    "Sahara Occidental",
	"San Bartolomé",
    "San Cristóbal y Nieves",
    "San Martín (Francia)",
    "San Martín (Países Bajos)",
    "San Pedro y Miquelón",
    "San Vincente y las Granadinas",
	"Santa Elena, Ascensión y Tristán de Acuña",
	"Santa Lucía",
    "Santo Tomé y Príncipe",
	"Samoa",
    "Samoa Americana",
	"San Marino",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leona",
	"Singapur",
    "Siria",
	"Somalia",
    "Sri Lanka",
    "Sudán",
	"Sudán del Sur",
    "Suecia",
    "Suiza",
	"Surinam",
	"Svalbard y Jan Mayen",
    "Sudáfrica",
    "Tailandia",
	"Taiwán",
	"Tayikistán",
	"Tanzania",
    "Territorio Británico del Océano Índico",
    "Tierras Australes y Antárticas Francesas",
	"Timor Oriental",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad y Tobago",
	"Túnez",
	"Turquía",
	"Turkmenistán",
	"Tuvalu",
    "Ucrania",
	"Uganda",
	"Uruguay",
	"Uzbekistán",
	"Vanuatu",
	"Venezuela",
	"Vietnam",
	"Wallis y Futuna",
	"Yemen",
    "Yibuti",
	"Zambia",
	"Zimbabwe"
];

export function value_label(array){
    let result = []
    for (let i = 0; i < array.length; i++){
        result[i] = {value: array[i], label: array[i]}
    }
    return result
}