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
          measurement: 'watt_hour',
          fields: { 
              watthour: Influx.FieldType.FLOAT       
           },
          tags: ['channel']
        }
      ]
  });

  influx.query(`SELECT * FROM current_sensor WHERE "channel" = '1' AND time > now() - 1h`)
  .then(result =>{
    console.log('type of result is: ', typeof(result))
    console.log('result is: ', result[0].realpower)
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].realpower;
    }
    var wattHour = sum/num;
    console.log("num: ", num, "sum:", sum, "WatHour: ", wattHour);

    influx.writePoints([
    {
        measurement: 'watt_hour',
        tags: {
        channel: '1'
        },
        fields: { watthour: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })   
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
    
  })

  influx.query(`SELECT * FROM current_sensor WHERE "channel" = '2' AND time > now() - 1h`)
  .then(result =>{
    console.log('type of result is: ', typeof(result))
    console.log('result is: ', result[0].realpower)
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].realpower;
    }
    var wattHour = sum/num;
    console.log("num: ", num, "sum:", sum, "WatHour: ", wattHour);

    influx.writePoints([
    {
        measurement: 'watt_hour',
        tags: {
        channel: '2'
        },
        fields: { watthour: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })   
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
    
  })

  influx.query(`SELECT * FROM current_sensor WHERE "channel" = '3' AND time > now() - 1h`)
  .then(result =>{
    console.log('type of result is: ', typeof(result))
    console.log('result is: ', result[0].realpower)
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].realpower;
    }
    var wattHour = sum/num;
    console.log("num: ", num, "sum:", sum, "WatHour: ", wattHour);

    influx.writePoints([
    {
        measurement: 'watt_hour',
        tags: {
        channel: '3'
        },
        fields: { watthour: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })   
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
    
  })

  influx.query(`SELECT * FROM current_sensor WHERE "channel" = '4' AND time > now() - 1h`)
  .then(result =>{
    console.log('type of result is: ', typeof(result))
    console.log('result is: ', result[0].realpower)
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].realpower;
    }
    var wattHour = sum/num;
    console.log("num: ", num, "sum:", sum, "WatHour: ", wattHour);

    influx.writePoints([
    {
        measurement: 'watt_hour',
        tags: {
        channel: '4'
        },
        fields: { watthour: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })   
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
    
  })

  influx.query(`SELECT * FROM current_sensor WHERE "channel" = '5' AND time > now() - 1h`)
  .then(result =>{
    console.log('type of result is: ', typeof(result))
    console.log('result is: ', result[0].realpower)
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].realpower;
    }
    var wattHour = sum/num;
    console.log("num: ", num, "sum:", sum, "WatHour: ", wattHour);

    influx.writePoints([
    {
        measurement: 'watt_hour',
        tags: {
        channel: '5'
        },
        fields: { watthour: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })   
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
    
  })


  influx.query(`SELECT * FROM current_sensor WHERE "channel" = '6' AND time > now() - 1h`)
  .then(result =>{
    console.log('type of result is: ', typeof(result))
    console.log('result is: ', result[0].realpower)
    const num = result.length;
    var sum = 0;
    for(var item = 0; item < num; item++){
        sum += result[item].realpower;
    }
    var wattHour = sum/num;
    console.log("num: ", num, "sum:", sum, "WatHour: ", wattHour);

    influx.writePoints([
    {
        measurement: 'watt_hour',
        tags: {
        channel: '6'
        },
        fields: { watthour: wattHour}
    }
    ], {
        database: 'emonpi',
        precision: 's',
    })   
    .catch(error => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
    
  })