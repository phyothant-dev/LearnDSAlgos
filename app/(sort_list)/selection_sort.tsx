import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from "expo-av";
import * as Clipboard from 'expo-clipboard';
import React, { useRef, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Item = {
  id: string;
  title: string;
  content?: string;
  isCode?: boolean;
  isVideo?: boolean;
};

const data: Item[] = [
  { 
    id: '1', 
    title: 'How Selection Sort Algorithm Works', 
    content: 'Selection Sort works by repeatedly finding the minimum element from the unsorted part and placing it at the beginning. It reduces the number of swaps compared to Bubble Sort.\n\nExample:\nInput: [5, 3, 8, 4]\nPass 1: [3, 5, 8, 4]\nPass 2: [3, 4, 8, 5]\nPass 3: [3, 4, 5, 8] (sorted)'
  },
  { 
    id: '2', 
    title: 'Sorting in Ascending Order with Selection Sort', 
    content: 'In ascending order, Selection Sort selects the smallest element from the unsorted section and places it in its correct position. This process is repeated until the array is sorted.\n\nCode Example (JavaScript):\nfunction selectionSort(arr) {\n  for (let i = 0; i < arr.length - 1; i++) {\n    let minIndex = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[minIndex]) minIndex = j;\n    }\n    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];\n  }\n  return arr;\n}\nconsole.log(selectionSort([5,3,8,4]));'
  },
  { 
    id: '3', 
    title: 'Selection Sort Algorithm Steps', 
    content: 'Algorithm Steps:\n1. Find the minimum element in the unsorted part.\n2. Swap it with the first element of the unsorted part.\n3. Move the boundary of the sorted part by one.\n4. Repeat until the array is fully sorted.'
  },
  { 
    id: '4', 
    title: 'Pseudocode for Selection Sort Algorithm', 
    content: 'Pseudo-code:\nfor i = 0 to n-1:\n   minIndex = i\n   for j = i+1 to n:\n      if arr[j] < arr[minIndex]:\n         minIndex = j\n   swap(arr[minIndex], arr[i])'
  },
  { 
    id: '5', 
    title: 'Performance Analysis of Selection Sort', 
    content: 'Time Complexity:\n- Best Case: O(n^2)\n- Worst Case: O(n^2)\n- Average Case: O(n^2)\nSpace Complexity: O(1) because it sorts in place.\nSelection Sort always performs the same number of comparisons regardless of input.'
  },
  { 
    id: '6', 
    title: 'Advantages of Selection Sort', 
    content: '1. Simple to understand and implement.\n2. Performs fewer swaps than Bubble Sort.\n3. Works well on small datasets.\n4. In-place sorting with no extra memory usage.'
  },
  { 
    id: '7', 
    title: 'Disadvantages of Selection Sort', 
    content: '1. Inefficient for large datasets due to O(n^2) time complexity.\n2. Not adaptive — it does not become faster if the array is already sorted.\n3. Not stable (relative order of equal elements is not preserved).'
  },
  { 
    id: '8', 
    title: 'Selection Sort Implementation', 
    content: 'Example Implementation (Python):\n\ndef selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i+1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\nprint(selection_sort([5,3,8,4])) # [3,4,5,8]'
  },
  { 
    id: '9', 
    title: 'Optimized Selection Sort', 
    content: 'Although standard Selection Sort always makes O(n^2) comparisons, it can be slightly optimized by checking if a swap is needed only when the minimum index changes. However, the overall complexity remains O(n^2).'
  },
  { 
    id: '10', 
    title: 'Real-World Usage of Selection Sort', 
    content: 'Selection Sort is rarely used in practice for large datasets due to its inefficiency. However, it is useful in cases where memory is very limited, and the cost of swaps is high compared to comparisons.'
  },
  { id: '11', 
    title: 'Java Code for Selection Sort', 
    content: `public class SelectionSort {

    /**
     * Sorts an integer array using the Selection Sort algorithm in ascending order.
     *
     * @param arr The array to be sorted.
     */
    public void sort(int[] arr) {
        int n = arr.length;

        // One by one move boundary of unsorted subarray
        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in unsorted array
            int min_idx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[min_idx]) {
                    min_idx = j;
                }
            }

            // Swap the found minimum element with the first element of the unsorted part
            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
    }

    /**
     * Prints the elements of an integer array.
     *
     * @param arr The array to be printed.
     */
    public void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    // Main method to test the Selection Sort
    public static void main(String[] args) {
        SelectionSort sorter = new SelectionSort();
        int[] data = {64, 25, 12, 22, 11};

        System.out.print("Original array: ");
        sorter.printArray(data);

        sorter.sort(data);

        System.out.print("Sorted array: ");
        sorter.printArray(data);
    }
}`
  },
  { id:'12',title: 'C++ Code for Selection Sort', content: `
    #include <iostream> // Required for input/output operations
#include <algorithm> // Required for the std::swap function

// Function to perform Selection Sort
void selectionSort(int arr[], int n) {
    // Outer loop iterates through the unsorted part of the array
    for (int i = 0; i < n - 1; ++i) {
        // Assume the current element is the minimum
        int min_idx = i;

        // Inner loop finds the actual minimum in the unsorted part
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j; // Update min_idx if a smaller element is found
            }
        }

        // Swap the found minimum element with the element at the current position (i)
        // This places the minimum element in its correct sorted position
        std::swap(arr[min_idx], arr[i]);
    }
}

// Function to print an array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
}

// Main function to test the selectionSort
int main() {
    int arr[] = {64, 25, 12, 22, 11}; // Example array
    int n = sizeof(arr) / sizeof(arr[0]); // Calculate the size of the array

    std::cout << "Original array: ";
    printArray(arr, n);

    selectionSort(arr, n); // Sort the array

    std::cout << "Sorted array: ";
    printArray(arr, n);

    return 0;
}`},
{
    id: "13",
    title: "Watch Selection Sort Explained Video",
    isVideo: true,
  }
];

export default function Selection_sort() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const videoRef = useRef<Video | null>(null);
  const toggleExpand = (id: string) => {
    setExpandedItem(prev => (prev === id ? null : id));
   
  };
const copyToClipboard = async (text: string, id: string) => {
    await Clipboard.setStringAsync(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 1500); // Reset after 1.5s
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
                                        source={require("../../assets/videos/selection.mp4")} 
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
      <Text style={styles.sectionTitle}>SELECTION SORT</Text>
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
    color: '#007bff',
    marginTop: 20,
    textAlign: 'center',
  },
  content: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
    video: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#000',
  },
});
