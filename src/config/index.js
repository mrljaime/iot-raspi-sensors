import { MeasurementUnit, MeasurementLocation } from "../models/measurement";
import { LED } from "../models/led";
import { DHTSensor } from "../models/dhtSensor";
import { DS18B20Sensor } from "../models/ds18b20Sensor";

const config = require(`./${process.env.NODE_ENV}`).default;
const successLed = new LED(config.successLedGPIO, config.ledBlinkDurationInMs, config.ledBlinkTotalPeriodInMs);
const errorLed = new LED(config.errorLedGPIO, config.ledBlinkDurationInMs, config.ledBlinkTotalPeriodInMs);
const ackLed = new LED(config.ackLedGPIO, config.ledBlinkDurationInMs, config.ledBlinkTotalPeriodInMs);
const dhtIndoorSensor = new DHTSensor(
  config.dhtType,
  config.dhtGPIO,
  MeasurementUnit.degrees,
  MeasurementUnit.relative,
  MeasurementLocation.indoor,
);
const ds18b20OutdoorSensor = new DS18B20Sensor(MeasurementUnit.degrees, MeasurementLocation.outdoor);
const sensors = [dhtIndoorSensor, ds18b20OutdoorSensor];

export default {
  ...config,
  location: {
    latitude: parseFloat(config.latitude),
    longitude: parseFloat(config.longitude),
  },
  successLed,
  errorLed,
  ackLed,
  sensors,
};
