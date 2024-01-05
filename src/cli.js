const { mdLinks } = require('../index.js');

// Obtener los argumentos de la línea de comandos
const args = process.argv.slice(2);

// Verificar si se proporcionó una ruta como argumento
if (args.length === 0) {
  console.error('Por favor, proporciona una ruta como argumento.');
  process.exit(1); // Salir con código de error
}

// Obtener la ruta del argumento
const ruta = args[0];

// Verificar opciones
const validateOptionIndex = args.indexOf('--validate');
const statsOptionIndex = args.indexOf('--stats');

// Determinar si se debe validar y/o mostrar estadísticas
const validate = validateOptionIndex !== -1;
const stats = statsOptionIndex !== -1;

// Llamar a la función mdLinks y manejar la promesa
mdLinks(ruta, validate)
  .then((result) => {
    if (stats) {
      // Mostrar estadísticas si se proporciona la opción --stats
      const totalLinks = result.length;
      const uniqueLinks = new Set(result.map(link => link.href)).size;
      console.log(`Total de links: ${totalLinks}`);
      console.log(`Enlaces únicos: ${uniqueLinks}`);

      if (validate) {
        // Contar enlaces rotos
        const brokenLinks = result.filter(link => link.status !== 200);
        console.log(`Enlaces rotos: ${brokenLinks.length}`);
      }
    } else {
      // Mostrar los enlaces con o sin validación
      console.log("Estos son los links encontrados:", result);
    }
  })
  .catch((error) => {
    console.error('Ocurrió un error:', error);
  });

// node cli.js <path-to-file>
// node cli.js <path-to-file> --validate
// node cli.js <path-to-file> --stats
// node cli.js <path-to-file> --validate --stats
