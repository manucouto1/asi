import React, { useState } from 'react'
import moment from 'moment'
import { Button } from 'semantic-ui-react'
import { deleteMessage, getMessages } from '../../api/message'
import VirtualClassroomUpdateForm from './VirtualClassroomUpdateForm'
import Link from 'next/link'

const VirtualClassroomMessage = ({
  message,
  setMessages,
  virtualClassroomId,
}) => {
  const [updating, setUpdating] = useState(false)

  async function handleDeleteMessage(id) {
    await deleteMessage(id)
    const messagesResponse = await getMessages(virtualClassroomId)
    setMessages(messagesResponse)
  }

  return (
    <div className="card" style={{ width: '90%' }}>
      <div className="card-body">
        {!updating && (
          <div className="d-flex flex-column align-items-center text-center">
            <div>
              <p>
                <strong>Enviado por: {`${message.autor}`}</strong>
              </p>
              <strong>
                Día {moment(message.createdAt).format('DD/MM/yyyy')}
              </strong>
              <p style={{ whiteSpace: 'pre-wrap' }}>{message.texto}</p>
              {message.archivo.map((x) => (
                <Link
                  key={x._id}
                  style={{ marginRight: '1em' }}
                  href={`http://localhost:1337${x.url}`}
                >
                  {x.name}
                </Link>
              ))}
              {message.autor === sessionStorage.getItem('user_name') && (
                <Button
                  onClick={() => handleDeleteMessage(message.id)}
                  color="error"
                >
                  Eliminar
                </Button>
              )}
              {message.autor === sessionStorage.getItem('user_name') && (
                <Button onClick={() => setUpdating(true)}>Editar</Button>
              )}
            </div>
          </div>
        )}
        {updating && (
          <VirtualClassroomUpdateForm
            messageData={message}
            setUpdating={setUpdating}
          />
        )}
      </div>
    </div>
  )
}

export default VirtualClassroomMessage
