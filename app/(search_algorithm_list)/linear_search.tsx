import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from "expo-av";
import * as Clipboard from 'expo-clipboard';
import React, { useRef, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Item = {
  id: string;
  title: string;
  content?: string;
  isVideo?: boolean;
};

const data: Item[] = [
  { id: '1', title: 'What is Linear Search?', content: 'Linear search is a simple search algorithm that checks each element in a list sequentially until the desired element is found or the list ends.' },
  { id: '2', title: 'How Linear Search Algorithm Works', content: 'It works by iterating through the list one element at a time and comparing it with the target value.' },
  { id: '3', title: 'Performance Analysis of Linear Search', content: 'Linear search has a time complexity of O(n), where n is the number of elements in the list.' },
  { id: '4', title: 'Linear Search Algorithm (Pseudocode)', content: 'procedure LINEAR_SEARCH(array, target)\n    for i ← 0 to length(array) - 1 do\n        if array[i] = target then\n            return i\n        end if\n    end for\n    return -1\nend procedure' },
  { id: '5', title: 'Time Complexity of Linear Search', content: 'Best Case: O(1)\nWorst Case: O(n)\nAverage Case: O(n)' },
  { id: '6', title: 'Advantages of Linear Search', content: '1. Easy to implement\n2. Works on both sorted and unsorted data' },
  { id: '7', title: 'Disadvantages of Linear Search', content: '1. Inefficient for large datasets\n2. Time complexity is linear' },
  { id: '8', title: 'Linear Search Implementation', content: 'You can implement linear search in many programming languages easily with loops.' },
  { 
    id: '9', 
    title: 'Java Code for Linear Search', 
    content: `// Java code for linearly search x in arr[]
// If x is present then return its location, otherwise return -1
class Geeks {
    static int search(int a[], int n, int x) {
        for (int i = 0; i < n; i++) {
            if (a[i] == x)
                return i;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] a = { 3, 4, 1, 7, 5 };
        int n = a.length;
        int x = 4;

        int index = search(a, n, x);
        
        if (index == -1)
            System.out.println("Element is not present in the array");
        else
            System.out.println("Element found at index: " + index);
    }
}`
  },
  {
    id: '10',
    title: 'C++ Code for Linear Search',
    content: `#include <iostream>

// Function to perform linear search
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            return i;
        }
    }
    return -1;
}

int main() {
    int arr[] = {10, 25, 45, 30, 75, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key = 30;

    int result = linearSearch(arr, n, key);

    if (result != -1) {
        std::cout << "Element found at index: " << result << std::endl;
    } else {
        std::cout << "Element not found in the array." << std::endl;
    }

    key = 50;
    result = linearSearch(arr, n, key);
    if (result != -1) {
        std::cout << "Element found at index: " << result << std::endl;
    } else {
        std::cout << "Element not found in the array." << std::endl;
    }

    return 0;
}`
  },
  {
    id: "11",
    title: "Watch Linear Search Explained Video",
    isVideo: true,
  }
];

export default function Linear_Search() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);

  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      videoRef.current?.pauseAsync();
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
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
            source={require("../../assets/videos/linear.mp4")} 
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        ) : (
          <Text style={styles.content}>{item.content}</Text>
        )
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>LINEAR SEARCH</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={expandedItem}
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
    color: '#007bff',
    marginTop: 20,
    textAlign: 'center',
  },
  content: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
    fontFamily: 'monospace',
  },
  video: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#000',
  },
});
