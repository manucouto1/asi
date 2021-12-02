import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { getGroup } from '../../api/group'

const GroupDetails = ({ id }) => {
  const [group, setGroup] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true)
      if (id !== undefined) {
        const response = await getGroup(id)
        setGroup(response)
        setLoading(false)
      }
    }
    fetchMyAPI()
  }, [id])

  return (
    <div>
      {group !== null && group !== undefined && !loading && id != undefined ? (
        <div style={{ padding: '5%' }}>
          {groupDetails(group)}
          <div style={{ marginTop: '5em' }}>
            <Button primary style={{ marginRight: '0.5em', float: 'right' }}>
              Añadir alumno
            </Button>
            <Button secondary style={{ marginRight: '0.5em', float: 'right' }}>
              Editar Grupo
            </Button>
            <Button negative style={{ marginRight: '0.5em', float: 'right' }}>
              Quitar Alumno
            </Button>
          </div>
        </div>
      ) : loading ? (
        <div>Cargando...</div>
      ) : (
        <div>
          <h1>Id user {id} couldt load...</h1>
        </div>
      )}
    </div>
  )
}

export function groupDetails(group) {
  return (
    <div>
      <h3>{group.nombre}</h3>
      <div style={{ marginBottom: '1em' }}>
        <label>{'Idioma: '}</label>
        <span>
          {group.idioma.nombre} {group.nivel.codigo}
        </span>
      </div>
      <div style={{ marginBottom: '1em' }}>
        <p style={{ marginBottom: '0' }}>{'-Profesor: '}</p>
        <span style={{ marginLeft: '1.5em' }}>{group.profesor.nombre}</span>
      </div>
      <div style={{ marginBottom: '1em' }}>
        <p style={{ marginBottom: '0' }}>{'-Horario: '}</p>
        {group.horario.map((x) => {
          return (
            <p key={x._id} style={{ marginBottom: '0', marginLeft: '1.5em' }}>
              {x.weekDay} de {x.startTime} a {x.endTime}
            </p>
          )
        })}
      </div>
      <div style={{ marginBottom: '1em' }}>
        <span>{'-Aula: '}</span>
        <span>{group.aula.nombre}</span>
      </div>
      <div style={{ marginBottom: '1em' }}>
        <table>
          <tr>
            <th style={{ textAlign: 'left' }}>{'-Alumnos: '}</th>
            <th>F</th>
          </tr>
          {group.alumnos.map((x) => {
            return (
              <tr key={x._id}>
                <td style={{ padding: '0 1.5em 0 1.5em' }}>- {x.nombre}</td>
                <td>{x.faltas}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default GroupDetails
