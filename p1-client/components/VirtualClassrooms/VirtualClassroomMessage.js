import React from "react";
import moment from "moment";

const VirtualClassroomMessage = ({ message }) => {
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
              <a href={`http://localhost:1337${x.url}`}>{x.name}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualClassroomMessage;
