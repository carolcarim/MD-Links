/* eslint-disable no-undef */
const {
  isAbsolutePath,
  convertAbsolute,
  existRoute,
  nameExt,
  readFileContent,
  extractLinks,
  validateLinks,
} = require("../../MD-Links/src/functions.js");


describe("nameExt", () => {
  it("should return true for a valid file extension", () => {
    const filePath = "/path/to/valid-file.md";
    const result = nameExt(filePath);
    expect(result).toBe(true);
  });

  it("should reject with an error message for an invalid file extension", () => {
    const filePath = "/path/to/invalid-file.txt";
    const result = nameExt(filePath);
    expect(result).toEqual("Extensión no válida.");
  });
});


describe("isAbsolutePath", () => {
  it("should return true for absolute paths", () => {
    expect(isAbsolutePath("/absolute/path")).toBe(true);
  });

  it("should return false for relative paths", () => {
    expect(isAbsolutePath("relative/path")).toBe(false);
  });
});

describe("convertAbsolute", () => {
  it("should return the absolute path when the path is absolute", () => {
    expect(
      convertAbsolute(
        "C:/Users/56957/Documents/GitHub/MD-Links/docs/02-milestone.md"
      )
    ).toEqual("C:/Users/56957/Documents/GitHub/MD-Links/docs/02-milestone.md");
  });
  it("should return the absolute path when the path is relative", () => {
    expect(convertAbsolute("docs/02-milestone.md")).toEqual(
      "C:\\Users\\56957\\Documents\\GitHub\\MD-Links\\docs\\02-milestone.md"
    );
  });
});

describe("existRoute", () => {
  it("should return true for an existing route", () => {
    expect(existRoute("docs/05-milestone.md")).toBe(true);
  });

  it("should return false for a non-existing route", () => {
    expect(existRoute("/nonexistent/file.md")).toBe(false);
  });
});

describe("readFileContent", () => {
  it("should reject the promise if the file does not exist", () => {
    const filePath = "nonexistent-file.txt";

    // Llamar a la función y verificar que se rechace la promesa
    return expect(readFileContent(filePath)).rejects.toEqual("El archivo no existe.");
  });
});

describe("nameExt", () => {
  it("should return true for valid file extensions", () => {
    expect(nameExt("file.md")).toBe(true);
  });

  it('should return "Extensión no válida." for invalid file extensions', () => {
    expect(nameExt("file.txt")).toBe("Extensión no válida.");
  });
});

describe("extractLinks", () => {
  it("should return an array of objects when you pass it a data and a file", () => {
    const data =
      "[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers.";
    const file = "docs/02-milestone.md";
    const arrayObjs = [
      {
        href: "https://es.wikipedia.org/wiki/Markdown",
        text: "Markdown",
        file: "docs/02-milestone.md",
      },
    ];
    expect(extractLinks(data, file)).toEqual(arrayObjs);
  });
});

// Pruebas para validateLinks

describe('validateLinks', () => {
  it('should resolve with an array of links with status information', () => {
    const extractedLinks = [
      { href: 'http://example.com', text: 'Example 1' },
      { href: 'http://example.org', text: 'Example 2' },
    ];

    // Se asume que estas URLs retornarán 200 OK y 404 Not Found respectivamente
    return validateLinks(extractedLinks).then((result) => {
      expect(result).toEqual([
        { href: 'http://example.com', text: 'Example 1', status: 200, ok: 'ok' },
        { href: 'http://example.org', text: 'Example 2', status: 404, ok: 'fail' },
      ]);
    });
  });

  it('should reject the promise if any link validation fails', () => {
    const extractedLinks = [
      { href: 'http://example.com', text: 'Example 1' },
    ];

    // Se asume que esta URL retornará un error 500 Internal Server Error
    return expect(validateLinks(extractedLinks)).rejects.toEqual('Link validation failed.');
  });
});
