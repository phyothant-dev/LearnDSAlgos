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
    title: 'How Quick Sort Algorithm Works', 
    content: 'Quick Sort is a divide-and-conquer algorithm. It works by selecting a pivot element, partitioning the array into elements less than and greater than the pivot, and recursively applying the same process to subarrays.\n\nExample:\nInput: [5, 3, 8, 4]\nPivot: 5\nPartition: [3,4] [5] [8]\nSorted: [3,4,5,8]'
  },
  { 
    id: '2', 
    title: 'Sorting in Ascending Order with Quick Sort', 
    content: 'In ascending order, Quick Sort ensures that elements smaller than the pivot move to the left and larger ones move to the right. This partitioning continues until the entire array is sorted.\n\nCode Example (JavaScript):\nfunction quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const left = [], right = [];\n  for (let i = 0; i < arr.length - 1; i++) {\n    if (arr[i] < pivot) left.push(arr[i]);\n    else right.push(arr[i]);\n  }\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}\nconsole.log(quickSort([5,3,8,4]));'
  },
  { 
    id: '3', 
    title: 'Quick Sort Algorithm Steps', 
    content: 'Algorithm Steps:\n1. Choose a pivot element.\n2. Partition the array into two subarrays: left (< pivot) and right (> pivot).\n3. Recursively apply Quick Sort to both subarrays.\n4. Combine results to get the sorted array.'
  },
  { 
    id: '4', 
    title: 'Pseudocode for Quick Sort Algorithm', 
    content: 'Pseudo-code:\nfunction quickSort(arr):\n   if length(arr) <= 1: return arr\n   pivot = last element of arr\n   left = elements < pivot\n   right = elements > pivot\n   return quickSort(left) + [pivot] + quickSort(right)'
  },
  { 
    id: '5', 
    title: 'Performance Analysis of Quick Sort', 
    content: 'Time Complexity:\n- Best Case: O(n log n) (when pivot divides array evenly)\n- Worst Case: O(n^2) (when pivot is always smallest or largest element)\n- Average Case: O(n log n)\nSpace Complexity: O(log n) due to recursion stack.'
  },
  { 
    id: '6', 
    title: 'Advantages of Quick Sort', 
    content: '1. Very efficient for large datasets.\n2. Performs better than other O(n log n) algorithms in practice.\n3. In-place sorting with minimal additional memory.'
  },
  { 
    id: '7', 
    title: 'Disadvantages of Quick Sort', 
    content: '1. Worst-case time complexity is O(n^2).\n2. Recursive calls may lead to stack overflow for very large arrays.\n3. Not stable (relative order of equal elements is not preserved).'
  },
  { 
    id: '8', 
    title: 'Quick Sort Implementation', 
    content: 'Example Implementation (Python):\n\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[-1]\n    left = [x for x in arr[:-1] if x < pivot]\n    right = [x for x in arr[:-1] if x >= pivot]\n    return quick_sort(left) + [pivot] + quick_sort(right)\n\nprint(quick_sort([5,3,8,4])) # [3,4,5,8]'
  },
  {
    id: '9',
    title: 'Java Code for Quick Sort',
    content: `import java.util.Arrays;

public class QuickSort {

    // Main method to perform QuickSort
    public static void quickSort(int[] array, int low, int high) {
        if (low < high) {
            // Partition the array and get the pivot index
            int pivotIndex = partition(array, low, high);

            // Recursively sort elements before and after the pivot
            quickSort(array, low, pivotIndex - 1);
            quickSort(array, pivotIndex + 1, high);
        }
    }

    // Method to partition the array around a pivot
    private static int partition(int[] array, int low, int high) {
        int pivot = array[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (array[j] <= pivot) {
                i++;
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        int temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;

        return i + 1;
    }

    public static void printArray(int[] array) {
        System.out.println(Arrays.toString(array));
    }

    public static void main(String[] args) {
        int[] data = {10, 7, 8, 9, 1, 5};
        System.out.print("Unsorted Array: ");
        printArray(data);

        quickSort(data, 0, data.length - 1);

        System.out.print("Sorted Array: ");
        printArray(data);
    }
}`
  },
  {
    id: '10',
    title: 'C++ Code for Quick Sort',
    content: `#include <iostream>
#include <vector>
#include <algorithm> // Required for std::swap

// Function to partition the array around a pivot
int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // Choosing the last element as the pivot
    int i = (low - 1); // Index of smaller element

    for (int j = low; j <= high - 1; j++) {
        // If current element is smaller than or equal to the pivot
        if (arr[j] <= pivot) {
            i++; // Increment index of smaller element
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]); // Place the pivot in its correct position
    return (i + 1); // Return the partitioning index
}

// Quick Sort function
void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        // pi is partitioning index, arr[pi] is now at right place
        int pi = partition(arr, low, high);

        // Separately sort elements before and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    std::vector<int> arr = {10, 7, 8, 9, 1, 5};
    int n = arr.size();

    std::cout << "Original array: ";
    for (int x : arr) {
        std::cout << x << " ";
    }
    std::cout << std::endl;

    quickSort(arr, 0, n - 1);

    std::cout << "Sorted array: ";
    for (int x : arr) {
        std::cout << x << " ";
    }
    std::cout << std::endl;

    return 0;
}`
  },
  {
    id: "11",
    title: "Watch Quick Sort Explained Video",
    isVideo: true,
  }
];

export default function Quick_sort() {
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
                                  source={require("../../assets/videos/quick.mp4")} 
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
      <Text style={styles.sectionTitle}>QUICK SORT</Text>
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
    fontSize: 16,
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
