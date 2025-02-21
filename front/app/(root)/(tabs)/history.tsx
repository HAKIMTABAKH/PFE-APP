import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const History = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("day");
    const [loading, setLoading] = useState({
        temperature: true,
        humidity: true,
        airQuality: true,
        smokeLevel: true,
    });

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 90, 36, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: { borderRadius: 10 },
    };

    // Placeholder data (to be replaced with real database values)
    const chartData = {
        temperature: {
            day: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: [{ data: [20, 25, 18, 27, 22, 26, 30] }] },
            month: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets: [{ data: [20, 22, 24, 26, 27, 30, 28, 25, 23, 21, 19, 18] }] },
            year: { labels: ["2019", "2020", "2021", "2022", "2023", "2024"], datasets: [{ data: [22, 24, 23, 25, 27, 28] }] },
        },
        humidity: {
            day: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: [{ data: [60, 65, 58, 62, 70, 72, 68] }] },
            month: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets: [{ data: [60, 62, 64, 66, 68, 70, 75, 73, 71, 69, 65, 63] }] },
            year: { labels: ["2019", "2020", "2021", "2022", "2023", "2024"], datasets: [{ data: [65, 63, 66, 64, 67, 69] }] },
        },
        airQuality: {
            day: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: [{ data: [30, 35, 40, 38, 42, 37, 45] }] },
            month: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets: [{ data: [30, 32, 35, 37, 38, 40, 42, 39, 37, 36, 34, 33] }] },
            year: { labels: ["2019", "2020", "2021", "2022", "2023", "2024"], datasets: [{ data: [38, 40, 42, 39, 43, 41] }] },
        },
        smokeLevel: {
            day: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: [{ data: [5, 8, 7, 10, 9, 6, 12] }] },
            month: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets: [{ data: [5, 6, 7, 8, 9, 10, 11, 12, 10, 9, 8, 7] }] },
            year: { labels: ["2019", "2020", "2021", "2022", "2023", "2024"], datasets: [{ data: [6, 7, 8, 9, 10, 11] }] },
        },
    };

    useEffect(() => {
        setLoading({
            temperature: true,
            humidity: true,
            airQuality: true,
            smokeLevel: true,
        });

        const timer = setTimeout(() => {
            setLoading({
                temperature: false,
                humidity: false,
                airQuality: false,
                smokeLevel: false,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [selectedPeriod]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
            <Text className="text-2xl font-JakartaBold pb-6">Data Visualization</Text>

            {/* Period Selection */}
            <View style={{ flexDirection: "row", borderRadius: 22, overflow: "hidden", backgroundColor: "#FF5A24", marginBottom: 16 }}>
                {["day", "month", "year"].map((period) => (
                    <TouchableOpacity
                        key={period}
                        onPress={() => setSelectedPeriod(period)}
                        style={{
                            flex: 1,
                            padding: 12,
                            alignItems: "center",
                            backgroundColor: selectedPeriod === period ? "#FF5A24" : "#FFEBE5",
                        }}
                    >
                        <Text style={{ color: selectedPeriod === period ? "#fff" : "#333", fontWeight: "bold" }}>
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {Object.keys(chartData).map((key, index) => (
                    <View key={index} style={{ padding: 16, backgroundColor: "#fff",borderColor:"#B7B7B7",borderWidth:1, borderRadius: 10, marginBottom: 16 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                        {loading[key] ? (
                            <View style={{ justifyContent: "center", alignItems: "center", height: 180 }}>
                                <ActivityIndicator size="large" color="#FF5A24" />
                            </View>
                        ) : (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <BarChart
                                    data={chartData[key][selectedPeriod]}
                                    width={width * 1.5} // Extend width for scrolling
                                    height={180}
                                    yAxisSuffix={key === "temperature" ? "°C" : key === "humidity" ? "%" : key === "airQuality" ? "PM" : "g"}
                                    chartConfig={chartConfig}
                                />
                            </ScrollView>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default History;
