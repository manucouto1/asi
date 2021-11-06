import React from "react";
import moment from 'moment';

const VirtualClassroomMessage = ({ date, message }) => {
  return (
    <div>
      <strong>Día {moment(date).format('DD/MM/yyyy')}</strong>
      <p style={{whiteSpace: "pre-wrap"}}>{message}</p>
    </div>
  );
};

export default VirtualClassroomMessage;
