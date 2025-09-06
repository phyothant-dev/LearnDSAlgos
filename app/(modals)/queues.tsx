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
  videoUri?: string;
};

const data: Item[] = [
  {
    id: "1",
    title: "What is a Queue?",
    content:
      "A Queue is a linear data structure that follows the FIFO (First In, First Out) principle. The first element added to the queue is the first one to be removed.",
  },
  {
    id: "2",
    title: "Characteristics of Queues",
    content:
      "✔ Follows FIFO order.\n" +
      "✔ Supports two main operations: Enqueue and Dequeue.\n" +
      "✔ Can be implemented using arrays, linked lists, or stacks.\n" +
      "✔ Variants include Circular Queue, Priority Queue, and Deque.",
  },
  {
    id: "3",
    title: "Basic Operations on Queues",
    content:
      "• Enqueue: Add an element to the rear of the queue.\n" +
      "• Dequeue: Remove an element from the front of the queue.\n" +
      "• Peek/Front: Retrieve the front element without removing it.\n" +
      "• isEmpty: Check whether the queue is empty.\n" +
      "• isFull (for fixed size): Check whether the queue is full.",
  },
  {
    id: "4",
    title: "Applications of Queues",
    content:
      "✔ Scheduling tasks in operating systems.\n" +
      "✔ Handling requests in web servers.\n" +
      "✔ Managing order in call centers.\n" +
      "✔ Implementing BFS (Breadth-First Search) in graphs.",
  },
  {
    id: "5",
    title: "Advantages of Queues",
    content:
      "✔ Ensures fair processing order (FIFO).\n✔ Simple and efficient to implement.\n✔ Useful in managing shared resources.",
  },
  {
    id: "6",
    title: "Disadvantages of Queues",
    content:
      "✘ Fixed size (when implemented with arrays).\n✘ Cannot access elements randomly.\n✘ May lead to wasted memory in a simple array-based implementation (solved by circular queues).",
  },
  {
    id: "7",
    title: "Time Complexity of Queue Operations",
    content:
      "• Enqueue: O(1)\n• Dequeue: O(1)\n• Peek: O(1)\n• Search: O(n)",
  },
  {
    id: "9",
    title: "Java code for Queue",
    content: `import java.util.LinkedList;
import java.util.Queue;
import java.util.PriorityQueue;

public class QueueExamples {
    public static void main(String[] args) {
        Queue<String> stringQueue = new LinkedList<>();
        stringQueue.offer("Apple");
        stringQueue.offer("Banana");
        stringQueue.offer("Cherry");
        System.out.println("LinkedList Queue: " + stringQueue);

        String removedElement = stringQueue.poll();
        System.out.println("Removed element: " + removedElement);
        System.out.println("LinkedList Queue after poll: " + stringQueue);

        String peekedElement = stringQueue.peek();
        System.out.println("Peeked element: " + peekedElement);
        System.out.println("LinkedList Queue after peek: " + stringQueue);

        Queue<Integer> priorityQueue = new PriorityQueue<>();
        priorityQueue.offer(5);
        priorityQueue.offer(1);
        priorityQueue.offer(8);
        System.out.println("PriorityQueue: " + priorityQueue);

        int removedPriorityElement = priorityQueue.poll();
        System.out.println("Removed element from PriorityQueue: " + removedPriorityElement);
        System.out.println("PriorityQueue after poll: " + priorityQueue);
    }
}`,
    isCode: true,
  },
  {
    id: "10",
    title: "C++ code for Queue",
    content: `#include <iostream>
#include <queue> // Required for std::queue

int main() {
    // Create a queue of integers
    std::queue<int> myQueue;

    // Enqueue elements (add to the back)
    myQueue.push(10);
    myQueue.push(20);
    myQueue.push(30);

    // Access the front element
    std::cout << "Front element: " << myQueue.front() << std::endl;

    // Access the back element
    std::cout << "Back element: " << myQueue.back() << std::endl;

    // Check if the queue is empty
    if (myQueue.empty()) {
        std::cout << "Queue is empty." << std::endl;
    } else {
        std::cout << "Queue is not empty. Size: " << myQueue.size() << std::endl;
    }

    // Dequeue elements (remove from the front)
    myQueue.pop(); // Removes 10
    std::cout << "Front element after pop: " << myQueue.front() << std::endl;

    myQueue.pop(); // Removes 20
    std::cout << "Front element after second pop: " << myQueue.front() << std::endl;

    myQueue.pop(); // Removes 30

    // Check if the queue is empty after all pops
    if (myQueue.empty()) {
        std::cout << "Queue is now empty." << std::endl;
    }

    return 0;
}`,
    isCode: true,
  },
  {
    id: "11",
    title: "Queue Video Explanation",
    videoUri: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

export default function QueueScreen() {
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
        item.videoUri ? (
          <Video
            ref={videoRef}
            style={styles.video}
            source={require("../../assets/videos/queue_video.mp4")}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        ) : (
          item.content && <Text style={[styles.content, item.isCode && styles.codeBlock]}>
            {item.content}
          </Text>
        )
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>QUEUE</Text>
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
