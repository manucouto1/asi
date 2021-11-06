import React, { useState, useEffect } from "react";
import { getGroups } from "../../api/group";

const GroupList = () => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState();

  // Effects
  useEffect(() => {
    // Cargamos los grupos
    async function fetchMyAPI() {
      setLoading(true);
      const response = await getGroups();
      setGroups(response);
      setLoading(false);
    }
    fetchMyAPI();
  }, []);

  return (
    <div>
        <p style={{ padding: "10%"}}>
        {groups !== undefined &&
            groups.map((x) => {
            return <p style={{ margin: "5%"}}><a href={1}>{`${x.idioma.nombre} ${x.nivel.codigo} ${x.nombre}`}</a></p>;
            })}
        </p>
    </div>
  );
};

export default GroupList;
