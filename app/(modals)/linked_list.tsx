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
    id: "1",
    title: "What is a Linked List?",
    content:
      "A Linked List is a linear data structure where elements (nodes) are connected using pointers. Each node contains data and a reference (pointer) to the next node in the sequence.",
  },
  {
    id: "2",
    title: "Types of Linked Lists",
    content:
      "1. Singly Linked List – Each node points to the next node and the last node points to null.\n" +
      "2. Doubly Linked List – Each node points to both its previous and next node.\n" +
      "3. Circular Linked List – The last node points back to the first node forming a circle.",
  },
  {
    id: "3",
    title: "Characteristics of Linked Lists",
    content:
      "✔ Dynamic size (can grow or shrink at runtime).\n" +
      "✔ Efficient insertion and deletion compared to arrays.\n" +
      "✘ Random access is not possible (must traverse from head).\n" +
      "✘ Requires extra memory for pointers.",
  },
  {
    id: "4",
    title: "Basic Operations on Linked Lists",
    content:
      "• Traversal\n• Insertion (at beginning, end, or specific position)\n• Deletion\n• Searching\n• Reversing",
  },
  {
    id: "5",
    title: "Advantages of Linked Lists",
    content:
      "✔ Dynamic memory allocation.\n✔ Easy insertion/deletion without shifting elements.\n✔ Efficient memory usage when the size of data is unknown.",
  },
  {
    id: "6",
    title: "Disadvantages of Linked Lists",
    content:
      "✘ Extra memory for storing pointers.\n✘ Sequential access only (no random access).\n✘ More complex than arrays.",
  },
  {
    id: "7",
    title: "Time Complexity of Linked List Operations",
    content:
      "• Traversal: O(n)\n• Search: O(n)\n• Insertion at Beginning: O(1)\n• Insertion at End: O(n) (unless tail pointer is maintained)\n• Deletion: O(1) (if node is given) or O(n) (if searching first)",
  },
  {
    id: "8",
    title: "Java Code for Linked List",
    content: `public class LinkedList {

    // Node class represents an element in the linked list
    Node head; // Head of the linked list

    static class Node {
        int data;
        Node next; // Pointer to the next node

        // Constructor to create a new node
        Node(int d) {
            data = d;
            next = null;
        }
    }

    // Method to insert a new node at the end of the list
    public static LinkedList insert(LinkedList list, int data) {
        // Create a new node with the given data
        Node new_node = new Node(data);
        new_node.next = null; // Set next to null as it's the last node for now

        // If the Linked List is empty, then make the new node as head
        if (list.head == null) {
            list.head = new_node;
        } else {
            // Else traverse till the last node and insert the new_node there
            Node last = list.head;
            while (last.next != null) {
                last = last.next;
            }
            // Insert the new_node at last position
            last.next = new_node;
        }
        return list;
    }

    // Method to print the LinkedList
    public static void printList(LinkedList list) {
        Node currNode = list.head;
        System.out.print("LinkedList: ");

        // Traverse through the LinkedList
        while (currNode != null) {
            // Print the data at current node
            System.out.print(currNode.data + " ");

            // Go to next node
            currNode = currNode.next;
        }
        System.out.println();
    }

    // Driver code
    public static void main(String[] args) {
        LinkedList list = new LinkedList();

        // Insert values
        list = insert(list, 1);
        list = insert(list, 2);
        list = insert(list, 3);
        list = insert(list, 4);
        list = insert(list, 5);

        // Print the LinkedList
        printList(list);
    }
}`,
    isCode: true,
  },
  {
    id: "9",
    title: "C++ Code for Linked List",
    content: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;

    LinkedList() {
        head = nullptr;
    }

    void insertAtHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    void insertAtEnd(int val) {
        Node* newNode = new Node(val);
        if (head == nullptr) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
    }

    void deleteByValue(int val) {
        if (head == nullptr) return;

        if (head->data == val) {
            Node* temp = head;
            head = head->next;
            delete temp;
            return;
        }

        Node* temp = head;
        while (temp->next && temp->next->data != val) {
            temp = temp->next;
        }

        if (temp->next) {
            Node* del = temp->next;
            temp->next = temp->next->next;
            delete del;
        }
    }

    void printList() {
        Node* temp = head;
        while (temp) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "nullptr" << endl;
    }
};

int main() {
    LinkedList list;

    list.insertAtHead(3);
    list.insertAtHead(2);
    list.insertAtHead(1); // List: 1 -> 2 -> 3 -> nullptr

    list.insertAtEnd(4); // List: 1 -> 2 -> 3 -> 4 -> nullptr

    cout << "Initial list: ";
    list.printList();

    list.deleteByValue(2); // List: 1 -> 3 -> 4 -> nullptr
    cout << "List after deleting 2: ";
    list.printList();

    list.deleteByValue(1); // List: 3 -> 4 -> nullptr
    cout << "List after deleting 1: ";
    list.printList();

    list.deleteByValue(4); // List: 3 -> nullptr
    cout << "List after deleting 4: ";
    list.printList();

    return 0;
}`,
    isCode: true,
  },
  {
    id: "10",
    title: "Watch Linked List Explained Video",
    isVideo: true,
  },
];

export default function LinkedList() {
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
            source={require("../../assets/videos/linked_list.mp4")}
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
      <Text style={styles.sectionTitle}>LINKED LIST</Text>
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
