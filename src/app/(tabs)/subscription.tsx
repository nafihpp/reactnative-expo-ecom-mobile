import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function PhoneNumberScreen() {
  const [phone, setPhone] = useState("");

  const handleSendOTP = async () => {
    if (phone.length < 10) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number");
      return;
    }

    try {
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Send OTP" onPress={handleSendOTP} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
