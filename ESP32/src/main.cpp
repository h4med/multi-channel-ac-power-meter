#include <Arduino.h>
#include <driver/adc.h>
#include "config.h"

#include "EmonLib.h"                   // Include Emon Library


typedef struct {
double power;
double irms;
double Vrms;
double pf;
} Payload;                             // create JeeLabs packet structure

Payload emonSensor[NSENSORS];

EnergyMonitor ct[NSENSORS];

const unsigned long BAUD_RATE=    38400;
const int TIME_BETWEEN_READINGS=  5000;

//http://openenergymonitor.org/emon/buildingblocks/calibration
const float Ical1= 23.6;         // (2000 turns / 82.3 Ohm burden resistor = 24.301)
const float Ical2= 23.5;          //81.9  - 24.42
const float Ical3= 96.6;         //82  - 24.39
const float Ical4= 96.6;          //82.2 - 24.33
const float Ical5= 96.6;         //41.0 - 48.78
const float Ical6= 97.1;          //20.5 - 97.56
float Vcal= 577.5;        // (230V x 13) / (9V x 1.2) = 276.9 - 223.8/.389

const byte Vrms= 228;          // Vrms for apparent power readings (when no AC-AC voltage sample is present)


const float phase_shift=          1.7;
const int no_of_samples=          1480;
const byte no_of_half_wavelengths= 20;
const int timeout=                2000;         // emonLib timeout
const int ACAC_DETECTION_LEVEL=   3000;

const byte LEDpin= 2;              // emonPi LED - on when HIGH
unsigned long last_sample=0;       // Record millis time of last discrete sample
unsigned long now =0;

double vrms;
bool ACAC;
byte CT_count;

void setup() {


  // put your setup code here, to run once:
  #if DEBUG == true
    Serial.begin(115200);
  #endif

  Serial2.begin(115200, SERIAL_8N1, 16,17);
  

  pinMode(LEDpin, OUTPUT); 

  // Setup the ADC
  adc1_config_channel_atten(ADC1_CHANNEL_0, ADC_ATTEN_DB_11);
  adc1_config_channel_atten(ADC1_CHANNEL_1, ADC_ATTEN_DB_11);
  adc1_config_channel_atten(ADC1_CHANNEL_2, ADC_ATTEN_DB_11);
  adc1_config_channel_atten(ADC1_CHANNEL_3, ADC_ATTEN_DB_11);
  adc1_config_channel_atten(ADC1_CHANNEL_4, ADC_ATTEN_DB_11);
  adc1_config_channel_atten(ADC1_CHANNEL_5, ADC_ATTEN_DB_11);
  adc1_config_channel_atten(ADC1_CHANNEL_6, ADC_ATTEN_DB_11);
  adc2_config_channel_atten(ADC2_CHANNEL_0, ADC_ATTEN_DB_11);

  analogReadResolution(12);
  pinMode(ADC_INPUT1, INPUT);
  pinMode(ADC_INPUT2, INPUT);
  pinMode(ADC_INPUT3, INPUT);
  pinMode(ADC_INPUT4, INPUT);
  pinMode(ADC_INPUT5, INPUT);
  pinMode(ADC_INPUT6, INPUT); // Voltage
  pinMode(ADC_INPUT7, INPUT);

  ct[0].current(ADC_INPUT1, Ical1);          // CT ADC channel 1, calibration.  calibration (2000 turns / 82.3 Ohm burden resistor = 24.301)
  ct[0].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift

  ct[1].current(ADC_INPUT2, Ical2);          // CT ADC channel 2, calibration.
  ct[1].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift

  ct[2].current(ADC_INPUT3, Ical3);          // CT ADC channel 3, calibration.
  ct[2].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift
  
  ct[3].current(ADC_INPUT4, Ical4);          // CT ADC channel 4, calibration.
  ct[3].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift

  ct[4].current(ADC_INPUT5, Ical5);          // CT ADC channel 5, calibration.
  ct[4].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift

  ct[5].current(ADC_INPUT7, Ical6);          // CT ADC channel 6, calibration.
  ct[5].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift    
}

void loop() {

  now = millis();

  ct[0].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift
  ct[1].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift
  ct[2].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift
  ct[3].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift
  ct[4].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift
  ct[5].voltage(ADC_INPUT6, Vcal, phase_shift);       // ADC pin, Calibration, phase_shift    

  if ((now - last_sample) > TIME_BETWEEN_READINGS)
  {
    digitalWrite(LEDpin, HIGH);  delay(50); digitalWrite(LEDpin, LOW);

    for(int i=0; i<NSENSORS; i++){
      ct[i].calcVI(no_of_half_wavelengths, timeout);
      emonSensor[i].irms = ct[i].Irms;
      emonSensor[i].power = ct[i].realPower;
      emonSensor[i].pf = ct[i].powerFactor;
    }
    emonSensor[0].Vrms = ct[0].Vrms;
    
    for(int i=0; i<NSENSORS; i++)
    {
      Serial.print(i); Serial.print(":");
      Serial.print(" Irms=");
      Serial.print(emonSensor[i].irms);
      Serial.print(" P=");
      Serial.print(emonSensor[i].power);
      Serial.print(" PF=");
      Serial.println(emonSensor[i].pf);        
    }
    Serial.print("Vrms=");
    Serial.print(emonSensor[0].Vrms);
    Serial.println("");

    for(int i=0; i<NSENSORS; i++)
    {
      Serial2.print(emonSensor[i].irms);
      Serial2.print(",");
      Serial2.print(emonSensor[i].power);
      Serial2.print(",");
      Serial2.print(emonSensor[i].pf);
      Serial2.print(",");      
    }
    Serial2.print(emonSensor[0].Vrms);
    Serial2.println("");

    last_sample = now;    //Record time of sample
    //delay(1000);
  }
}