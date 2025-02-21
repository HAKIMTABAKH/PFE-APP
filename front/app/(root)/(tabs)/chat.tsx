import React, { useState, useEffect } from "react";
import {
    Text, View, FlatList, TouchableOpacity, TextInput, Image,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Bot } from "lucide-react-native";
import {images} from "@/constants";

const Chat = () => {
    const navigation = useNavigation();
    const navigateToAiChat = () => {
        navigation.navigate("aichatpage");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Text className="text-2xl font-JakartaBold ">Chat</Text>
                <View className="flex-1 h-fit flex justify-center items-center">
                    <Image
                        source={images.message}
                        alt="message"
                        className="w-full h-40"
                        resizeMode="contain"
                    />
                    <Text className="text-3xl font-JakartaBold mt-3">
                        No Messages Yet
                    </Text>
                    <Text className="text-base mt-2 text-center px-7">
                        Start a conversation
                    </Text>
                </View>
            </ScrollView>

            {/* AI Assistant Button */}
            <TouchableOpacity
                className="absolute bottom-10 right-5 bg-[#0286FF] p-3 rounded-full shadow-lg"
                onPress={navigateToAiChat}
            >
                <Bot size={28} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Chat;