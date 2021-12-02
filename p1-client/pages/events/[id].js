import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { findEvento } from "../../api/evento";
import { getStudent } from "../../api/student";
import useAuth from "../../hooks/useAuth";
import BasicLayout from "../../layouts/BasicLayout";
import Seo from "../../components/Seo";

export default function Event() {
  const router = useRouter();
  const [event, setEvent] = useState("");
  const [students, setStudents] = useState([]);
  const { logout } = useAuth();

  // Obtenemos los datos de un evento.
  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const response = await findEvento(router.query.id);
        setEvent(response);
      }
    })();
  }, [router.query.id]);

  async function getStudentById(id) {}

  // Obtenemos todos los alumnos asociados a un evento.
  useEffect(() => {
    if (event && event.grupo && event.grupo.alumnos && students.length === 0) {
      event.grupo.alumnos.forEach((id) => {
        (async () => {
          const response = await getStudent(id);
          setStudents((prevState) => {
            prevState.push(response);
            return prevState;
          });
        })(); //TODO el estado no se actualiza correctamente.
      });
    }
  }, [event]);

  return (
    <BasicLayout>
      <Seo title="Clase" description="Detalles de una clase" />
      {students &&
        students.map((x) => (
          <div>
            <span
              style={{ marginRight: "0.5em" }}
            >{`${x.nombre} ${x.apellido1} ${x.apellido2}`}</span>
            <input type="checkbox" />
          </div>
        ))}
    </BasicLayout>
  );
}
