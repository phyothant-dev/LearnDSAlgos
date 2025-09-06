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
  isVideo?: boolean;
  isCode?: boolean;
};

const data: Item[] = [
  {
    id: "1",
    title: "What is Binary Search?",
    content:
      "Binary Search is an efficient searching algorithm that works on sorted arrays by repeatedly dividing the search interval in half until the target element is found or the interval is empty.",
  },
  {
    id: "2",
    title: "How Binary Search Works",
    content:
      "1. Start with the middle element.\n2. If it matches the target, return its index.\n3. If the target is smaller, search the left half.\n4. If the target is larger, search the right half.\n5. Repeat until the element is found or the interval becomes empty.",
  },
  {
    id: "3",
    title: "Performance Analysis of Binary Search",
    content:
      "Binary Search has a time complexity of O(log n) and a space complexity of O(1) for the iterative version. It is significantly faster than linear search for large datasets.",
  },
  {
    id: "4",
    title: "Pseudocode of Binary Search",
    content: `function binarySearch(array, target):
    low = 0
    high = length(array) - 1

    while low <= high:
        mid = (low + high) // 2
        if array[mid] == target:
            return mid
        else if array[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    
    return -1`,
    isCode: true,
  },
  {
    id: "7",
    title: "Time Complexity of Binary Search",
    content:
      "Binary Search runs in O(log n) time, making it very efficient for large sorted datasets. However, it only works on sorted data.",
  },
  {
    id: "8",
    title: "Advantages of Binary Search",
    content:
      "1. Very efficient for large sorted datasets.\n2. Requires only O(1) extra space.\n3. Simple and easy to implement.",
  },
  {
    id: "9",
    title: "Disadvantages of Binary Search",
    content:
      "1. Only works on sorted data.\n2. Not suitable for linked lists without random access.\n3. Sorting the array beforehand adds overhead if not already sorted.",
  },
  {
    id: "5",
    title: "Java Code for Binary Search",
    content: `// Java implementation of iterative Binary Search
class Geeks {
    static int binarySearch(int a[], int l, int r, int x) {
        while (l <= r) {
            int m = (l + r) / 2;
            if (a[m] == x) {
                return m;
            } else if (a[m] > x) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
        return -1;
    }

    public static void main(String args[]) {
        int a[] = { 2, 3, 4, 10, 40 };
        int n = a.length;
        int x = 10;
        int res = binarySearch(a, 0, n - 1, x);
        System.out.println("Element to be searched is : " + x); 
        if (res == -1)
            System.out.println("Element is not present in array");
        else
            System.out.println("Element is present at index: " + res);
    }
}`,
    isCode: true,
  },
  {
    id: "6",
    title: "C++ Code for Binary Search",
    content: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

int main() {
    int data[] = {12, 23, 34, 56, 78, 89};
    int size = sizeof(data) / sizeof(data[0]);
    int target = 56;
    int result = binarySearch(data, size, target);
    if (result != -1) {
        cout << "Element found at index " << result << endl;
    } else {
        cout << "Element not found in the array." << endl;
    }
    return 0;
}`,
    isCode: true,
  },
  {
    id: "10",
    title: "Watch Binary Search Explained Video",
    isVideo: true,
  },
];

export default function Binary_Search() {
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
      {expandedItem === item.id && item.content && (
        <Text style={[styles.content, item.isCode && styles.codeBlock]}>{item.content}</Text>
      )}
      {expandedItem === item.id && (
              item.isVideo ? (
                <Video
                  ref={videoRef}
                  style={styles.video}
                  source={require("../../assets/videos/binary search.mp4")}
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
      <Text style={styles.sectionTitle}>BINARY SEARCH</Text>
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
