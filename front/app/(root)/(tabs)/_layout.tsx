import { View, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { icons } from '@/constants';

// Centered Tab Icon Component
// @ts-ignore
const TabIcon = ({ source, focused }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
            source={source}
            resizeMode="contain"
            style={{
                width: 28, // Icon size
                height: 28, // Icon size
                tintColor: focused ? '#FE5A24' : '#B0B3B8', // Active/Inactive colors
            }}
        />
    </View>
);

// Messenger-Style Bottom Tab Bar
const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#FE5A24",
                tabBarInactiveTintColor: "#B0B3B8",
                tabBarShowLabel: true, // Hide labels
                tabBarStyle: {
                    backgroundColor: "#FFFFFF", // White background
                    borderTopWidth: 0.5,
                    borderTopColor: "#E4E6EB", // Light border
                    height: 60, // Fixed height
                    paddingBottom: 5, // Ensures icons are centered
                    paddingTop: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
            }}
        >

            {/* Home */}
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.home} focused={focused} />
                    ),
                }}
            />

            {/* History */}
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.list} focused={focused} />
                    ),
                }}
            />

            {/* Chat */}
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.chat} focused={focused} />
                    ),
                }}
            />

            {/* Profile */}
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.profile} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
