import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema({
    nodeId: {
        type: String,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    smokeLevel: {
        type: Number,
        required: true,
    },
    airQuality: {
        type: Number,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"], // GeoJSON type for location
            default: "Point",
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    isFireDetected: {
        type: Boolean,
        default: false,
    },
    fireConfidenceLevel: {
        type: Number,
        default: 0,
    },
});

// Index for geospatial queries (e.g., finding nodes near a location)
sensorDataSchema.index({ location: "2dsphere" });

const SensorData = mongoose.model("SensorData", sensorDataSchema, "sensor_data");

export default SensorData;
