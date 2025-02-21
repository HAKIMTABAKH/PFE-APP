import { Stack } from "expo-router";
import { Appearance } from 'react-native';
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

const Layout = () => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setColorScheme(colorScheme);
        });

        return () => subscription.remove();
    }, []);

    return (
        <>
            <StatusBar
                backgroundColor={colorScheme === 'dark' ? '#000000' : '#FFFFFF'}
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
            />
            <Stack
                screenOptions={{
                    // Ensure the content doesn't overlap with the StatusBar
                    contentStyle: { paddingTop: 0 ,
                    backgroundColor: colorScheme === 'dark' ? '#000000' : '#FFFFFF',},
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="mappage"  options={{
                    headerTitle: 'Node Information',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }} />
                <Stack.Screen
                    name="aichatpage"
                    options={{headerShown: false }} />


            </Stack>
        </>
    );
};

export default Layout;