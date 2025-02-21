import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';


const Layout = () => {
    return (
        <>
            <StatusBar hidden={true} />
            <View style={{ flex: 1 }}>
                <Stack>
                    <Stack.Screen name="welcome" options={{ headerShown: false }} />
                    <Stack.Screen name="sign-up" options={{ headerShown: false }} />
                    <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                </Stack>
            </View>
        </>
    );
};

export default Layout;