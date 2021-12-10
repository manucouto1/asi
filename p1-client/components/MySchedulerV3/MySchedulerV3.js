import React, { useEffect, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'
import { findGroup } from '../../api/group'
import {
  createEvent,
  updateEvent,
  deleteEvento,
  findEventoByResource,
} from '../../api/evento'
import { updateGroup } from '../../api/group'
import { toast } from 'react-toastify'
import { map } from 'lodash'

export default function Scheduler(props) {
  const { id, old_eventos } = props
  const [resources, setResources] = useState([])
  const [events, setEvents] = useState([])
  const [initDate, setInitDate] = useState()
  const [endDate, setEndDate] = useState()
  const [insertList, setInsertList] = useState([])

  const onInitDateChange = (e, data) => {
    const { DayPilot } = require('daypilot-pro-react')
    const newDateValue = new Date(data.value)
    const aux = new DayPilot.Date(newDateValue)
    setInitDate(aux)
  }

  const onEndDateChange = (e, data) => {
    const { DayPilot } = require('daypilot-pro-react')
    const newDateValue = new Date(data.value)
    const aux = new DayPilot.Date(newDateValue)
    setEndDate(aux)
  }

  const onCalendarSubmit = async (_) => {
    const groupId = id
    if (initDate !== undefined && endDate !== undefined) {
      var lunes = initDate.firstDayOfWeek().addDays(1)
      var list_ev = []

      const { DayPilot } = require('daypilot-pro-react')

      const response_group = await findGroup(groupId)
      if (response_group?.eventos) {
        response_group.eventos.forEach((ev) => deleteEvento(ev._id))

        Promise.all(response_group.eventos).then(async () => {
          var new_week = 1
          while (lunes < endDate) {
            for (let x of events) {
              const start_hour = DayPilot.Date(x.start).getTimePart()
              const end_hour = DayPilot.Date(x.end).getTimePart()
              const new_start = lunes.addTime(start_hour).addHours(1).toString()
              const new_end = lunes.addTime(end_hour).addHours(1).toString()

              const event = {
                text: x.text,
                nombre: `${new_start}_${new_end}_${x.resource}`,
                start: new_start,
                end: new_end,
                week: new_week,
                dayOfWeek: x.dayOfWeek,
                resource: x.resource,
                grupo: groupId,
              }
              console.log(event)
              const result = await createEvent(event)

              if (result?._id) {
                list_ev.push(result)
              } else {
                toast.info('El evento ya existe')
              }
            }
            lunes = lunes.addDays(7)
            new_week += 1
          }

          const new_group = {
            _id: id,
            eventos: map(list_ev, (x) => {
              return x?._id
            }),
          }

          const response = await updateGroup(new_group)

          if (response?._id) {
            toast.success('Eventos añadidos al curso')
          } else {
            toast.error('Ha ocurrido un error, durante la actualización')
          }
        })
      } else {
        toast.error('Somthing terrible happend!!')
      }
    } else {
      toast.error('Asegurate de seleccionar la fecha de inicio y la de fin')
    }
  }

  useEffect(() => {
    setResources([
      {
        name: 'Lunes',
        id: `lun_${id}`,
        expanded: true,
      },
      {
        name: 'Martes',
        id: `mar_${id}`,
        expanded: true,
      },
      {
        name: 'Miercoles',
        id: `mie_${id}`,
        expanded: true,
      },
      {
        name: 'Jueves',
        id: `jue_${id}`,
        expanded: true,
      },
      {
        name: 'Viernes',
        id: `vie_${id}`,
        expanded: true,
      },
      {
        name: 'Sábado',
        id: `sab_${id}`,
        expanded: true,
      },
    ])
    setEvents([...old_eventos])
  }, [])

  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined'
  ) {
    const { DayPilot } = require('daypilot-pro-react')
    const { DayPilotScheduler } = require('daypilot-pro-react')

    const lunes = DayPilot.Date.today().firstDayOfWeek().addDays(2)
    const config = {
      startDate: lunes.toString(),
      resources: resources,
      events: events,
      locale: 'es-es',
      timeHeaders: [{ groupBy: 'Hour' }, { groupBy: 'Cell', format: 'mm' }],
      scale: 'CellDuration',
      cellDuration: 30,
      businessBeginsHour: 8,
      businessEndsHour: 21,
      showNonBusiness: false,
      cellWidthSpec: 'Auto',
      eventClickHandling: 'Enabled',
      eventDeleteHandling: 'Update',

      onEventDelete: (args) => {
        const dp = args.control
        setEvents(dp.events.list)
      },
      onEventMoved: (args) => {
        const dp = args.control
        setEvents(dp.events.list)
      },
      onEventResized: (args) => {
        const dp = args.control
        setEvents(dp.events.list)
      },
      onTimeRangeSelected: (args) => {
        const dp = args.control
        DayPilot.Modal.prompt('New event name', 'Event').then((modal) => {
          if (!modal.result) {
            dp.clearSelection()
            return
          }
          const startHour = args.start.getTimePart()
          const endHour = args.end.getTimePart()
          const startDate = lunes.addTime(startHour).toString()
          const endDate = lunes.addTime(endHour).toString()

          const data = {
            id: DayPilot.guid(),
            text: modal.result,
            start: startDate,
            end: endDate,
            dayOfWeek: args.resource.split('_')[0],
            resource: args.resource,
          }

          dp.clearSelection()
          dp.events.add(data)
          setEvents(dp.events.list)
        })
      },

      treeEnabled: true,
    }

    return (
      <div>
        <Form onSubmit={onCalendarSubmit}>
          <Form.Group widths="equal">
            <SemanticDatepicker
              format="YYYY-mm-DD"
              placeholder="Fecha inicio"
              onChange={onInitDateChange}
            />
            <SemanticDatepicker
              placeholder="Fecha fin"
              onChange={onEndDateChange}
            />
            <Button color="blue" type="submit">
              Generar
            </Button>
          </Form.Group>
        </Form>
        <DayPilotScheduler {...config} />
      </div>
    )
  }

  return <div></div>
}
