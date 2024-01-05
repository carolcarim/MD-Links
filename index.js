const {
  convertAbsolute,
  nameExt,
  readFileContent,
  extractLinks,
  validateLinks,
} = require("./src/functions.js");
const fs = require("fs");

function mdLinks(path, validate = false) {
  return new Promise((resolve, reject) => {
    //Resolve y Reject son callbacks (funciones)
    // Llamado de las funciones del archivo functions.js
    const completePath = convertAbsolute(path);

    if (!fs.existsSync(completePath)) {
      reject("La ruta es incorrecta.");
      return; // Importante agregar un return para salir de la función después del reject
    }

    // Verifica si la extensión del archivo es válida antes de continuar con el procesamiento del archivo
    const extResult = nameExt(completePath);

    if (extResult !== true) {
      reject("Extensión no válida.");
      return;
    }

    // Leer el contenido del archivo
    readFileContent(completePath)
      .then((data) => {
        const linksExtracted = extractLinks(data, completePath);
        console.log('Hay ', linksExtracted.length, ' links en este archivo.');
        if (linksExtracted.length === 0) {
          reject("No se encontraron enlaces."); 
        } else {
          if (!validate) {
            resolve(linksExtracted);
          } else {
            validateLinks(linksExtracted)
            .then((validatedLinks) => {
              resolve(validatedLinks);
            })
            .catch((error) => {
              reject(error);
            });
          }
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  mdLinks,
};
