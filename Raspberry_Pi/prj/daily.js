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
          measurement: 'watt_hour_daily',
          fields: {
              watthourdaily: Influx.FieldType.FLOAT
           },
          tags: ['channel']
        }
      ]
  });

  influx.query(`SELECT * FROM watt_hour WHERE "channel" = '1' AND time > now() - 24h`)
  .then(result =>{
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].watthour;
    }
    var wattHour = sum;
    console.log("num: ", num, "sum:", sum, "WatHourDaily: ", wattHour);
    influx.writePoints([
    {
        measurement: 'watt_hour_daily',
        tags: {
        channel: '1'
        },
        fields: { watthourdaily: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
  })


  influx.query(`SELECT * FROM watt_hour WHERE "channel" = '2' AND time > now() - 24h`)
  .then(result =>{
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].watthour;
    }
    var wattHour = sum;
    console.log("num: ", num, "sum:", sum, "WatHourDaily: ", wattHour);
    influx.writePoints([
    {
        measurement: 'watt_hour_daily',
        tags: {
        channel: '2'
        },
        fields: { watthourdaily: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
  })

  influx.query(`SELECT * FROM watt_hour WHERE "channel" = '3' AND time > now() - 24h`)
  .then(result =>{
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].watthour;
    }
    var wattHour = sum;
    console.log("num: ", num, "sum:", sum, "WatHourDaily: ", wattHour);
    influx.writePoints([
    {
        measurement: 'watt_hour_daily',
        tags: {
        channel: '3'
        },
        fields: { watthourdaily: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
  })

  influx.query(`SELECT * FROM watt_hour WHERE "channel" = '4' AND time > now() - 24h`)
  .then(result =>{
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].watthour;
    }
    var wattHour = sum;
    console.log("num: ", num, "sum:", sum, "WatHourDaily: ", wattHour);
    influx.writePoints([
    {
        measurement: 'watt_hour_daily',
        tags: {
        channel: '4'
        },
        fields: { watthourdaily: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
  })

  influx.query(`SELECT * FROM watt_hour WHERE "channel" = '5' AND time > now() - 24h`)
  .then(result =>{
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].watthour;
    }
    var wattHour = sum;
    console.log("num: ", num, "sum:", sum, "WatHourDaily: ", wattHour);
    influx.writePoints([
    {
        measurement: 'watt_hour_daily',
        tags: {
        channel: '5'
        },
        fields: { watthourdaily: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
  })

  influx.query(`SELECT * FROM watt_hour WHERE "channel" = '6' AND time > now() - 24h`)
  .then(result =>{
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].watthour;
    }
    var wattHour = sum;
    console.log("num: ", num, "sum:", sum, "WatHourDaily: ", wattHour);
    influx.writePoints([
    {
        measurement: 'watt_hour_daily',
        tags: {
        channel: '6'
        },
        fields: { watthourdaily: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
  })

