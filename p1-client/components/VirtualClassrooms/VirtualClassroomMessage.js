import React from "react";
import moment from "moment";

const VirtualClassroomMessage = ({ author, date, message }) => {
  return (
      <div className="card" style={{ width: "90%"}}>
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <div>
              <p>
                <strong>Enviado por: {`${author}`}</strong>
              </p>
              <strong>Día {moment(date).format("DD/MM/yyyy")}</strong>
              <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default VirtualClassroomMessage;
