import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import for eye icon
import { InputFieldProps } from "@/types/type";

// Define styles for the focused border and icon alignment
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center", // Center items horizontally
    alignItems: "center", // Align items vertically
    backgroundColor: "#F3F4F6", // Neutral 100
    borderRadius: 999, // Fully rounded
    borderWidth: 1, // Default border width
    borderColor: "#F3F4F6", // Default border color
    paddingHorizontal: 16, // Add horizontal padding for better spacing
    height: 56, // Set a fixed height for consistency
  },
  focusedInputBorder: {
    borderColor: "#FF5A24", // Border color when focused
    borderWidth: 2, // Border width when focused
  },
  iconContainer: {
    marginRight: 16, // Add spacing between the icon and the text input
  },
});

const InputField = ({
                      label,
                      icon,
                      secureTextEntry = false,
                      labelStyle,
                      containerStyle,
                      inputStyle,
                      iconStyle,
                      className,
                      ...props
                    }: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="my-2 w-full">
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
              {label}
            </Text>
            <View
                style={[
                  styles.container,
                  isFocused && styles.focusedInputBorder, // Apply border only when focused
                  containerStyle, // Allow custom styles to override
                ]}
            >
              {icon && (
                  <View style={styles.iconContainer}>
                    <Image source={icon} className={`w-6 h-6 ${iconStyle}`} />
                  </View>
              )}
              <TextInput
                  className={`flex-1 font-JakartaSemiBold text-[15px] ${inputStyle} text-left`}
                  secureTextEntry={secureTextEntry && !showPassword} // Toggle secureTextEntry
                  onFocus={() => setIsFocused(true)} // Set focus state to true
                  onBlur={() => setIsFocused(false)} // Set focus state to false
                  {...props}
              />
              {secureTextEntry && ( // Show eye icon only for password fields
                  <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
                      className="mr-4"
                  >
                    <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"} // Change icon based on showPassword state
                        size={24}
                        color="#7C7C82" // Match the color of other icons
                    />
                  </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};

export default InputField;