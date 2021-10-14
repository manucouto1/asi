import React, { Component } from 'react';


class Scheduler extends Component {

  constructor(props) {
    super(props);

    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
        const {DayPilot} = require('daypilot-pro-react')
        const lunes = DayPilot.Date.today().firstDayOfWeek().addDays(1)

        this.state = {
            locale: "es-es",
            timeHeaders: [{"groupBy":"Hour"}, {"groupBy": "Cell", "format": "mm"}],
            scale: "CellDuration",
            cellDuration: 30,
            businessBeginHour: 6,
            businessEndsHour: 21,
            showNonBusiness: false,
            cellWidthSpec: "Auto",
            // rowMinHeight: 50,
            days: 1,
            startDate: lunes ,
            // days: DayPilot.Date.today().daysInMonth(),
            // startDate: DayPilot.Date.today().firstDayOfMonth(),
            timeRangeSelectedHandling: "Enabled",
            onTimeRangeSelected: async (args) => {
                const dp = args.control;
                const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
                dp.clearSelection();
                if (modal.canceled) { return; }
                dp.events.add({
                start: args.start,
                end: args.end,
                id: DayPilot.guid(),
                resource: args.resource,
                text: modal.result
                });
            },
            eventMoveHandling: "Update",
            onEventMoved: (args) => {
                args.control.message("Event moved: " + args.e.text());
            },
            eventResizeHandling: "Update",
            onEventResized: (args) => {
                args.control.message("Event resized: " + args.e.text());
            },
            eventDeleteHandling: "Update",
            onEventDeleted: (args) => {
                args.control.message("Event deleted: " + args.e.text());
            },
            eventClickHandling: "Disabled",
            eventHoverHandling: "Bubble",
            bubble: new DayPilot.Bubble({
                onLoad: (args) => {
                
                // TODO se puede hacer una consulta en la base de datos que se asocie a este id
                args.html = "<h1> profesor menganito id "+args.source.data.id+"</h1>";
                }
            }),
            treeEnabled: true,
        };
    }
}

    componentDidMount() {
      if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
          const {DayPilot} = require('daypilot-pro-react')
          const lunes = DayPilot.Date.today().firstDayOfWeek().addDays(1)
        // load resource and event data
          this.setState({
            resources: [
              {
                  "name": "Lunes",
                  "id": "lun",
                  "expanded": false,
                  "children": [
                    {
                      "name": "Aula 1",
                      "id": "au1"
                    },
                    {
                      "name": "Aula 2",
                      "id": "au2"
                    }
                  ]
                },
                {
                  "name": "Martes",
                  "id": "ma2",
                  "expanded": false,
                  "children": [
                    {
                      "name": "Aula 1",
                      "id": "au1"
                    },
                    {
                      "name": "Aula 2",
                      "id": "au2"
                    }
                  ]
                },
                {
                  "name": "Miércoles",
                  "id": "ma3",
                  "expanded": false,
                  "children": [
                    {
                      "name": "Aula 1",
                      "id": "au1"
                    },
                    {
                      "name": "Aula 2",
                      "id": "au2"
                    }
                  ]
                },
                {
                  "name": "Jueves",
                  "id": "tar1",
                  "expanded": false,
                  "children": [
                    {
                      "name": "Aula 1",
                      "id": "au1"
                    },
                    {
                      "name": "Aula 2",
                      "id": "au2"
                    }
                  ]
                },
                {
                  "name": "Viernes",
                  "id": "tar2",
                  "expanded": false,
                  "children": [
                    {
                      "name": "Aula 1",
                      "id": "au1"
                    },
                    {
                      "name": "Aula 2",
                      "id": "au2"
                    }
                  ]
                },
                {
                  "name": "Sábado",
                  "id": "tar3",
                  "expanded": false,
                  "children": [
                    {
                      "name": "Aula 1",
                      "id": "au1"
                    },
                    {
                      "name": "Aula 2",
                      "id": "au2"
                    }
                  ]
                }
          ],
          events: [
            {
              "id": 1,
              "resource": "au1",
              "start": lunes.addHours(10),
              "end": lunes.addHours(12),
              "test": "Frase test",
              "text": "Event 1"
            }
          ]
          });
      }

    }

    render() {
        var {...config} = this.state;
        if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
            const{ DayPilotScheduler} = require('daypilot-pro-react')
            return (
                <div>
                    <DayPilotScheduler
                    {...config}
                    ref={component => {
                        this.scheduler = component && component.control;
                    }}
                    />
                </div>
                );
        }
        return (
        <div>
        </div>
        );
    }   
    
}

export default Scheduler;
