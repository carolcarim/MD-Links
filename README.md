<h1>Extractor de Enlaces desde Archivos Markdown.</h1>

¡Bienvenid@ al Extractor de Enlaces! Este proyecto te proporciona una librería en Node.js que simplifica el análisis de enlaces dentro de archivos Markdown. 
Tienes dos opciones para aprovechar esta herramienta: como un módulo que puedes integrar en tus proyectos o como una interfaz de línea de comandos (CLI) para un acceso directo desde tu terminal.

<h3>Instalación</h3>

Puedes instalar esta librería utilizando NPM (Node Package Manager). Simplemente ejecuta el siguiente comando en tu terminal:

       npm install -g coralcarim-mdlinks

       El flag -g instala el paquete de manera global, lo que permite usar el comando md-links desde cualquier ubicación en tu sistema.

<h3>Uso</h3>

· Como Módulo en Proyectos

       const extractor = require('coralcarim-mdlinks');

       const filePath = 'ruta/del/archivo.md';


· Como Interfaz de Línea de Comandos (CLI)

       mdlinks ruta/del/archivo.md 
       mdlinks ruta/del/archivo.md --validate
       mdlinks ruta/del/archivo.md --stats
       mdlinks ruta/del/archivo.md --validate --stats

<h3>Contribuciones</h3>

¡Las contribuciones son bienvenidas! Si encuentras errores o mejoras posibles, no dudes en abrir un problema o enviarme un pull request.

Espero que esta herramienta haga tu experiencia de desarrollo más eficiente y agradable, ¡Feliz codificación! 🚀


<h3>Creado por Carol Rubilar del Alcázar ©</h3>