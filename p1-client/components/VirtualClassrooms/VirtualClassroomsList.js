import React, { useState, useEffect } from 'react'
import { getMyGroups, getGroups, getTeacherGroups } from '../../api/group'

const VirtualClassroomsList = () => {
  const [virtualClassrooms, setVirtualClassrooms] = useState()

  // Effects
  useEffect(() => {
    // Cargamos las aulas virtuales
    async function fetchMyAPI() {
      const role = sessionStorage.getItem('user_role').toLowerCase()
      const response =
        role === 'secretario'
          ? await getGroups()
          : role === 'profesor'
          ? await getTeacherGroups()
          : await getMyGroups()
      console.log(response)
      setVirtualClassrooms(response)
    }
    fetchMyAPI()
  }, [])

  return (
    <div style={{ padding: '2%' }}>
      <h3>Lista de aulas virtuales</h3>
      <p>
        {virtualClassrooms &&
          virtualClassrooms !== undefined &&
          virtualClassrooms.length === 0 && (
            <p>No hay disponible ningún aula virtual</p>
          )}
        {virtualClassrooms &&
          virtualClassrooms !== undefined &&
          virtualClassrooms.map((x) => {
            return (
              <div key={x._id} style={{ margin: '5%', marginTop: '0' }}>
                <a href={x._id}>{`${x.nombre}`}</a>
              </div>
            )
          })}
      </p>
    </div>
  )
}

export default VirtualClassroomsList
