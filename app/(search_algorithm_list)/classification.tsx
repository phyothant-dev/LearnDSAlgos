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
    title: 'What is a Classification Algorithm?', 
    content: 'Classification algorithms are supervised learning methods used to categorize data into predefined classes or labels based on input features. They are widely used in applications like spam detection, image recognition, and medical diagnosis.'
  },
  { 
    id: '2', 
    title: 'Types of Classification Algorithms', 
    content: 'Common classification algorithms include:\n- Logistic Regression\n- Decision Trees\n- Support Vector Machines (SVM)\n- k-Nearest Neighbors (k-NN)\n- Naive Bayes\n- Neural Networks'
  },
  { 
    id: '3', 
    title: 'How Classification Algorithms Work', 
    content: 'These algorithms learn from labeled training data by finding patterns and decision boundaries that separate different classes. After training, they predict the class of new, unseen data points.'
  },
  { 
    id: '4', 
    title: 'Example: Logistic Regression', 
    content: 'Logistic Regression predicts the probability of a binary outcome by applying the logistic function to a linear combination of input features.\n\nAdvantages:\n- Simple and interpretable\n- Efficient for linearly separable data\n\nDisadvantages:\n- Limited to linear decision boundaries'
  },
  { 
    id: '5', 
    title: 'Performance Metrics for Classification', 
    content: 'Key metrics include:\n- Accuracy\n- Precision\n- Recall\n- F1 Score\n- Confusion Matrix\nThese metrics help evaluate how well the model classifies new data.'
  },
  { 
    id: '6', 
    title: 'Advantages of Classification Algorithms', 
    content: '1. Useful for decision-making in various domains.\n2. Can handle complex datasets.\n3. Provide probabilistic outputs (in some algorithms).\n4. Support multi-class classification.'
  },
  { 
    id: '7', 
    title: 'Challenges with Classification Algorithms', 
    content: '1. Require quality labeled data.\n2. Risk of overfitting or underfitting.\n3. Sensitive to imbalanced datasets.\n4. Some models are hard to interpret.'
  },
  { 
    id: '8', 
    title: 'Sample Algorithm: k-Nearest Neighbors (k-NN)', 
    content: 'k-NN classifies a new data point by looking at the "k" closest labeled points in the training data and assigning the most common class.\n\nPseudocode:\n1. Choose number k.\n2. Calculate distance between new point and all training points.\n3. Select k nearest neighbors.\n4. Assign class based on majority vote.'
  },
  {
    id: '9',
    title: 'Java Code for Classification',
    content: `public class SimpleClassifier {
    public String classifyNumber(int number) {
        if (number < 0) {
            return "Negative";
        } else if (number == 0) {
            return "Zero";
        } else {
            return "Positive";
        }
    }

    public String classifyDay(int dayOfWeek) {
        switch (dayOfWeek) {
            case 1: return "Sunday";
            case 2: return "Monday";
            case 3: return "Tuesday";
            case 4: return "Wednesday";
            case 5: return "Thursday";
            case 6: return "Friday";
            case 7: return "Saturday";
            default: return "Invalid Day";
        }
    }

    public static void main(String[] args) {
        SimpleClassifier sc = new SimpleClassifier();
        System.out.println(sc.classifyNumber(-5)); // Negative
        System.out.println(sc.classifyNumber(0));  // Zero
        System.out.println(sc.classifyNumber(10)); // Positive
        System.out.println(sc.classifyDay(3));     // Tuesday
        System.out.println(sc.classifyDay(8));     // Invalid Day
    }
}`
  },
  {
    id: '10',
    title: 'C++ Code for Classification',
    content: `#include <iostream>
#include <cctype> // For character classification functions

int main() {
    char ch = 'A';
    if (isalpha(ch)) {
        std::cout << ch << " is an alphabet." << std::endl;
    } else {
        std::cout << ch << " is not an alphabet." << std::endl;
    }

    char digit_ch = '5';
    if (isdigit(digit_ch)) {
        std::cout << digit_ch << " is a digit." << std::endl;
    } else {
        std::cout << digit_ch << " is not a digit." << std::endl;
    }

    return 0;
}`
  },
    {
    id: "11",
    title: "Watch Classification Explained Video",
    isVideo: true, // ✅ video flag
  },
];

export default function Classification_Algorithms() {
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
      {expandedItem === item.id &&
        (item.isVideo ? (
          <Video
            ref={videoRef}
            style={styles.video}
            source={require("../../assets/videos/classification.mp4")}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        ) : (
          <Text style={[styles.content, item.isCode && styles.codeBlock]}>
            {item.content}
          </Text>
        ))}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>CLASSIFICATION</Text>
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
    fontFamily: 'monospace', // For code formatting
  },
});
