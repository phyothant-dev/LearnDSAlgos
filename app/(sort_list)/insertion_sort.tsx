import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import * as Clipboard from "expo-clipboard";
import React, { useRef, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Item = {
  id: string;
  title: string;
  content?: string;
  isVideo?: boolean; // ✅ added
  isCode?: boolean;  // ✅ added
};

const data: Item[] = [
  {
    id: "1",
    title: "How Insertion Sort Algorithm Works",
    content:
      "Insertion Sort builds the sorted array one item at a time by taking elements from the unsorted part and inserting them at their correct position in the sorted part.\n\nExample:\nInput: [5, 3, 8, 4]\nPass 1: [3, 5, 8, 4]\nPass 2: [3, 5, 8, 4] (no change)\nPass 3: [3, 4, 5, 8] (sorted)",
  },
  {
    id: "2",
    title: "Sorting in Ascending Order with Insertion Sort",
    content:
      "In ascending order, Insertion Sort picks the current element and places it into the correct position by shifting larger elements to the right.\n\nCode Example (JavaScript):\nfunction insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}\nconsole.log(insertionSort([5,3,8,4]));",
  },
  {
    id: "3",
    title: "Insertion Sort Algorithm Steps",
    content:
      "Algorithm Steps:\n1. Start from the second element (index 1).\n2. Compare it with elements before it.\n3. Shift larger elements to the right.\n4. Insert the current element at the correct position.\n5. Repeat for all elements until the array is sorted.",
  },
  {
    id: "4",
    title: "Pseudocode for Insertion Sort Algorithm",
    content:
      "Pseudo-code:\nfor i = 1 to n-1:\n   key = arr[i]\n   j = i - 1\n   while j >= 0 and arr[j] > key:\n       arr[j + 1] = arr[j]\n       j = j - 1\n   arr[j + 1] = key",
  },
  {
    id: "5",
    title: "Performance Analysis of Insertion Sort",
    content:
      "Time Complexity:\n- Best Case: O(n) (when the list is already sorted)\n- Worst Case: O(n^2) (when the list is in reverse order)\n- Average Case: O(n^2)\nSpace Complexity: O(1) because it sorts in place.\nInsertion Sort is efficient for small or nearly sorted datasets.",
  },
  {
    id: "6",
    title: "Advantages of Insertion Sort",
    content:
      "1. Simple to implement.\n2. Efficient for small datasets.\n3. Adaptive — performs better on nearly sorted data.\n4. Stable — preserves the order of equal elements.\n5. In-place sorting with no extra memory usage.",
  },
  {
    id: "7",
    title: "Disadvantages of Insertion Sort",
    content:
      "1. Inefficient for large datasets due to O(n^2) time complexity.\n2. Requires many shifts for large unsorted arrays.\n3. Slower than advanced algorithms like QuickSort or MergeSort.",
  },
  {
    id: "8",
    title: "Insertion Sort Implementation",
    content:
      "Example Implementation (Python):\n\ndef insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n\nprint(insertion_sort([5,3,8,4])) # [3,4,5,8]",
  },
  {
    id: "9",
    title: "Optimized Insertion Sort",
    content:
      "Insertion Sort is already efficient for small datasets. An optimization is to use binary search to find the correct position for insertion, reducing comparisons (but not shifts). This still results in O(n^2) complexity.",
  },
  {
    id: "10",
    title: "Real-World Usage of Insertion Sort",
    content:
      "Insertion Sort is commonly used in practice for small datasets or as a part of hybrid algorithms (e.g., Timsort in Python) where it sorts small partitions efficiently.",
  },
  {
    id: "11",
    title: "Java Code for Insertion Sort",
    content: `public class InsertionSort {
    public void sort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6};
        System.out.println("Original array:");
        printArray(arr);
        InsertionSort sorter = new InsertionSort();
        sorter.sort(arr);
        System.out.println("Sorted array:");
        printArray(arr);
    }
}`,
  },
  {
    id: "12",
    title: "C++ Code for Insertion Sort",
    content: `#include <iostream>
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}
void printArray(int arr[], int size) {
    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
}
int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    std::cout << "Original array: ";
    printArray(arr, n);
    insertionSort(arr, n);
    std::cout << "Sorted array: ";
    printArray(arr, n);
    return 0;
}`,
  },
   {
    id: "13",
    title: "Watch Insertion Sort Explained Video",
    isVideo: true,
  }
];

export default function Insertion_sort() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);

  const toggleExpand = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id));
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
                     source={require("../../assets/videos/insertion.mp4")} 
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
      <Text style={styles.sectionTitle}>INSERTION SORT</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={{ expandedItem, copiedItem }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  card: {
    backgroundColor: "#FAF3FF",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 20,
    textAlign: "center",
  },
  content: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "monospace",
  },
   video: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#000',
  },
});
