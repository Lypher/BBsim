import React, { useState } from "react";

function Competidores() {
  const [participante1, setParticipante1] = useState("");

  const handleInputChange = (event) => {
    setParticipante1(event.target.value);
    console.log(participante1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="participante 1"
        value={participante1}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Competidores;
