import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ImageSourcePropType, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AboutUsScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | null>(null);

  const teamMembers = [
    { name: "Mg Phyo Thant", role: "Leader", image: require("../../assets/images/phyo.jpg") },
    { name: "Mg Aung Thu Hein", role: "Member", image: require("../../assets/images/Aung (2).jpg") },
    { name: "Mg Myo Win Aung", role: "Member", image: require("../../assets/images/myo.jpg") },
    { name: "Mg Thet Naung", role: "Member", image: require("../../assets/images/thet.jpg") },
  ];

  return (
    <ScreenWrapper bg="white">
      <ScrollView style={styles.container}>
        {/* Header Image */}
        <Image source={require("../../assets/images/gp.jpg")} style={styles.headerImage} />

        {/* Title */}
        <Text style={styles.title}>About Us</Text>

        {/* Description */}
        <Text style={styles.description}>
          We are a group of dedicated students working together on this project. Our team is passionate about learning and creating solutions that showcase our skills and teamwork. This project represents our shared effort and commitment.
        </Text>

        {/* Team Section */}
        <Text style={styles.sectionTitle}>Meet the Team</Text>
        <View style={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity onPress={() => setSelectedImage(member.image)}>
                <Image source={member.image} style={styles.avatar} />
              </TouchableOpacity>
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.role}>{member.role}</Text>
            </View>
          ))}
        </View>

        {/* Contact Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.push("/contactus_screen")}>
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>

        {/* Modal for Large Image */}
        <Modal visible={!!selectedImage} transparent={true} animationType="fade">
          <TouchableOpacity style={styles.modalBackground} onPress={() => setSelectedImage(null)}>
            {selectedImage && <Image source={selectedImage} style={styles.modalImage} />}
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 20,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 10,
    color: "#444",
  },
  teamContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 12,
    width: 140,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  role: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 50,
    marginVertical: 30,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 15,
  },
});
