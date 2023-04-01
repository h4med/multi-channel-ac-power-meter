//for adding time to console logs
require('console-stamp')(console, { 
  format: ':date(yyyy/mm/dd HH:MM:ss.l)' 
} );

//Database configs
const Influx = require('influx');

const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'emonpi',
    schema: [
      {
        measurement: 'current_sensor',
        fields: { 
            irms: Influx.FieldType.FLOAT,
            realpower: Influx.FieldType.FLOAT,
            powerfactor: Influx.FieldType.FLOAT
         },
        tags: ['channel']
      }
    ]
});

//Serial port setting
const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter');
const port = new SerialPort('/dev/ttyAMA0',{
    baudRate: 115200
});
const parser = port.pipe(new Delimiter({ delimiter: '\r'}))

//GPIOs setting
const Gpio = require('onoff').Gpio; 
var LED_green = new Gpio(17, 'out')
var LED_red = new Gpio(22, 'out')
// var pushButton = new Gpio(10, 'in', 'both');

// pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
//     if (err) { //if an error
//       console.error('There was an error', err); //output error message to console
//     return;
//     }
//     LED_red.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
//     console.log('button pressed')
// });

// Main program, action on serial port reading
parser.on('data', (data)=>{
    LED_green.writeSync(1);

    const dataArray= data.toString().split(",").map( function(item) {
        return parseFloat(item)
    })
    
    for(var chnl=0; chnl<6; chnl++){
      console.log(chnl+1,' - Irms: ', dataArray[chnl*3],', P: ', dataArray[chnl*3+1],', PF: ', dataArray[chnl*3+2])
    }
    console.log('Vrms: ', dataArray[18])
    console.log('--------------------------------------')

    for(var chnl=0; chnl<6; chnl++){
        influx.writePoints([
          {
            measurement: 'current_sensor',
            tags: {
              channel: chnl+1
            },
            fields: { 
              irms: dataArray[chnl*3],
              realpower: dataArray[chnl*3+1],
              powerfactor: dataArray[chnl*3+2]
            }
          },
          ], {
            database: 'emonpi',
            precision: 's',
          })
          .catch(error => {
            console.error(`Error saving data to InfluxDB! ${err.stack}`)
      });
    }

  influx.writePoints([
    {
      measurement: 'voltage_sensor',
      tags: {
        channel: 'voltage'
      },
      fields: { vrm: dataArray[18]}
    }
    ], {
      database: 'emonpi',
      precision: 's',
    })   
    .catch(error => {
      console.error(`Error saving data to InfluxDB! ${err.stack}`)
  });

  LED_green.writeSync(0);
})
