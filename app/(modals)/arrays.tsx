import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from "expo-av";
import * as Clipboard from 'expo-clipboard';
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
  isCode?: boolean;
  isVideo?: boolean;
};

const data: Item[] = [
  {
    id: '1',
    title: 'What is an Array?',
    content:
      'An Array is a data structure that stores a collection of elements, typically of the same type, in a contiguous memory location. Each element can be accessed by its index.',
  },
  {
    id: '2',
    title: 'Characteristics of Arrays',
    content:
      '1. Fixed size (in most languages).\n2. Stores elements of the same type.\n3. Allows random access using indexes.\n4. Memory is allocated contiguously.',
  },
  {
    id: '3',
    title: 'Operations on Arrays',
    content:
      'Common operations on arrays include:\n- Traversal\n- Insertion\n- Deletion\n- Searching\n- Sorting',
  },
  {
    id: '4',
    title: 'Advantages of Arrays',
    content:
      '✔ Allows random access of elements.\n✔ Easy to iterate through elements.\n✔ Memory usage is efficient due to contiguous allocation.',
  },
  {
    id: '5',
    title: 'Disadvantages of Arrays',
    content:
      '✘ Fixed size in languages like C/C++/Java (cannot grow dynamically).\n✘ Insertion and deletion (except at the end) can be costly.\n✘ Wastage of memory if allocated size is not fully utilized.',
  },
  {
    id: '6',
    title: 'Time Complexity of Array Operations',
    content:
      '• Access by Index: O(1)\n• Search: O(n) (linear search)\n• Insertion at End: O(1)\n• Insertion at Beginning: O(n)\n• Deletion: O(n)',
  },
  {
    id: '7',
    title: 'Multidimensional Arrays',
    content:
      'A multidimensional array is an array of arrays. For example, a 2D array can be visualized as a table (matrix) of rows and columns.',
  },
  {
    id: '8',
    title: 'Example: 2D Array in JavaScript',
    content: `// 2D Array Example
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Accessing an element
console.log(matrix[1][2]); // Output: 6`,
    isCode: true,
  },
  {
    id: "10",
    title: "Java Code Example for Arrays",
    content: `public class Geeks {
    public static void main(String[] args) {

        // initializing array
        int[] arr = { 40,55,63,17,22,68,89,97,89};

        // size of array
        int n = arr.length;

        // traversing array
        for (int i = 0; i < n; i++)
            System.out.print(arr[i] + " ");
    }
}`,
    isCode: true,
  },
  {
    id: "11",
    title: "C++ Code Example for Arrays",
    content: `#include <iostream> // Required for input/output operations

int main() {
    // 1. Declare and initialize an array of integers
    int numbers[5] = {10, 20, 30, 40, 50};

    // 2. Accessing and printing array elements
    std::cout << "Elements of the array: " << std::endl;
    for (int i = 0; i < 5; ++i) {
        std::cout << "numbers[" << i << "] = " << numbers[i] << std::endl;
    }

    // 3. Modifying an array element
    numbers[2] = 35;

    // 4. Print the modified array
    std::cout << "\\nArray after modification: " << std::endl;
    for (int i = 0; i < 5; ++i) {
        std::cout << "numbers[" << i << "] = " << numbers[i] << std::endl;
    }

    // 5. Declare an array without immediate initialization
    double temperatures[7];

    // 6. Initialize elements of 'temperatures' array
    for (int i = 0; i < 7; ++i) {
        temperatures[i] = 20.0 + i;
    }

    std::cout << "\\nTemperatures array: " << std::endl;
    for (int i = 0; i < 7; ++i) {
        std::cout << "temperatures[" << i << "] = " << temperatures[i] << std::endl;
    }

    return 0;
}`,
    isCode: true,
  },
  {
    id: "9",
    title: "Watch Arrays Explained Video",
    isVideo: true,
  },
];

export default function Arrays() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

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
            source={require("../../assets/videos/array_video.mp4")}
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
      <Text style={styles.sectionTitle}>ARRAY</Text>
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
    fontSize: 18,
    color: "#333",
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
