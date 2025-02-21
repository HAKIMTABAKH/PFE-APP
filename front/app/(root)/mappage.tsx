import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    PanResponder,
    Animated,
    Dimensions,
    Easing,
} from 'react-native';
import MyMap from '@/components/Map';
import SystemStatus from '@/components/SystemStatus';
import { MaterialIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHTS = {
    CLOSED: 0,
    HALF: SCREEN_HEIGHT * 0.5,
    THREE_QUARTERS: SCREEN_HEIGHT * 0.75,
    FULL: SCREEN_HEIGHT * 0.9,
};

// Mock data for demonstration
const mockNodes = [
    {
        id: 'NODE-001',
        position: { latitude: 45.5017, longitude: -73.5673 },
        chanceOfFire: 98,
        spectralAnalysis: "Abnormal",
        smokeStatus: "Elevated",
        temperature: 42,
        humidity: 35,
        batteryLevel: 78,
        wifiStatus: "Connected",
        lastUpdate: "2024-03-20T14:30:00Z"
    },
    {
        id: 'NODE-002',
        position: { latitude: 45.5117, longitude: -73.5573 },
        chanceOfFire: 60,
        spectralAnalysis: "Normal",
        smokeStatus: "Normal",
        temperature: 32,
        humidity: 65,
        batteryLevel: 92,
        wifiStatus: "Connected",
        lastUpdate: "2024-03-20T14:29:00Z"
    },
    // Add more nodes as needed
];

const MapPage = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const modalHeight = useRef(new Animated.Value(MODAL_HEIGHTS.CLOSED)).current;
    const startHeight = useRef(MODAL_HEIGHTS.HALF);

    const handleMarkerClick = useCallback((node) => {
        setSelectedNode(node);
        setIsModalVisible(true);
        Animated.timing(modalHeight, {
            toValue: MODAL_HEIGHTS.HALF,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    }, []);

    const closeModal = useCallback(() => {
        Animated.timing(modalHeight, {
            toValue: MODAL_HEIGHTS.CLOSED,
            duration: 250,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start(() => {
            setIsModalVisible(false);
            setSelectedNode(null);
            setScrollEnabled(false);
        });
    }, []);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                startHeight.current = modalHeight._value;
            },
            onPanResponderMove: (_, gestureState) => {
                const newHeight = Math.max(
                    MODAL_HEIGHTS.CLOSED,
                    Math.min(MODAL_HEIGHTS.FULL, startHeight.current - gestureState.dy)
                );
                modalHeight.setValue(newHeight);
                setScrollEnabled(newHeight >= MODAL_HEIGHTS.FULL);
            },
            onPanResponderRelease: (_, gestureState) => {
                const currentHeight = modalHeight._value;
                const velocity = gestureState.vy;

                let targetHeight = MODAL_HEIGHTS.HALF;
                if (velocity > 1 || currentHeight < MODAL_HEIGHTS.HALF) {
                    targetHeight = MODAL_HEIGHTS.CLOSED;
                } else if (currentHeight < MODAL_HEIGHTS.THREE_QUARTERS) {
                    targetHeight = velocity < -0.5 ? MODAL_HEIGHTS.THREE_QUARTERS : MODAL_HEIGHTS.HALF;
                } else {
                    targetHeight = velocity < -0.5 ? MODAL_HEIGHTS.FULL : MODAL_HEIGHTS.THREE_QUARTERS;
                }

                if (targetHeight === MODAL_HEIGHTS.CLOSED) return closeModal();

                Animated.spring(modalHeight, {
                    toValue: targetHeight,
                    velocity: Math.abs(velocity),
                    tension: 50,
                    friction: 8,
                    useNativeDriver: false,
                }).start(() => {
                    setScrollEnabled(targetHeight === MODAL_HEIGHTS.FULL);
                });
            },
        })
    ).current;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
                <MyMap
                    nodes={mockNodes}
                    onMarkerClick={handleMarkerClick}
                />
            </View>

            <Modal
                visible={isModalVisible}
                transparent
                animationType="none"
                onRequestClose={closeModal}
            >
                <Pressable style={styles.modalBackdrop} onPress={closeModal}>
                    <Animated.View
                        style={[styles.modalContent, { height: modalHeight }]}
                        {...panResponder.panHandlers}
                    >
                        <View style={styles.draggableHandle}>
                            <View style={styles.handleBar} />
                        </View>

                        <View style={styles.modalHeader}>
                            <Text style={styles.headerTitle}>Node Details</Text>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                <MaterialIcons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            scrollEnabled={scrollEnabled}
                            showsVerticalScrollIndicator={false}
                        >
                            {selectedNode && (
                                <>
                                    <View style={styles.nodeHeader}>
                                        <Text style={styles.nodeId}>{selectedNode.id}</Text>
                                        <Text style={styles.lastUpdate}>
                                            Last update: {new Date(selectedNode.lastUpdate).toLocaleString()}
                                        </Text>
                                    </View>
                                    <SystemStatus {...selectedNode} />
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>System Overview</Text>
                                        <Text style={styles.projectDescription}>
                                            FireMesh is an innovative forest fire detection system providing real-time monitoring through a decentralized IoT mesh network. Nodes collaborate to detect early signs of wildfires using multi-spectral analysis and environmental sensors.
                                        </Text>
                                    </View>
                                </>
                            )}
                        </ScrollView>
                    </Animated.View>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    mapContainer: {
        flex: 1,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
    },
    draggableHandle: {
        alignSelf: 'center',
        paddingVertical: 8,
    },
    handleBar: {
        width: 48,
        height: 5,
        backgroundColor: '#ddd',
        borderRadius: 4,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    closeButton: {
        padding: 8,
    },
    nodeHeader: {
        marginBottom: 20,
    },
    nodeId: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d2d2d',
        marginBottom: 4,
    },
    lastUpdate: {
        fontSize: 12,
        color: '#666',
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    projectDescription: {
        fontSize: 14,
        lineHeight: 22,
        color: '#444',
    },
    scrollContent: {
        paddingBottom: 40,
    },
});

export default React.memo(MapPage);