import React, { useState } from "react";

function Competidores() {
  const [nombres, setNombres] = useState(Array(20).fill(""));
  const [resultados, setResultados] = useState([]);

  const handleNombreChange = (index, value) => {
    const nuevosNombres = [...nombres];
    nuevosNombres[index] = value;
    setNombres(nuevosNombres);
  };

  const generarResultados = () => {
    const nombresAleatorios = [...nombres];

    // Algoritmo de Fisher-Yates para barajar los nombres
    for (let i = nombresAleatorios.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nombresAleatorios[i], nombresAleatorios[j]] = [
        nombresAleatorios[j],
        nombresAleatorios[i],
      ];
    }

    setResultados(
      nombresAleatorios.map((nombre, index) => ({ nombre, puesto: index + 1 }))
    );
  };

  const handleSubmit = () => {
    generarResultados();
  };

  return (
    <div>
      <form>
        {nombres.map((nombre, index) => (
          <div key={index}>
            <label>{`Participante ${index + 1}: `}</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => handleNombreChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Enviar
        </button>
      </form>

      {resultados.length > 0 && (
        <div>
          <h2>Puestos:</h2>
          <ul>
            {resultados.map((resultado, index) => (
              <li
                key={index}
              >{`${resultado.nombre} - Puesto: ${resultado.puesto}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Competidores;
