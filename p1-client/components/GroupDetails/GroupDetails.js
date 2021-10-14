import React from "react";

const GroupDetails = (props) => {
  return (
    <div>
      Grupo seleccionado:
      {props.query.id}
    </div>
  );
};

export default GroupDetails;
