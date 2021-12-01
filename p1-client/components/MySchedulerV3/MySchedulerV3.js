import React, { useEffect, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'
import { createEvent } from '../../api/evento'
import { updateGroup } from '../../api/group'
import { toast } from 'react-toastify'
import useAuth from '../../hooks/useAuth'

export default function Scheduler(props) {
  const { id } = props
  const [resources, setResources] = useState([])
  const [events, setEvents] = useState([])
  const [initDate, setInitDate] = useState()
  const [endDate, setEndDate] = useState()
  const { logout } = useAuth()

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
    var lunes = initDate.firstDayOfWeek().addDays(1)
    var event_list = []

    while (lunes < endDate) {
      for (let x of events) {
        const event = {
          text: x.text + lunes.weekNumber(),
          start: lunes.addTime(x.start_houre).toString(),
          end: lunes.addTime(x.end_houre).toString(),
          resource: x.resource,
        }
        const result = await createEvent(event)
        console.log(result)
        if (result?._id) {
          event_list.push(result)
        } else {
          toast.info('El evento ya existe')
        }
      }
      lunes = lunes.addDays(7)
    }
    const new_group = {
      _id: id,
      eventos: event_list,
    }

    const response = await updateGroup(new_group)

    if (response?._id) {
      toast.success('Eventos añadidos al curso')
    } else {
      toast.error('Ha ocurrido un error, durante la actualización')
    }
  }

  useEffect(() => {
    setResources([
      {
        name: 'Lunes',
        id: 'lun',
        expanded: true,
      },
      {
        name: 'Martes',
        id: 'mar',
        expanded: true,
      },
      {
        name: 'Miercoles',
        id: 'mier',
        expanded: true,
      },
      {
        name: 'Jueves',
        id: 'jue',
        expanded: true,
      },
      {
        name: 'Viernes',
        id: 'vie',
        expanded: true,
      },
      {
        name: 'Sábado',
        id: 'sab',
        expanded: true,
      },
    ])
  }, [])

  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined'
  ) {
    const { DayPilot } = require('daypilot-pro-react')
    const { DayPilotScheduler } = require('daypilot-pro-react')
    const lunes = DayPilot.Date.today().firstDayOfWeek().addDays(1)

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
            start_houre: startHour,
            end_houre: endHour,
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
