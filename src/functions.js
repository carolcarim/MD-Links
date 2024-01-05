const { JSDOM } = require("jsdom");
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');
const axios = require('axios'); 

// Validar si la ruta es absoluta
const isAbsolutePath = (route) => path.isAbsolute(route) //retorna un booleano
// Convertir la ruta a absoluta si es relativa
const convertAbsolute = (route) => (isAbsolutePath(route) ? route : path.resolve(route));
// Verificar si la ruta existe
const existRoute = (route) => fs.existsSync(route); 
// Obtener la extensión del archivo
const extensionName = (route) => path.extname(route);

// Verificar si la extensión del archivo es válida
const nameExt = (route) => {
    const validExtensions = [".md", ".mkd", ".mdwn", ".mdown", "mdtxt", "mdtext", ".markdown", ".text"];
    const fileExtension = extensionName(route); 

    return validExtensions.includes(fileExtension) ? true : 'Extensión no válida.'; // Devuelve true si la extensión es válida, de lo contrario, devuelve 'Extensión no válida.'
}

// Leer el contenido del archivo y extraer los enlaces
const readFileContent = (route) => {
    return new Promise((resolve, reject) => { 
        fs.readFile(route, 'utf-8', (err, data) => {
            if (err) {
                reject('El archivo no existe.');
                return;
            }
             resolve(data); // Resolver la promesa con los enlaces extraídos
        });
    });
};

// Declara una función llamada extractLinks que toma dos parámetros: data y file.
const extractLinks = (data, file) => { 
/*     console.log('Lo que recibo:',data, file);
 */    // Verifica si data es una cadena antes de usar marked.parse
    const markdownContent = typeof data === 'string' ? data : '';
    // Convierte el contenido HTML en formato markdown (data) a HTML usando la biblioteca 'marked'.
    const html = marked.parse(markdownContent)
    // Crea un objeto DOM virtual (DOM) utilizando la biblioteca 'jsdom'.
    const dom = new JSDOM(html); 
    // Obtiene todos los elementos <a> con la propiedad href establecida.
    const links = dom.window.document.querySelectorAll("a[href]");
    // Crea un array vacío llamado arrayObjs.
    const arrayObjs = [];
    // Itera sobre cada elemento <a> en nodeListA usando forEach.
    links.forEach((anchor) => {
        // Para cada enlace, crea un objeto y lo agrega al arrayObjs.
        arrayObjs.push({
                href: anchor.getAttribute("href"), // La propiedad href del enlace.
                text: anchor.textContent, // El texto del enlace.
                file, // El valor del parámetro file pasado a la función.
            }
        )
    })
    // Devuelve el arrayObjs que contiene objetos con información de los enlaces.
    return arrayObjs
}

const validateLinks = (extractedLinks) => {
    const linkPromises = extractedLinks.map((link) => {
        return axios
        .head(link.href)
        .then((response) => ({
          ...link,
          status: response.status,
          ok: response.status >= 200 && response.status < 400 ? "ok" : "fail",
        }))
        .catch((error) => ({
          ...link,
          status: error.response ? error.response.status : "N/A",
          ok: "fail",
        }))
    }
    );
  
    return Promise.all(linkPromises);
  };

module.exports = {
    isAbsolutePath,
    convertAbsolute,
    existRoute,
    extensionName,
    nameExt,
    readFileContent,
    extractLinks,
    validateLinks,
};
