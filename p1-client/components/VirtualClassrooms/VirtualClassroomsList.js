import React, { useState, useEffect } from "react";
import { getVirtualClassrooms } from "../../api/virtualClassroom";

const VirtualClassroomsList = () => {
  const [virtualClassrooms, setVirtualClassrooms] = useState();

  // Effects
  useEffect(() => {
    // Cargamos las aulas virtuales
    async function fetchMyAPI() {
      const response = await getVirtualClassrooms();
      setVirtualClassrooms(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div style={{ padding: "2%" }}>
      <h3>Lista de aulas virtuales</h3>
        <p>
        {virtualClassrooms !== undefined &&
            virtualClassrooms.map((x) => {
            return <p style={{ margin: "5%"}}><a href={x.id}>{`${x.grupo.idioma} ${x.grupo.nivel} ${x.grupo.nombre}`}</a></p>;
            })}
        </p>
    </div>
  );
};

export default VirtualClassroomsList;
