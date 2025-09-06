import ScreenWrapper from "@/components/ScreenWrapper"; // keep this if your ScreenWrapper is in components
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function ContactUsScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!name || !email || !message) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const toEmail = "aungthuhein001122@gmail.com";  
    const subject = `Contact Form Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.canOpenURL(mailtoUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(mailtoUrl);
        } else {
          Alert.alert("Error", "Unable to open email client.");
        }
      })
      .catch((err) => Alert.alert("Error", err.message));

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ScreenWrapper bg="white">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Get in Touch</Text>
        <Text style={styles.subtitle}>
          Have questions or feedback? Fill out the form below and we’ll get
          back to you as soon as possible.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor="#aaa"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Your Message"
          placeholderTextColor="#aaa"
          value={message}
          multiline
          numberOfLines={5}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,       // underline instead of box
    borderBottomColor: "#333",
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    borderRadius: 25,
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
