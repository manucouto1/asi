import React, { useEffect, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'
import { createEvent, deleteEvento, findEvento } from '../../api/evento'
import { updateGroup } from '../../api/group'
import { toast } from 'react-toastify'
import { map } from 'lodash'
import useAuth from '../../hooks/useAuth'

export default function Scheduler(props) {
  const { id, old_eventos } = props
  const [resources, setResources] = useState([])
  const [events, setEvents] = useState([])
  const [aux_events, setAuxEvents] = useState([])
  const [initDate, setInitDate] = useState()
  const [endDate, setEndDate] = useState()

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
    if (initDate !== undefined && endDate !== undefined) {
      var lunes = initDate.firstDayOfWeek().addDays(1)
      var list_ev = []

      aux_events.forEach((ev) => deleteEvento(ev._id))

      const { DayPilot } = require('daypilot-pro-react')

      Promise.all(aux_events).then(async () => {
        while (lunes < endDate) {
          for (let x of events) {
            const start_hour = DayPilot.Date(x.start).getTimePart()
            const end_hour = DayPilot.Date(x.end).getTimePart()

            const event = {
              text: x.text,
              nombre: x.text + lunes.weekNumber(),
              start: lunes.addTime(start_hour).addHours(1).toString(),
              end: lunes.addTime(end_hour).addHours(1).toString(),
              resource: x.resource,
            }
            const result = await createEvent(event)
            if (result?._id) {
              list_ev.push(result)
            } else {
              toast.info('El evento ya existe')
            }
          }
          lunes = lunes.addDays(7)
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
      setAuxEvents(list_ev)
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
    setAuxEvents([...old_eventos])
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
      // rowMinHeight: 50,
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
            // start_hour: startHour,
            // end_hour: endHour,
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
