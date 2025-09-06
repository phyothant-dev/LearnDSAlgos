import ScreenWrapper from '@/components/ScreenWrapper'
import { ResizeMode, Video } from 'expo-av'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const Overview = () => {
  return (
    <ScreenWrapper bg="white">
    <ScrollView contentContainerStyle={styles.container} 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} >
      <Text style={styles.title}>📘 Overview</Text>

      <Text style={styles.paragraph}>
        Data structures are essential components in computer science that define how data is organized, accessed, and modified.
        Mastering them helps in building efficient, optimized, and scalable software systems.
      </Text>

      {/* Key Points Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📌 Key Concepts</Text>
        <Text style={styles.bullet}>• Arrays – Store elements in contiguous memory locations.</Text>
        <Text style={styles.bullet}>• Linked Lists – Store elements in nodes connected via pointers.</Text>
        <Text style={styles.bullet}>• Stacks – Follow LIFO (Last-In-First-Out) principle.</Text>
        <Text style={styles.bullet}>• Queues – Follow FIFO (First-In-First-Out) principle.</Text>
        <Text style={styles.bullet}>• Trees – Represent hierarchical relationships (e.g., file systems).</Text>
        <Text style={styles.bullet}>• Graphs – Model networks like maps and social connections.</Text>
      </View>

      {/* Real-world Applications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌍 Real-world Applications</Text>
        <Text style={styles.bullet}>• Google Maps uses graphs to calculate the shortest path.</Text>
        <Text style={styles.bullet}>• Social networks use graphs to suggest friends and groups.</Text>
        <Text style={styles.bullet}>• Web browsers use stacks for forward/backward navigation.</Text>
        <Text style={styles.bullet}>• Operating systems use queues to manage processes.</Text>
      </View>

      {/* Fun Fact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Fun Fact</Text>
        <Text style={styles.paragraph}>
          Choosing the right data structure can reduce an algorithm’s time complexity from O(n²) to O(log n),
          making software faster and more efficient!
        </Text>
      </View>

      {/* Video Section */}
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

export default Overview

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F5F5F5',
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
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    marginTop: 15,
    alignSelf: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
})
