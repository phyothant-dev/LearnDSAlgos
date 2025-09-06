import ScreenWrapper from '@/components/ScreenWrapper'
import { ResizeMode, Video } from 'expo-av'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const Data_Structure = () => {
  return (
    <ScreenWrapper bg="white">
    <ScrollView contentContainerStyle={styles.container} 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
      <Text style={styles.title}>📘 Data Structures</Text>

      <Text style={styles.paragraph}>
        A data structure is a specialized format for organizing, processing, retrieving, and storing data. It defines how data is accessed and the operations that can be performed on it efficiently. Choosing the right data structure can significantly impact the performance of your programs.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📌 Why Are Data Structures Important?</Text>
        <Text style={styles.bullet}>• Improve algorithm efficiency and speed.</Text>
        <Text style={styles.bullet}>• Help solve real-world problems systematically.</Text>
        <Text style={styles.bullet}>• Reduce memory and processing time.</Text>
        <Text style={styles.bullet}>• Essential in areas like AI, databases, compilers, etc.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📂 Common Types of Data Structures</Text>
        <Text style={styles.bullet}>• 📦 Array – Stores elements in contiguous memory. Fast index access.</Text>
        <Text style={styles.bullet}>• 🔗 Linked List – Nodes linked by pointers. Great for dynamic memory.</Text>
        <Text style={styles.bullet}>• 📚 Stack – Follows LIFO (Last-In-First-Out). Used for undo, expression parsing.</Text>
        <Text style={styles.bullet}>• 🎫 Queue – Follows FIFO (First-In-First-Out). Used in task scheduling.</Text>
        <Text style={styles.bullet}>• 🌳 Tree – Hierarchical structure. Used in file systems, databases.</Text>
        <Text style={styles.bullet}>• 🌐 Graph – Nodes and edges. Used in maps, networks, social media.</Text>
        <Text style={styles.bullet}>• 🗃️ Hash Table – Key-value pairs. Fast lookup and retrieval.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌍 Real-world Applications</Text>
        <Text style={styles.bullet}>• Google Maps uses graphs to find shortest routes.</Text>
        <Text style={styles.bullet}>• Facebook and LinkedIn use graphs to suggest friends.</Text>
        <Text style={styles.bullet}>• Web browsers use stacks for back/forward navigation.</Text>
        <Text style={styles.bullet}>• Operating systems use queues for task scheduling.</Text>
        <Text style={styles.bullet}>• AI algorithms use trees for decision-making and classification.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧠 Fun Fact</Text>
        <Text style={styles.paragraph}>
          The right data structure can reduce an algorithm’s time complexity from O(n²) to O(log n), making it significantly more efficient and scalable!
        </Text>
      </View>
      <View style={styles.section}>
      <Text style={styles.sectionTitle}>🎥 Watch Intro Video</Text>
      <View style={styles.videoContainer}>
        <Video
          source={require('../../assets/videos/data_structure_video.mp4')}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      </View>
      </View>
    </ScrollView>
    </ScreenWrapper>
  )
}

export default Data_Structure

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 15,
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
    paddingLeft: 10,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
})
