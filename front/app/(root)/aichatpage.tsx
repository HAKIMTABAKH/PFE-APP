import React, { useState, useEffect, useRef } from "react";
import {
    View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Animated, Image, Alert
} from "react-native";
import { Send, ChevronLeft, Mic, Zap, Trash2, StopCircle } from "lucide-react-native";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const AiChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isBotTyping, setIsBotTyping] = useState(false);
    const flatListRef = useRef(null);
    const sendButtonScale = useRef(new Animated.Value(1)).current;
    const navigation = useNavigation();
    const typingTimeoutRef = useRef(null);

    // Load chat history from local storage
    useEffect(() => {
        const loadChatHistory = async () => {
            const history = await AsyncStorage.getItem("chatHistory");
            if (history) setMessages(JSON.parse(history));
        };
        loadChatHistory();
    }, []);

    // Save chat history to local storage
    useEffect(() => {
        const saveChatHistory = async () => {
            await AsyncStorage.setItem("chatHistory", JSON.stringify(messages));
        };
        saveChatHistory();
    }, [messages]);

    // Function to handle sending a message
    const handleSendMessage = () => {
        if (inputText.trim().length === 0) return;

        // Add the user's message to the chat
        const userMessage = { id: Date.now(), text: inputText, sender: "user", timestamp: new Date().toLocaleTimeString() };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputText("");

        // Animate the send button
        Animated.sequence([
            Animated.timing(sendButtonScale, {
                toValue: 1.2,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(sendButtonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        // Simulate a bot response after 1 second
        setIsBotTyping(true);
        typingTimeoutRef.current = setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                text: "Hello! How can I assist you today?",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setIsBotTyping(false);
            setQuickReplies(["How are you?", "What can you do?", "Tell me a joke."]);
        }, 1000);
    };

    // Function to stop the bot's typing
    const handleStopTyping = () => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        setIsBotTyping(false);
    };


    // Function to delete the chat
    const deleteChat = () => {
        Alert.alert(
            "Delete Chat",
            "Are you sure you want to delete the chat history?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setMessages([]);
                        await AsyncStorage.removeItem("chatHistory");
                        Alert.alert("Success", "Chat history deleted successfully!");
                    },
                },
            ]
        );
    };

    // Function to handle voice input
    const handleVoiceInput = async () => {
        Speech.speak("Please speak your message", { language: "en" });
        // Add voice recognition logic here (e.g., using expo-speech or a third-party API)
    };

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    // Render each chat message
    const renderMessage = ({ item }) => (
        <View
            style={{
                padding: 12,
                marginVertical: 6,
                borderRadius: 12,
                maxWidth: "75%",
                alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: item.sender === "user" ? "#0286FF" : "#F1F1F1",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
            }}
        >
            <Text style={{ color: item.sender === "user" ? "white" : "black", fontSize: 16 }}>
                {item.text}
            </Text>
            <Text
                style={{
                    color: item.sender === "user" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.5)",
                    fontSize: 12,
                    marginTop: 4,
                    alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
                }}
            >
                {item.timestamp}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    backgroundColor: "#0286FF",
                    padding: 16,
                }}
            >
                <TouchableOpacity onPress={() => navigation?.goBack?.()}>
                    <ChevronLeft size={28} color="white" />
                </TouchableOpacity>
                <Image
                    source={require("@/assets/bot-avatar.png")}
                    style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>AI Assistant</Text>
                    {isBotTyping && (
                        <Text style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.8)" }}>Typing...</Text>
                    )}
                </View>
                <TouchableOpacity onPress={deleteChat} style={{ marginLeft: "auto" }}>
                    <Trash2 size={24} color="#fff" />
                </TouchableOpacity>
            </View>



            {/* Chat Messages */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMessage}
                contentContainerStyle={{ padding: 16 }}
                onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
            />

            {/* Input Field */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#E5E5EA",
                }}
            >
                <TouchableOpacity onPress={handleVoiceInput} style={{ padding: 10 }}>
                    <Mic size={24} color="#0286FF" />
                </TouchableOpacity>
                <TextInput
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message..."
                    placeholderTextColor="#888"
                    style={{
                        flex: 1,
                        padding: 12,
                        backgroundColor: "#F1F1F1",
                        borderRadius: 25,
                        marginRight: 10,
                        fontSize: 16,
                    }}
                />
                {isBotTyping ? (
                    <TouchableOpacity onPress={handleStopTyping} style={{ padding: 10 }}>
                        <StopCircle size={24} color="#FF0000" />
                    </TouchableOpacity>
                ) : (
                    <Animated.View style={{ transform: [{ scale: sendButtonScale }] }}>
                        <TouchableOpacity onPress={handleSendMessage} style={{ padding: 10 }}>
                            <Send size={24} color="#0286FF" />
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </KeyboardAvoidingView>

            <StatusBar backgroundColor="#0286FF" />
        </SafeAreaView>
    );
};

export default AiChatPage;