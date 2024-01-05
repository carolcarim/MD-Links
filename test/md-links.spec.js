/* eslint-disable no-undef */
const { mdLinks } = require("../index.js");
const fs = require("fs"); // Modulo fs

// Pruebas para el archivo index.js

describe("mdLinks", () => {
  it("should reject with an error message when the path is incorrect", async () => {
    // Arrange
    const incorrectPath = "/path/not/existing";

    // Act & Assert
    await expect(mdLinks(incorrectPath)).rejects.toEqual(
      "La ruta es incorrecta."
    );
  });

  it("should resolve with an array of links when the path is correct", async () => {
    const correctPath = "docs/02-milestone.md";
    const result = await mdLinks(correctPath);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should reject with an error when readFileContent fails", async () => {
    const pathWithReadError = "path/with/read/error.md";
    const errorMessage = "La ruta es incorrecta.";

    // Espiamos y simulamos un error durante la lectura del archivo
    jest.spyOn(fs, "readFileSync").mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act & Assert
    await expect(mdLinks(pathWithReadError)).rejects.toEqual(errorMessage);

    // Restauramos la implementación original después de la prueba
    fs.readFileSync.mockRestore();
  });
});
