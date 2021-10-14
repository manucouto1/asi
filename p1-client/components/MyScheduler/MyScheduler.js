import React, { Component } from 'react';


class Scheduler extends Component {

  constructor(props) {
    super(props);

    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
        const {DayPilot} = require('daypilot-pro-react')
        const lunes = DayPilot.Date.today().firstDayOfWeek().addDays(1)

        this.state = {
            locale: "es-es",
            timeHeaders: [{"groupBy":"Day","format":"ddd"}],
            scale: "Day",
            cellWidthSpec: "Auto",
            rowMinHeight: 50,
            days: 7,
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
                // if event object doesn't specify "bubbleHtml" property 
                // this onLoad handler will be called to provide the bubble HTML
                args.html = "Event details";
                }
            }),
            treeEnabled: true,
        };
    }
}

    componentDidMount() {

        // load resource and event data
        this.setState({
        resources: [
            {
                "name": "9:00 - 10:30",
                "id": "ma1",
                "expanded": false,
                "children": [
                  {
                    "name": "Ingles C1",
                    "id": "IngC1"
                  },
                  {
                    "name": "Aleman B2",
                    "id": "AleB2"
                  }
                ]
              },
              {
                "name": "10:30 - 12:00",
                "id": "ma2",
                "expanded": false,
                "children": [
                  {
                    "name": "Frances B1",
                    "id": "FraB1"
                  },
                  {
                    "name": "Ingles B1",
                    "id": "IngB1"
                  }
                ]
              },
              {
                "name": "12:00 - 13:30",
                "id": "ma3",
                "expanded": false,
                "children": [
                  {
                    "name": "Frances B1",
                    "id": "FraB1"
                  },
                  {
                    "name": "Ingles B1",
                    "id": "IngB1"
                  }
                ]
              },
              {
                "name": "",
                "id": "med",
                "expanded": false,
              },
              {
                "name": "15:30 - 17:00",
                "id": "tar1",
                "expanded": false,
                "children": [
                  {
                    "name": "Frances B1",
                    "id": "FraB1"
                  },
                  {
                    "name": "Ingles B1",
                    "id": "IngB1"
                  }
                ]
              },
              {
                "name": "17:00 - 18:30",
                "id": "tar2",
                "expanded": false,
                "children": [
                  {
                    "name": "Frances B1",
                    "id": "FraB1"
                  },
                  {
                    "name": "Ingles B1",
                    "id": "IngB1"
                  }
                ]
              },
              {
                "name": "18:30 - 20:00",
                "id": "tar3",
                "expanded": false,
                "children": [
                  {
                    "name": "Frances B1",
                    "id": "FraB1"
                  },
                  {
                    "name": "Ingles B1",
                    "id": "IngB1"
                  }
                ]
              }
        ],
        events: [
          
        ]
        });

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
