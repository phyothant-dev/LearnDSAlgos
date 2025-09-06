import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from "expo-av";
import * as Clipboard from 'expo-clipboard';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Item = {
  id: string;
  title: string;
  content?: string;
  isVideo?: boolean; // ✅ added
  isCode?: boolean;  // ✅ added
};

const data: Item[] = [
  {
    id: '1',
    title: 'How Bubble Sort Algorithm Works',
    content:
      'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process continues until no swaps are needed, indicating that the list is sorted.\n\nExample:\nInput: [5, 3, 8, 4]\nPass 1: [3, 5, 4, 8]\nPass 2: [3, 4, 5, 8]\nPass 3: [3, 4, 5, 8] (sorted)',
  },
   {
    id: '2',
    title: 'Sorting in Ascending Order',
    content:
      'In ascending order, Bubble Sort ensures smaller elements gradually "bubble up" to the front. Comparisons and swaps continue until the array is fully sorted.\n\nCode Example (JavaScript):\nfunction bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}\nconsole.log(bubbleSort([5,3,8,4]));',
  },
  {
    id: '3',
    title: 'Bubble Sort Algorithm',
    content:
      'Algorithm Steps:\n1. Start from the first element and compare it with the next.\n2. Swap if the first is greater than the second.\n3. Continue until the last element.\n4. Repeat the process for remaining elements.\n5. Stop when no swaps occur in a pass.',
  },
  {
    id: '4',
    title: 'Pseudocode for Bubble Sort Algorithm',
    content:
      'Pseudo-code:\nfor i = 0 to n-1:\n   for j = 0 to n-i-1:\n      if arr[j] > arr[j+1]:\n         swap(arr[j], arr[j+1])',
  },
  {
    id: '5',
    title: 'Performance Analysis of Bubble Sort',
    content:
      'Time Complexity:\n- Best Case: O(n) (when the list is already sorted)\n- Worst Case: O(n^2) (when the list is in reverse order)\n- Average Case: O(n^2)\nSpace Complexity: O(1) because it sorts in place.',
  },
  {
    id: '6',
    title: 'Advantages of Bubble Sort',
    content:
      '1. Very simple to understand and implement.\n2. Works well on small datasets.\n3. Does not require extra memory space.',
  },
  {
    id: '7',
    title: 'Disadvantages of Bubble Sort',
    content:
      '1. Inefficient for large datasets.\n2. Has O(n^2) time complexity in worst and average cases.\n3. Performs unnecessary comparisons even when sorted.',
  },
  {
    id: '8',
    title: 'Bubble Sort Implementation',
    content:
      'Example Implementation (Python):\n\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\nprint(bubble_sort([5,3,8,4])) # [3,4,5,8]',
  },
  {
    id: '9',
    title: 'Java Code for Bubble Sort',
    content: `public class BubbleSort {

    // Method to perform Bubble Sort on an integer array
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        // Outer loop for passes
        for (int i = 0; i < n - 1; i++) {
            // Inner loop for comparisons and swaps within each pass
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // Main method to test the bubbleSort
    public static void main(String[] args) {
        int[] data = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("Unsorted array:");
        for (int i : data) {
            System.out.print(i + " ");
        }
        System.out.println();

        bubbleSort(data); // Call the sorting method

        System.out.println("Sorted array (Bubble Sort):");
        for (int i : data) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`
  },
  {
    id: '10',
    title: 'C++ Code for Bubble Sort',
    content: `#include <iostream>
#include <vector> // Required for using std::vector
#include <algorithm> // Required for using std::swap

// Function to perform Bubble Sort
void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    // Outer loop for passes
    for (int i = 0; i < n - 1; ++i) {
        // Inner loop for comparisons and swaps in each pass
        for (int j = 0; j < n - i - 1; ++j) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap if they are in the wrong order
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// Main function to test the bubbleSort
int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};

    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    bubbleSort(numbers); // Call the bubbleSort function

    std::cout << "Sorted array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}`
  },
    {
    id: "11",
    title: "Watch Bubble Sort Explained Video",
    isVideo: true,
  }
];

export default function Bubble_sort() {
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
            onPress={() => copyToClipboard(item.content || '', item.id)}
            style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' }}
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
                 source={require("../../assets/videos/bubble.mp4")} 
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
      <Text style={styles.sectionTitle}>BUBBLE SORT</Text>
      <FlatList data={data} keyExtractor={item => item.id} renderItem={renderItem} />
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
  copiedText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#28a745',
    fontWeight: 'bold',
  },
   video: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#000',
  },
});
