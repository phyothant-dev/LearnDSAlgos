import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import React, { useRef, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Item = {
  id: string;
  title: string;
  content?: string;
  isVideo?: boolean;
  isCode?: boolean;

};

const data: Item[] = [
  { 
    id: '1', 
    title: 'What is an AI Algorithm?', 
    content: 'AI algorithms are computational procedures that allow machines to learn from data, make decisions, and solve problems without explicit instructions. They form the core of artificial intelligence applications.'
  },
  { 
    id: '2', 
    title: 'Types of AI Algorithms', 
    content: 'Common AI algorithms include:\n- Supervised Learning (e.g., Decision Trees, Support Vector Machines)\n- Unsupervised Learning (e.g., K-Means Clustering)\n- Reinforcement Learning\n- Neural Networks (Deep Learning)'
  },
  { 
    id: '3', 
    title: 'How AI Algorithms Learn', 
    content: 'AI algorithms learn by identifying patterns in data. Supervised learning uses labeled data, unsupervised uses unlabeled data, and reinforcement learning learns from rewards and penalties.'
  },
  { 
    id: '4', 
    title: 'Example: Decision Tree Algorithm', 
    content: 'Decision Trees split data based on feature values to make predictions. The tree branches represent decision rules, and leaves represent outcomes.\n\nAdvantages:\n- Easy to interpret\n- Handles both numerical and categorical data\n\nDisadvantages:\n- Can overfit if not pruned properly'
  },
  { 
    id: '5', 
    title: 'Performance Metrics for AI Algorithms', 
    content: 'Common metrics include:\n- Accuracy\n- Precision and Recall\n- F1 Score\n- Confusion Matrix\n- ROC-AUC Curve\nThese metrics evaluate how well the AI model performs on unseen data.'
  },
  { 
    id: '6', 
    title: 'Advantages of AI Algorithms', 
    content: '1. Can automate complex tasks.\n2. Improve over time with more data.\n3. Enable intelligent decision-making.\n4. Can handle large, complex datasets.'
  },
  { 
    id: '7', 
    title: 'Challenges with AI Algorithms', 
    content: '1. Require large amounts of quality data.\n2. Can be computationally expensive.\n3. Risk of bias if training data is biased.\n4. Difficult to interpret some models (black box problem).'
  },
  { 
    id: '8', 
    title: 'Sample AI Algorithm: K-Means Clustering', 
    content: 'K-Means is an unsupervised learning algorithm that partitions data into k clusters by minimizing variance within each cluster.\n\nPseudocode:\n1. Initialize k centroids randomly.\n2. Assign each point to nearest centroid.\n3. Recompute centroids based on assignments.\n4. Repeat steps 2-3 until convergence.'
  },
  { 
    id: '9',
    title: 'Java Code for AI Algorithm',
    content: `// Java Example: K-Means Clustering
import java.util.*;

public class KMeans {
    public static void main(String[] args) {
        double[][] data = {{1,2},{2,1},{5,6},{6,5}};
        int k = 2;
        double[][] centroids = {{1,2},{5,6}};
        int[] labels = new int[data.length];
        
        // Assign points to nearest centroid
        for(int i=0;i<data.length;i++){
            double minDist = Double.MAX_VALUE;
            for(int j=0;j<k;j++){
                double dist = Math.pow(data[i][0]-centroids[j][0],2)+Math.pow(data[i][1]-centroids[j][1],2);
                if(dist<minDist){
                    minDist=dist;
                    labels[i]=j;
                }
            }
        }
        System.out.println("Cluster labels: " + Arrays.toString(labels));
    }
}`
  },
  { 
    id: '10',
    title: 'C++ Code for AI Algorithm',
    content: `// C++ Example: K-Means Clustering
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double data[4][2] = {{1,2},{2,1},{5,6},{6,5}};
    double centroids[2][2] = {{1,2},{5,6}};
    int labels[4];
    
    for(int i=0;i<4;i++){
        double minDist = 1e9;
        for(int j=0;j<2;j++){
            double dist = pow(data[i][0]-centroids[j][0],2)+pow(data[i][1]-centroids[j][1],2);
            if(dist<minDist){
                minDist=dist;
                labels[i]=j;
            }
        }
    }
    
    cout << "Cluster labels: ";
    for(int i=0;i<4;i++) cout << labels[i] << " ";
    cout << endl;
    return 0;
}`
  },
  {
    id: "11",
    title: "Watch AI alogrithm Explained Video",
    isVideo: true,
  },
];

export default function AI_Algorithm() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);
  const toggleExpand = (id: string) => {
    setExpandedItem(prev => (prev === id ? null : id));
  };

  const copyToClipboard = async (text: string, id: string) => {
    await Clipboard.setStringAsync(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 1500);
  };

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => toggleExpand(item.id)}>
      <View style={styles.row}>
        <View style={styles.circle} />
        <Text style={styles.title}>{item.title}</Text>
        {expandedItem === item.id && item.content && (
          <TouchableOpacity
            onPress={() => copyToClipboard(item.content ?? '', item.id)}
            style={{ marginLeft: 'auto' }}
          >
            {copiedItem === item.id ? (
              <Text style={{ color: '#28a745', fontWeight: 'bold' }}>Copied!</Text>
            ) : (
              <Ionicons name="copy-outline" size={20} color="#007BFF" />
            )}
          </TouchableOpacity>
        )}
      </View>
     {expandedItem === item.id && (
                  item.isVideo ? (
                    <Video
                      ref={videoRef}
                      style={styles.video}
                      source={require("../../assets/videos/ai.mp4")}
                      useNativeControls
                      resizeMode={ResizeMode.CONTAIN}
                      isLooping
                      shouldPlay
                    />
                  ) : (
                    <Text style={[styles.content, item.isCode && styles.codeBlock]}>
                      {item.content}
                    </Text>
                  )
                )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>AI Algorithms</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  card: {
    backgroundColor: '#FAF3FF',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop: 20,
    textAlign: 'center',
  },
  content: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
    codeBlock: {
    fontFamily: "monospace",
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: "#000",
    marginTop: 10,
  },
    video: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#000",
  },
});
