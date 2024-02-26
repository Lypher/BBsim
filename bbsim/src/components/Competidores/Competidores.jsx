import React, { useState } from "react";
import "./Competidores.css";

function Competidores() {
  const [nombres, setNombres] = useState(Array(20).fill(""));
  const [resultados, setResultados] = useState([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [indiceMostrado, setIndiceMostrado] = useState(0);

  const handleNombreChange = (index, value) => {
    const nuevosNombres = [...nombres];
    nuevosNombres[index] = value;
    setNombres(nuevosNombres);
  };

  const generarResultados = () => {
    const nombresAleatorios = [...nombres];

    for (let i = nombresAleatorios.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nombresAleatorios[i], nombresAleatorios[j]] = [
        nombresAleatorios[j],
        nombresAleatorios[i],
      ];
    }

    const resultadosOrdenados = nombresAleatorios.map((nombre, index) => ({
      nombre,
      puesto: index + 1,
    }));

    setResultados(resultadosOrdenados.reverse());
    setMostrarResultado(true);
    setIndiceMostrado(0);
  };

  const mostrarSiguienteResultado = () => {
    setIndiceMostrado((prevIndice) => prevIndice + 1);
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

      {mostrarResultado && (
        <div>
          <h2>Puesto {resultados[indiceMostrado].puesto}:</h2>
          <p>{resultados[indiceMostrado].nombre}</p>
          {indiceMostrado < resultados.length - 1 && (
            <button type="button" onClick={mostrarSiguienteResultado}>
              Siguiente
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Competidores;
