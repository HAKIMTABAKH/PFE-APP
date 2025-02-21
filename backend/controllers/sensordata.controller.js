import SensorData from "../models/sensordata.model.js";

// Add new sensor data
export const addSensorData = async (req, res, next) => {
    try {
        const { nodeId, temperature, humidity, airQuality, smokeLevel, location } = req.body;

        const sensorData = new SensorData({
            nodeId,
            temperature,
            humidity,
            airQuality,
            smokeLevel,
            location,
        });
        await sensorData.save();

        res.status(201).json({ success: true, sensorData });
    } catch (err) {
        next(err);
    }
};

// Get all sensor data
export const getSensorData = async (req, res, next) => {
    try {
        const sensorData = await SensorData.find();
        res.status(200).json({ success: true, sensorData });
    } catch (err) {
        next(err);
    }
};
