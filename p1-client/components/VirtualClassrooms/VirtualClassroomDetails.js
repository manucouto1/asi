import React, { useState, useEffect } from "react";
import { getVirtualClassroom } from "../../api/virtualClassroom";
import VirtualClassroomMessage from "./VirtualClassroomMessage";

const VirtualClassroomDetails = ({ id }) => {
  const [virtualClassroom, setVirtualClassroom] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      if (id !== undefined) {
        const response = await getVirtualClassroom(id);
        setVirtualClassroom(response);
        setLoading(false);
      }
    }
    fetchMyAPI();
  }, [id]);

  return virtualClassroom !== undefined ? (
    <div>
      <h4
        style={{ textAlign: "center", margin: "5%" }}
      >{`${virtualClassroom.grupo.idioma} ${virtualClassroom.grupo.nivel} ${virtualClassroom.grupo.nombre}`}</h4>
      <p style={{ marginLeft: "5%" }}>
        <a>Avisos</a>
      </p>
      <p style={{ marginLeft: "5%" }}>
        <a href="/students/listar_alumnos">Lista de alumnos</a>
      </p>
      <div style={{ marginTop: "5%", marginLeft: "5%" }}>
        {virtualClassroom.avisos.map((x) => {
          return (
            <div style={{ marginBottom: "3%" }}>
              <VirtualClassroomMessage date={x.fecha} message={x.mensaje} />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default VirtualClassroomDetails;
