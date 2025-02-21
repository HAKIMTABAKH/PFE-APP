import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import Icons

interface StatusCardProps {
    value1: string | number;
    unit1?: string;
    label1: string;
    icon1?: JSX.Element; // JSX element for primary value icon
    image1?: ImageSourcePropType; // PNG image for primary value
    value2?: string | number;
    unit2?: string;
    label2?: string;
    icon2?: JSX.Element; // JSX element for secondary value icon
    image2?: ImageSourcePropType; // PNG image for secondary value
    bgColor?: string;
    borderWidth?: number; // Border width
    borderColor?: string; // Border color
    textColor?: string;
    className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
                                                   value1,
                                                   unit1 = "",
                                                   label1,
                                                   icon1 = <Icon name="thermometer" size={24} />, // Default icon for primary value
                                                   image1, // Custom PNG image for primary value
                                                   value2,
                                                   unit2 = "",
                                                   label2 = "",
                                                   icon2 = <Icon name="water-percent" size={24} />, // Default icon for secondary value
                                                   image2, // Custom PNG image for secondary value
                                                   bgColor = "bg-white",
                                                   textColor = "text-gray-700",
                                                   borderWidth = 1, // Default border width
                                                   borderColor = "border-gray-300", // Default border color
                                                   className = "",
                                               }) => {
    // Determine if it's the Temperature or Humidity card
    const isTemperature = label1 === "Temperature";
    const isHumidity = label1 === "Humidity";

    return (
        <View
            className={`p-4 rounded-xl shadow-md ${bgColor} ${className} items-center`}
            style={{
                borderWidth: borderWidth, // Apply border width
                borderColor: borderColor, // Apply border color
            }}
        >
            {/* Primary Value with Icon or Image */}
            <View className={isTemperature || isHumidity ? "flex-col items-center mb-4" : "flex-row items-center mb-4"}>
                {image1 ? (
                    <Image source={image1} style={{ width: 24, height: 24, marginRight: 8 }} /> // Add marginRight for spacing
                ) : (
                    <View style={{ marginRight: 8 }}>{icon1}</View> // Add marginRight for spacing
                )}
                <View className="items-center">
                    <Text className={`text-lg font-semibold ${textColor} text-center`}>
                        {value1} {unit1}
                    </Text>
                    <Text className="text-sm text-gray-500 text-center">{label1}</Text>
                </View>
            </View>

            {/* Secondary Value with Icon or Image (Optional) */}
            {value2 && (
                <View className={isTemperature || isHumidity ? "flex-col items-center mt-auto" : "flex-row items-center"}>
                    {image2 ? (
                        <Image source={image2} style={{ width: 24, height: 24, marginRight: 8 }} /> // Add marginRight for spacing
                    ) : (
                        <View style={{ marginRight: 8 }}>{icon2}</View> // Add marginRight for spacing
                    )}
                    <View className="items-center">
                        <Text className={`text-lg font-semibold ${textColor} text-center`}>
                            {value2} {unit2}
                        </Text>
                        <Text className="text-sm text-gray-500 text-center">{label2}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default StatusCard;