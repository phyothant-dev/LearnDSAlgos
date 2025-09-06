import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
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
    title: 'How Merge Sort Works',
    content: 'Merge Sort is a divide-and-conquer algorithm. It divides the input array into two halves, recursively sorts them, and finally merges the two sorted halves into a single sorted array.'
  },
  {
    id: '2',
    title: 'Merge Sort Algorithm Steps',
    content: '1. Divide the array into two halves.\n2. Recursively sort the two halves.\n3. Merge the sorted halves back together.\nThe merge process ensures the final array is sorted.'
  },
  {
    id: '3',
    title: 'Key Characteristics of Merge Sort',
    content: '- Based on divide-and-conquer strategy.\n- Always runs in O(n log n) time.\n- Requires additional memory for merging.\n- Stable sort (preserves order of equal elements).'
  },
  {
    id: '4',
    title: 'Pseudocode for Merge Sort',
    content:
      'function mergeSort(arr):\n   if length of arr <= 1:\n      return arr\n   mid = length(arr) / 2\n   left = mergeSort(arr[0...mid])\n   right = mergeSort(arr[mid...end])\n   return merge(left, right)\n\nfunction merge(left, right):\n   result = []\n   while left and right not empty:\n      if left[0] <= right[0]:\n         result.push(left[0])\n         left.shift()\n      else:\n         result.push(right[0])\n         right.shift()\n   return result + left + right'
  },
  {
    id: '5',
    title: 'Performance Analysis of Merge Sort',
    content: 'Time Complexity:\n- Best Case: O(n log n)\n- Worst Case: O(n log n)\n- Average Case: O(n log n)\nSpace Complexity: O(n) (requires additional memory for merging).'
  },
  {
    id: '6',
    title: 'Advantages of Merge Sort',
    content: '1. Guaranteed O(n log n) performance in all cases.\n2. Stable sorting algorithm.\n3. Performs well on large datasets and linked lists.'
  },
  {
    id: '7',
    title: 'Disadvantages of Merge Sort',
    content: '1. Requires additional O(n) space for temporary arrays.\n2. Slower for small datasets compared to simple algorithms like Insertion Sort.\n3. Not an in-place sorting algorithm.'
  },
  {
    id: '8',
    title: 'Java Code for Merge Sort',
    content:
`public class MergeSort {
    public void sort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            sort(arr, left, mid);
            sort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    private void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        int[] L = new int[n1];
        int[] R = new int[n2];
        for (int i = 0; i < n1; ++i) L[i] = arr[left + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[mid + 1 + j];
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        MergeSort ob = new MergeSort();
        ob.sort(arr, 0, arr.length - 1);
        for (int x : arr) System.out.print(x + " ");
    }
}`
  },
  {
    id: '9',
    title: 'C++ Code for Merge Sort',
    content:
`#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    std::vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void printArray(const std::vector<int>& arr) {
    for (int x : arr) std::cout << x << " ";
    std::cout << std::endl;
}

int main() {
    std::vector<int> arr = {12, 11, 13, 5, 6, 7};
    std::cout << "Original array: ";
    printArray(arr);
    mergeSort(arr, 0, arr.size() - 1);
    std::cout << "Sorted array: ";
    printArray(arr);
    return 0;
}`
  },
  {
    id: "10",
    title: "Watch Merge Sort Explained Video",
    isVideo: true,
  }
];

export default function Merge_Sort() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const videoRef = useRef<Video | null>(null);

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
                          source={require("../../assets/videos/merge.mp4")} 
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
      <Text style={styles.sectionTitle}>MERGE SORT</Text>
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
