import React from "react";
import { View, Text } from "react-native";
import { Battery, Wifi, CheckCircle } from "lucide-react-native";

// Define the props interface
interface SystemStatusProps {
    chanceOfFire: number;
    spectralAnalysis: string;
    smokeStatus: string;
    temperature: number;
    humidity: number;
    batteryLevel: number;
    wifiStatus: string;
}

const SystemStatus: React.FC<SystemStatusProps> = ({
                                                       chanceOfFire,
                                                       spectralAnalysis,
                                                       smokeStatus,
                                                       temperature,
                                                       humidity,
                                                       batteryLevel,
                                                       wifiStatus,
                                                   }) => {
    // Function to determine the color based on the chance of fire
    const getColor = (chance: number) => {
        if (chance < 30) {
            return "#10b981"; // Green
        } else if (chance >= 30 && chance < 70) {
            return "#fbbf24"; // Yellow
        } else {
            return "#ef4444"; // Red
        }
    };

    // Function to determine the status based on the chance of fire
    const getStatus = (chance: number) => {
        if (chance < 30) {
            return "Normal";
        } else if (chance >= 30 && chance < 70) {
            return "Warning";
        } else {
            return "Danger";
        }
    };

    const color = getColor(chanceOfFire);
    const status = getStatus(chanceOfFire);

    return (
        <View className="p-4 bg-white rounded-lg">
            <Text className="text-2xl mb-6 text-gray-800 font-bold" >
                Status of System
            </Text>

            {/* Main Container */}
            <View className="space-y-6">
                {/* Top Section */}
                <View className="flex-row space-x-12 mb-3">
                    {/* Dynamic Color Box - Chance of Fire */}
                    <View style={{ backgroundColor: color }} className="w-24 h-24 rounded-lg justify-center items-center mr-2.5">
                        <Text className="text-3xl font-bold text-white" style={{ fontFamily: "JakartaExtraBold" }}>
                            {chanceOfFire}%
                        </Text>
                        <Text className="text-xs text-white text-center" style={{ fontFamily: "JakartaMedium" }}>
                            Chance of Fire
                        </Text>
                    </View>

                    {/* Analysis Section - Spectral and Smoke */}
                    <View className="flex-1 border border-gray-200 rounded-lg p-4 justify-between h-24">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-gray-600 text-sm" style={{ fontFamily: "JakartaMedium" }}>
                                Spectral Analysis
                            </Text>
                            <View className="flex-row items-center">
                                <Text style={{ color, fontFamily: "JakartaSemiBold" }} className="text-sm mr-1">
                                    {status}
                                </Text>
                                <CheckCircle color={color} size={16} />
                            </View>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-gray-600 text-sm" style={{ fontFamily: "JakartaMedium" }}>
                                Smoke
                            </Text>
                            <View className="flex-row items-center">
                                <Text style={{ color, fontFamily: "JakartaSemiBold" }} className="text-sm mr-1">
                                    {status}
                                </Text>
                                <CheckCircle color={color} size={16} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Bottom Section */}
                <View className="flex-row justify-between">
                    {/* Temperature and Humidity */}
                    <View className="w-[50%] border border-gray-200 rounded-lg p-4 justify-between h-24">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-gray-600 text-sm" style={{ fontFamily: "JakartaMedium" }}>
                                Temperature
                            </Text>
                            <Text style={{ color, fontFamily: "JakartaSemiBold" }} className="text-sm">
                                {temperature}°C
                            </Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-gray-600 text-sm" style={{ fontFamily: "JakartaMedium" }}>
                                Humidity
                            </Text>
                            <Text style={{ color, fontFamily: "JakartaSemiBold" }} className="text-sm">
                                {humidity}%
                            </Text>
                        </View>
                    </View>

                    {/* Battery and WiFi - Divided into 2 separate boxes */}
                    <View className="w-[48%] flex-row justify-between">
                        {/* Battery Box */}
                        <View className="w-[46%] border border-gray-200 rounded-lg p-4 justify-center items-center h-24">
                            <Battery color={color} size={20} />
                            <Text style={{ color, fontFamily: "JakartaMedium" }} className="text-xs mt-1">
                                {batteryLevel}%
                            </Text>
                        </View>

                        {/* WiFi Box */}
                        <View className="w-[50%] border border-gray-200 rounded-lg p-4 justify-center items-center h-24">
                            <Wifi color={color} size={20} />
                            <Text style={{ color,fontFamily: "JakartaMedium" }} className="text-xs text-center mt-1">
                                {wifiStatus}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SystemStatus;
