import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { icons } from "@/constants";
import StatusCard from "@/components/StatusCard";
import SystemStatus from "@/components/SystemStatus";
import Map from "@/components/Map";
import CustomButton from "@/components/CustomButton";

const Home = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const router = useRouter();
    const [isNotificationMenuVisible, setIsNotificationMenuVisible] = useState(false);

    const handleSignOut = () => {
        signOut();
        router.replace("/(auth)/sign-in");
    };
    const onViewDetails = () => {
        router.push("/(root)/mappage");
    }

    const toggleNotificationMenu = () => {
        setIsNotificationMenuVisible((prev) => !prev);
    };

    const notifications = [
        { id: 1, title: "New Ride Available", message: "You have a new ride request." },
        { id: 2, title: "Payment Received", message: "Your payment has been successfully processed." },
        { id: 3, title: "Promotion Alert", message: "Get 50% off on your next ride!" },
    ];

    const sensorData = [
        { value: 24, unit: "°C", label: "Temperature", bgColor: "bg-orange-100", textColor: "text-orange-600" },
        { value: 23, unit: "PM", label: "Air Quality", bgColor: "bg-blue-100", textColor: "text-blue-600" },
        { value: 37, unit: "%", label: "Humidity", bgColor: "bg-green-100", textColor: "text-green-600" },
        { value: 144, unit: "ppm", label: "Smoke Level", bgColor: "bg-gray-200", textColor: "text-gray-800" },
    ];
    // Example dynamic data (can be fetched from a server in the future)
    const systemData = {
        chanceOfFire: 98,
        spectralAnalysis: "Normal",
        smokeStatus: "Normal",
        temperature: 37,
        humidity: 68,
        batteryLevel: 100,
        wifiStatus: "Connected",
    };


    return (
        <SafeAreaView className="bg-white flex-1 ">
            {/* Notification Menu */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isNotificationMenuVisible}
                onRequestClose={toggleNotificationMenu}
            >
                {/* Backdrop Overlay */}
                <Pressable
                    className="flex-1 bg-black/50 justify-end"
                    onPress={toggleNotificationMenu}
                >
                    {/* Notification Content */}
                    <View className="bg-white w-full h-3/4 rounded-t-3xl p-4 shadow-lg">
                        <Text className="text-xl font-bold mb-4">Notifications</Text>
                        {/* Notifications List */}
                        <View>
                            {notifications.map((item) => (
                                <View
                                    key={item.id}
                                    className="flex-row justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                                >
                                    <View>
                                        <Text className="font-medium text-base">{item.title}</Text>
                                        <Text className="text-sm text-gray-500">{item.message}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </Pressable>
            </Modal>

            {/* Main Content */}
            <ScrollView className="flex-1 px-4 "
            showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View className="flex flex-row items-center justify-between my-5">
                    <Text className="text-2xl font-bold">
                        Welcome {user?.firstName || "Guest"} 👋
                    </Text>
                    <View className="flex-row items-center space-x-4">
                        {/* Notification Icon */}
                        <TouchableOpacity
                            onPress={toggleNotificationMenu}
                            className="justify-center items-center w-12 h-12 rounded-full bg-white"
                            accessible={true}
                            accessibilityLabel="Notification Button"
                        >
                            <Image
                                source={icons.notification}
                                className="w-7 h-7"
                                accessible={true}
                                accessibilityLabel="Notification Icon"
                            />
                        </TouchableOpacity>
                        {/* Logout Button */}
                        <TouchableOpacity
                            onPress={handleSignOut}
                            className="justify-center items-center w-12 h-12 rounded-full bg-white"
                            accessible={true}
                            accessibilityLabel="Sign Out Button"
                        >
                            <Image
                                source={icons.out}
                                className="w-7 h-7"
                                accessible={true}
                                accessibilityLabel="Sign Out Icon"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Sensor Cards Section */}
                <View className="flex-row justify-between px-4 mt-4">
                    {/* Combined Temperature & Humidity Card */}
                    <StatusCard
                        value1={24}
                        unit1="°C"
                        label1="Temperature"
                        image1={icons.temperature}
                        value2={37}
                        unit2="%"
                        label2="Humidity"
                        image2={icons.humidity}
                        bgColor="bg-primary-100"
                        textColor="text-black"
                        borderColor="#FED7D7"
                        borderWidth={2}
                        className="w-[48%] h-[200]"
                    />
                    {/* Right Column with Individual Cards */}
                    <View className="w-[48%] space-y-4">
                        {/* Smoke Level Card */}
                        <StatusCard
                            value1={144}
                            unit1="ppm"
                            label1="Smoke Level"
                            image1={icons.smokelevel}
                            bgColor="bg-gray-100"
                            textColor="text-gray-800"
                            borderColor="#D9D9D9"
                            borderWidth={2}
                            className="h-24 m-2"
                        />
                        {/* Air Quality Card */}
                        <StatusCard
                            value1={23}
                            unit1="PM"
                            label1="Air Quality"
                            image1={icons.airquality}
                            bgColor="bg-bluzz-200"
                            textColor="text-gray-800"
                            borderColor="#C3D9FF"
                            borderWidth={2}
                            className="h-24 m-2"
                        />
                    </View>
                </View>

                {/* Node Location Map Section */}
                <View className="flex px-4 mt-4">
                    <Text className="text-2xl font-bold">Nodes Location</Text>
                    <View className="flex mt-4 flex-row items-center rounded-2xl bg-transparent h-[250px] overflow-hidden">
                        <View style={{ borderRadius: 16, overflow: 'hidden', flex: 1 }}>
                            <Map />
                        </View>
                    </View>
                    <CustomButton
                        title="View details"
                        onPress={onViewDetails}
                        className="w-full h-[54px] mt-4"
                    />
                </View>
                {/* System status Section */}
                <View>
                    <SystemStatus
                        chanceOfFire={systemData.chanceOfFire}
                        spectralAnalysis={systemData.spectralAnalysis}
                        smokeStatus={systemData.smokeStatus}
                        temperature={systemData.temperature}
                        humidity={systemData.humidity}
                        batteryLevel={systemData.batteryLevel}
                        wifiStatus={systemData.wifiStatus}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;