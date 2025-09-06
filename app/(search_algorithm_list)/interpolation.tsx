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
  isVideo?: boolean;
  isCode?: boolean;
};

const data: Item[] = [
  {
    id: "1",
    title: "What is Interpolation Search?",
    content:
      "Interpolation Search is an improved variant of Binary Search for uniformly distributed data. It estimates the probable position of the target element instead of always choosing the middle element.",
  },
  {
    id: "2",
    title: "How Interpolation Search Works",
    content:
      "1. Calculate the probe position using the formula:\n   pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])\n2. Compare the element at pos with the target.\n3. If it matches, return pos.\n4. If the target is smaller, search the left sub-array.\n5. If the target is larger, search the right sub-array.\n6. Repeat until the element is found or the range becomes invalid.",
  },
  {
    id: "3",
    title: "Performance Analysis of Interpolation Search",
    content:
      "Interpolation Search has an average time complexity of O(log log n) for uniformly distributed data, making it faster than Binary Search in such cases. However, in the worst case (skewed data), it can degrade to O(n).",
  },
  {
    id: "4",
    title: "Pseudocode of Interpolation Search",
    content: `function interpolationSearch(array, target):
    low = 0
    high = length(array) - 1

    while low <= high and target >= array[low] and target <= array[high]:
        pos = low + ((target - array[low]) * (high - low)) // (array[high] - array[low])

        if array[pos] == target:
            return pos
        else if array[pos] < target:
            low = pos + 1
        else:
            high = pos - 1

    return -1`,
    isCode: true,
  },
  {
    id: "5",
    title: "Time Complexity of Interpolation Search",
    content:
      "Best/Average Case: O(log log n) for uniformly distributed data.\nWorst Case: O(n) when the data is not uniformly distributed.\nSpace Complexity: O(1).",
  },
  {
    id: "6",
    title: "Advantages of Interpolation Search",
    content:
      "1. Faster than Binary Search for uniformly distributed data.\n2. Reduces number of comparisons significantly in best cases.\n3. Requires no extra space.",
  },
  {
    id: "7",
    title: "Disadvantages of Interpolation Search",
    content:
      "1. Performs poorly on non-uniform distributions.\n2. Calculation of probe position may be computationally expensive.\n3. Only works on sorted data.",
  },
  
  {
    id: "8",
    title: "Java Code for Interpolation Search",
    content: `public class InterpolationSearch {

    public static int interpolationSearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high && target >= arr[low] && target <= arr[high]) {
            if (arr[high] == arr[low]) {
                if (arr[low] == target) {
                    return low;
                } else {
                    return -1;
                }
            }

            int pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]);

            if (arr[pos] == target) {
                return pos;
            }

            if (arr[pos] < target) {
                low = pos + 1;
            } else {
                high = pos - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sortedArray = {10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47};
        int targetElement = 18;

        int index = interpolationSearch(sortedArray, targetElement);

        if (index != -1) {
            System.out.println("Element " + targetElement + " found at index: " + index);
        } else {
            System.out.println("Element " + targetElement + " not found in the array.");
        }

        targetElement = 50;
        index = interpolationSearch(sortedArray, targetElement);
        if (index != -1) {
            System.out.println("Element " + targetElement + " found at index: " + index);
        } else {
            System.out.println("Element " + targetElement + " not found in the array.");
        }
    }
}`,
    isCode: true,
  },
  {
    id: "9",
    title: "C++ Code for Interpolation Search",
    content: `#include <iostream>
using namespace std;

int interpolationSearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (arr[high] == arr[low]) {
            if (arr[low] == target)
                return low;
            else
                return -1;
        }

        int pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]);

        if (arr[pos] == target)
            return pos;

        if (arr[pos] < target)
            low = pos + 1;
        else
            high = pos - 1;
    }
    return -1;
}

int main() {
    int arr[] = {10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 18;

    int index = interpolationSearch(arr, n, target);

    if (index != -1)
        cout << "Element " << target << " found at index: " << index << endl;
    else
        cout << "Element " << target << " not found in the array." << endl;

    target = 50;
    index = interpolationSearch(arr, n, target);
    if (index != -1)
        cout << "Element " << target << " found at index: " << index << endl;
    else
        cout << "Element " << target << " not found in the array." << endl;

    return 0;
}`,
    isCode: true,
  },
  {
    id: "10",
    title: "Watch Interpolation Search Explained Video",
    isVideo: true,
  },
];

export default function Interpolation_Search() {
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
            onPress={() => copyToClipboard(item.content ?? "", item.id)}
            style={{ marginLeft: "auto" }}
          >
            {copiedItem === item.id ? (
              <Text style={{ color: "#28a745", fontWeight: "bold" }}>Copied!</Text>
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
            source={require("../../assets/videos/interpolation.mp4")}
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
      <Text style={styles.sectionTitle}>INTERPOLATION SEARCH</Text>
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
