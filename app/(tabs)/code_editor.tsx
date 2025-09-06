import ScreenWrapper from "@/components/ScreenWrapper";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function DualCompiler() {
  return (
    <ScreenWrapper bg="white">
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Java Compiler</Text>
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: "http://onecompiler.com/java" }}
          style={styles.webview}
        />
      </View>

      <Text style={styles.label}>C++ Compiler</Text>
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: "https://onecompiler.com/cpp" }}
          style={styles.webview}
        />
      </View>
    </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#007BFF",
  },
  webviewContainer: {
    height: 400, // adjust height as needed
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 16,
  },
  webview: {
    flex: 1,
  },
});
