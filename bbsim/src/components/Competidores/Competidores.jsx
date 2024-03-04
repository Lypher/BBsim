import React, { useState } from "react";
import "./Competidores.css";

function Competidores() {
  const [nombres, setNombres] = useState(Array(20).fill(""));
  const [resultados, setResultados] = useState([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [indiceMostrado, setIndiceMostrado] = useState(0);
  const [eventos, setEventos] = useState([]);

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
    generarEventosAleatorios();
  };

  const generarEventosAleatorios = () => {
    const eventosGenerados = [];

    const tiposDeInteraccion = [
      "se peleó con",
      "se hizo amigo de",
      "le gastó una broma a",
      "tuvo una conversación intensa con",
      "formó una alianza secreta con",
    ];

    for (let i = 0; i < 5; i++) {
      const participanteA = Math.floor(Math.random() * nombres.length);
      const participanteB = Math.floor(Math.random() * nombres.length);
      const tipoInteraccion =
        tiposDeInteraccion[
          Math.floor(Math.random() * tiposDeInteraccion.length)
        ];

      eventosGenerados.push({
        mensaje: `${nombres[participanteA]} ${tipoInteraccion} ${nombres[participanteB]}`,
      });
    }

    setEventos(eventosGenerados);
  };

  const mostrarSiguienteResultado = () => {
    setIndiceMostrado((prevIndice) => prevIndice + 1);
    generarEventosAleatorios(); // Generar nuevas interacciones al hacer clic en "Siguiente"
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

          <h3>Acontecimientos:</h3>
          <ul>
            {eventos.map((evento, index) => (
              <li key={index}>{evento.mensaje}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Competidores;
