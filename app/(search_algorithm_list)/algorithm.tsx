import ScreenWrapper from '@/components/ScreenWrapper'
import { ResizeMode, Video } from 'expo-av'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const AlgorithmOverview = () => {
  return (
    <ScreenWrapper bg="white">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.title}>🤖 Algorithm Overview</Text>

        <Text style={styles.paragraph}>
          An algorithm is a step-by-step procedure or formula for solving a problem. In computer science,
          algorithms are essential as they define the logic behind problem-solving and data processing,
          enabling efficient and scalable software development.
        </Text>

        {/* Key Concepts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 Key Features</Text>
          <Text style={styles.bullet}>• Definiteness – Steps are clearly defined and unambiguous.</Text>
          <Text style={styles.bullet}>• Finiteness – An algorithm must complete in a finite number of steps.</Text>
          <Text style={styles.bullet}>• Input & Output – Takes input(s) and produces output(s).</Text>
          <Text style={styles.bullet}>• Effectiveness – Each step is simple and can be executed in finite time.</Text>
        </View>

        {/* Types of Algorithms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧩 Types of Algorithms</Text>
          <Text style={styles.bullet}>• Brute Force – Tests all possible solutions to find an answer.</Text>
          <Text style={styles.bullet}>• Divide and Conquer – Breaks a problem into sub-problems (e.g., Merge Sort).</Text>
          <Text style={styles.bullet}>• Greedy – Chooses the best option at each step (e.g., Kruskal’s Algorithm).</Text>
          <Text style={styles.bullet}>• Dynamic Programming – Stores results to avoid recomputation.</Text>
          <Text style={styles.bullet}>• Backtracking – Explores all possibilities and backtracks when needed.</Text>
        </View>

        {/* Real-world Applications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Real-world Applications</Text>
          <Text style={styles.bullet}>• Google Search uses algorithms for ranking results.</Text>
          <Text style={styles.bullet}>• GPS apps use algorithms to find the shortest path.</Text>
          <Text style={styles.bullet}>• Recommendation systems (Netflix, YouTube) use AI algorithms.</Text>
          <Text style={styles.bullet}>• Encryption algorithms secure online transactions.</Text>
        </View>

        {/* Fun Fact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Fun Fact</Text>
          <Text style={styles.paragraph}>
            A well-optimized algorithm can drastically improve performance. 
            For example, sorting 1 million items using a naive O(n²) approach 
            could take hours, while an O(n log n) algorithm can complete in seconds!
          </Text>
        </View>

        {/* Video Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎥 Watch Intro Video</Text>
          <View style={styles.videoContainer}>
            <Video
              source={require('../../assets/videos/algorithm.mp4')} // <-- replace with your video file
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

export default AlgorithmOverview

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
