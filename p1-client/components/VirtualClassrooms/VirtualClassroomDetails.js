import React, { useState, useEffect } from "react";
import { getVirtualClassroom } from "../../api/virtualClassroom";
import { getMessages } from "../../api/message";
import VirtualClassroomMessage from "./VirtualClassroomMessage";

const VirtualClassroomDetails = ({ id }) => {
  const [virtualClassroom, setVirtualClassroom] = useState();
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      if (id !== undefined) {
        const response = await getVirtualClassroom(id);
        setVirtualClassroom(response);
        const messagesResponse = await getMessages(id);
        setMessages(messagesResponse);
        setLoading(false);
      }
    }
    fetchMyAPI();
  }, [id]);

  return virtualClassroom !== undefined ? (
    <div>
      <h1
        style={{ textAlign: "center", margin: "5%" }}
      >{`${virtualClassroom.grupo.nombre}`}</h1>
      <p style={{ marginLeft: "5%" }}>
        <a>Avisos</a>
      </p>
      <p style={{ marginLeft: "5%" }}>
        <a href="/students/listar_alumnos">Lista de alumnos</a>
      </p>
      <div style={{ marginTop: "5%", marginLeft: "5%" }}>
        <h2>Mensajes</h2>
        {!loading && messages.map((x) => {
          return (
            <div style={{ marginBottom: "3%"}}>
              <VirtualClassroomMessage message={x} setMessages={setMessages} virtualClassroomId={id} />
            </div>
          );
        })}
        {loading && <p>Cargando mensajes...</p>}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default VirtualClassroomDetails;
