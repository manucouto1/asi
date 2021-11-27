import React from "react";
import moment from "moment";
import { Button } from "semantic-ui-react";
import { deleteMessage, getMessages } from "../../api/message";

const VirtualClassroomMessage = ({ message, setMessages, virtualClassroomId }) => {
  async function handleDeleteMessage(id) {
    await deleteMessage(id);
    const messagesResponse = await getMessages(virtualClassroomId);
    setMessages(messagesResponse);
  }
  return (
    <div className="card" style={{ width: "90%" }}>
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          <div>
            <p>
              <strong>Enviado por: {`${message.autor}`}</strong>
            </p>
            <strong>
              Día {moment(message.createdAt).format("DD/MM/yyyy")}
            </strong>
            <p style={{ whiteSpace: "pre-wrap" }}>{message.texto}</p>
            {message.archivo.map((x) => (
              <a style={{ marginRight: "1em"}} href={`http://localhost:1337${x.url}`}>{x.name}</a>
            ))}
            {message.autor === sessionStorage.getItem("user_name") && (
              <Button onClick={() => handleDeleteMessage(message.id)}>
                Eliminar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualClassroomMessage;
