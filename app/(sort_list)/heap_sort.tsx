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
  View
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
    title: 'How Heap Sort Works',
    content:
      'Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max-heap from the input data, then repeatedly extracts the maximum element and rebuilds the heap until the array is sorted.',
  },
  {
    id: '2',
    title: 'Heap Data Structure Basics',
    content:
      'A Heap is a special tree-based data structure that satisfies the heap property:\n- Max-Heap: Parent is always greater than or equal to its children.\n- Min-Heap: Parent is always less than or equal to its children.\nHeap Sort uses a Max-Heap to sort in ascending order.',
  },
  {
    id: '3',
    title: 'Heap Sort Algorithm',
    content:
      'The algorithm works as follows:\n1. Build a max heap from the input data.\n2. Swap the root (largest element) with the last element.\n3. Reduce the heap size and heapify the root.\n4. Repeat until the heap size becomes 1.',
  },
  {
    id: '4',
    title: 'Pseudocode for Heap Sort',
    content:
      'function heapSort(arr):\n   buildMaxHeap(arr)\n   for i from n-1 to 1:\n      swap(arr[0], arr[i])\n      heapify(arr, 0, i)\n\nfunction heapify(arr, i, n):\n   largest = i\n   left = 2*i + 1\n   right = 2*i + 2\n   if left < n and arr[left] > arr[largest]:\n      largest = left\n   if right < n and arr[right] > arr[largest]:\n      largest = right\n   if largest != i:\n      swap(arr[i], arr[largest])\n      heapify(arr, largest, n)',
  },
  {
    id: '5',
    title: 'Performance Analysis of Heap Sort',
    content:
      'Time Complexity:\n- Best Case: O(n log n)\n- Worst Case: O(n log n)\n- Average Case: O(n log n)\nSpace Complexity: O(1) (in-place sorting)',
  },
  {
    id: '6',
    title: 'Advantages of Heap Sort',
    content:
      '1. Time complexity is O(n log n) for all cases.\n2. Works well for large datasets.\n3. Does not require extra memory (in-place).',
  },
  {
    id: '7',
    title: 'Disadvantages of Heap Sort',
    content:
      '1. Not a stable sort (equal elements may change order).\n2. Slower than Quick Sort in practice due to more cache misses.\n3. More complex to implement than simple algorithms like Insertion Sort.',
  },
  {
    id: '8',
    title: 'Java Code for Heap Sort',
    content: `public class HeapSort {

    /**
     * Sorts an array using the Heap Sort algorithm.
     *
     * @param arr The array to be sorted.
     */
    public static void heapSort(int[] arr) {
        int n = arr.length;

        // Build max-heap (rearrange array)
        // Start from the last non-leaf node and heapify upwards
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // One by one extract an element from the heap
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }

    /**
     * To heapify a subtree rooted with node i which is an index in arr[].
     * n is the size of the heap.
     *
     * @param arr The array representing the heap.
     * @param n   The size of the heap (number of elements to consider).
     * @param i   The index of the root of the subtree to heapify.
     */
    private static void heapify(int[] arr, int n, int i) {
        int largest = i; // Initialize largest as root
        int left = 2 * i + 1; // Left child index
        int right = 2 * i + 2; // Right child index

        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        // If largest is not root
        if (largest != i) {
            // Swap the root with the largest child
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }

    // Driver code to test the HeapSort
    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        System.out.println("Original array:");
        for (int x : arr) {
            System.out.print(x + " ");
        }
        System.out.println();

        heapSort(arr);

        System.out.println("Sorted array:");
        for (int x : arr) {
            System.out.print(x + " ");
        }
        System.out.println();
    }
}`,
  },
  {
    id: '9',
    title: 'C++ Code for Heap Sort',
    content: `#include <iostream>
#include <algorithm> // For std::swap

// Function to heapify a subtree rooted with node 'i'
// n is the size of the heap
void heapify(int arr[], int n, int i) {
    int largest = i;       // Initialize largest as root
    int left = 2 * i + 1;  // Left child
    int right = 2 * i + 2; // Right child

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest != i) {
        std::swap(arr[i], arr[largest]);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

// Main function to perform heap sort
void heapSort(int arr[], int n) {
    // Build a max-heap (rearrange array)
    // Start from the last non-leaf node and go up to the root
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements one by one from the heap
    for (int i = n - 1; i >= 0; i--) {
        // Move current root (largest element) to the end of the array
        std::swap(arr[0], arr[i]);

        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

// Utility function to print an array
void printArray(int arr[], int n) {
    for (int i = 0; i < n; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    std::cout << "Original array: ";
    printArray(arr, n);

    heapSort(arr, n);

    std::cout << "Sorted array: ";
    printArray(arr, n);

    return 0;
}`,
  },
  {
    id: '10',
    title: 'Summary of Heap Sort',
    content:
      'Heap Sort is an efficient comparison-based sorting algorithm that works in-place with O(n log n) time complexity for all cases. It is not stable but works well for large datasets.',
  },
   {
    id: "11",
    title: "Watch Heap Sort Explained Video",
    isVideo: true,
  }
];

export default function Heap_Sort() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);
  const toggleExpand = (id: string) => {
    setExpandedItem(prev => (prev === id ? null : id));
  };

  const copyToClipboard = async (text: string, id: string) => {
    if (!text) return;
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
                 source={require("../../assets/videos/heap.mp4")} 
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
      <Text style={styles.sectionTitle}>HEAP SORT</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
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
    fontFamily: 'monospace', // ✅ Makes code more readable
  },
   video: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#000',
  },
});

