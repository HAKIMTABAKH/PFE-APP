import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

const MyMap = ({ onMarkerClick }) => {
    const [fireAlerts, setFireAlerts] = useState([]);

    useEffect(() => {
        const loadFireAlerts = async () => {
            try {
                const storedAlerts = await AsyncStorage.getItem('fireAlerts');
                if (storedAlerts) {
                    setFireAlerts(JSON.parse(storedAlerts));
                }
            } catch (error) {
                console.error('Failed to load fire alerts', error);
            }
        };

        loadFireAlerts();
    }, []);

    // JavaScript code injected into the WebView to initialize the Leaflet map
    const injectedJS = `
        document.addEventListener("DOMContentLoaded", function() {
            var map = L.map('map').setView([33.8, 10.9], 10);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Default test marker
            L.marker([33.8125, 10.9933]).addTo(map)
                .bindPopup('Test Marker')
                .openPopup();

            // Fire alert markers
            ${fireAlerts
        .map(
            (alert) => `
                        var marker = L.marker([${alert.latitude}, ${alert.longitude}]).addTo(map)
                            .bindPopup('<b>${alert.intensity}</b><br>Radius: ${alert.radius} meters')
                            .on('click', function() {
                                // Send marker data to React Native
                                window.ReactNativeWebView.postMessage(JSON.stringify(${JSON.stringify(alert)}));
                            });

                        L.circle([${alert.latitude}, ${alert.longitude}], {
                            color: 'red',
                            fillColor: '#f03',
                            fillOpacity: 0.5,
                            radius: ${alert.radius}
                        }).addTo(map);
                    `
        )
        .join('\n')}
        });
    `;

    return (
        <View style={{ flex: 1 }}>
            <WebView
                originWhitelist={['*']}
                source={{
                    html: `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Leaflet Map</title>
                            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
                            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                        </head>
                        <body style="margin:0">
                            <div id="map" style="width: 100vw; height: 100vh;"></div>
                            <script>${injectedJS}</script>
                        </body>
                        </html>
                    `,
                }}
                onMessage={(event) => {
                    // Handle marker click event
                    const alert = JSON.parse(event.nativeEvent.data);
                    if (onMarkerClick) {
                        onMarkerClick(alert); // Call the callback function
                    }
                }}
            />
        </View>
    );
};

export default MyMap;