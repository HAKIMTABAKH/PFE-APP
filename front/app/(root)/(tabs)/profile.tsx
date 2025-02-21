import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";

const Profile = () => {
    const { user } = useUser();

    // State to manage editable fields
    const [firstName, setFirstName] = useState(user?.unsafeMetadata?.first_name || "");
    const [lastName, setLastName] = useState(user?.unsafeMetadata?.last_name || "");
    const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");
    const [phone, setPhone] = useState(user?.primaryPhoneNumber?.phoneNumber || "");

    // Function to handle profile updates
    const handleUpdateProfile = async () => {
        try {
            // Update user's first name and last name using public metadata
            await user.update({
                unsafeMetadata: {
                    first_name: firstName, // Update first name in metadata
                    last_name: lastName,   // Update last name in metadata
                },
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
            >
                {/* Profile Header */}
                <Text style={styles.header}>My Profile</Text>

                {/* Profile Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl ?? "https://via.placeholder.com/110",
                        }}
                        style={styles.profileImage}
                    />
                </View>

                {/* Editable Profile Fields */}
                <View style={styles.detailsContainer}>
                    <InputField
                        label="First Name"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChangeText={setFirstName}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        editable={true}
                    />

                    <InputField
                        label="Last Name"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChangeText={setLastName}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        editable={true}
                    />

                    <InputField
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        editable={true}
                    />

                    <InputField
                        label="Phone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChangeText={setPhone}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        editable={true}
                    />
                </View>

                {/* Save Button */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={handleUpdateProfile}
                        title="Save Changes"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    profileImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    detailsContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: "#B7B7B7",
        borderWidth: 1,
        marginBottom: 10,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 12,
    },
    input: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        backgroundColor: "#fff",
        fontSize: 14,
        color: "#333",
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default Profile;