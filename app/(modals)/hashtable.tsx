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
    title: "What is a Hash Table?",
    content:
      "A Hash Table is a data structure that maps keys to values for highly efficient lookups. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.",
  },
  {
    id: "2",
    title: "Characteristics of Hash Tables",
    content:
      "1. Key-value storage.\n2. Fast average-time complexity for lookups, insertions, and deletions.\n3. Uses a hash function to determine index.\n4. Handles collisions using chaining or open addressing.",
  },
  {
    id: "3",
    title: "Advantages of Hash Tables",
    content:
      "✔ O(1) average case for search, insert, and delete.\n✔ Can store a large amount of data efficiently.\n✔ Flexible key types depending on implementation.",
  },
  {
    id: "4",
    title: "Disadvantages of Hash Tables",
    content:
      "✘ Performance degrades to O(n) in worst-case (when many collisions occur).\n✘ Requires good hash function.\n✘ Not ordered — elements are not stored in sorted order.",
  },
  {
    id: "5",
    title: "Time Complexity of Hash Table Operations",
    content:
      "• Search: O(1) average, O(n) worst case.\n• Insert: O(1) average, O(n) worst case.\n• Delete: O(1) average, O(n) worst case.",
  },
  {
    id: "6",
    title: "Hash Table Pseudocode",
    content:
      "Pseudo-code:\n1. Initialize hash table with given size.\n2. Define hash_function(key):\n     → return index based on key.\n3. To insert(key, value):\n     a. Compute index = hash_function(key)\n     b. Place value in table[index] (handle collisions if needed)\n4. To search(key):\n     a. Compute index = hash_function(key)\n     b. Return value at table[index] if exists.\n5. To delete(key):\n     a. Compute index = hash_function(key)\n     b. Remove value at table[index]",
    isCode: true,
  },
  {
    id: "7",
    title: "Java code for Hash Table",
    content: `import java.util.Hashtable;
import java.util.Enumeration;

public class HashtableExample {
    public static void main(String[] args) {
        // 1. Create a Hashtable
        // The Hashtable stores key-value pairs. Here, String keys map to Integer values.
        Hashtable<String, Integer> studentScores = new Hashtable<>();

        // 2. Add elements to the Hashtable using put()
        studentScores.put("Alice", 95);
        studentScores.put("Bob", 88);
        studentScores.put("Charlie", 72);
        studentScores.put("David", 95); // Keys must be unique, values can be duplicated

        System.out.println("Hashtable after adding elements: " + studentScores);

        // 3. Retrieve a value using get()
        Integer bobScore = studentScores.get("Bob");
        if (bobScore != null) {
            System.out.println("Bob's score: " + bobScore);
        } else {
            System.out.println("Bob not found in the Hashtable.");
        }

        // 4. Check if a key exists using containsKey()
        if (studentScores.containsKey("Alice")) {
            System.out.println("Alice is in the Hashtable.");
        }

        // 5. Remove an entry using remove()
        studentScores.remove("Charlie");
        System.out.println("Hashtable after removing Charlie: " + studentScores);

        // 6. Iterate through the Hashtable keys using Enumeration
        System.out.println("Iterating through keys:");
        Enumeration<String> keys = studentScores.keys();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            System.out.println("Key: " + key + ", Value: " + studentScores.get(key));
        }

        // 7. Get the size of the Hashtable
        System.out.println("Size of Hashtable: " + studentScores.size());

        // 8. Check if the Hashtable is empty
        System.out.println("Is Hashtable empty? " + studentScores.isEmpty());
    }
}`
  },
  {    id: "8",
    title: "C++ code for Hash Table",
    content: `#include <iostream>
#include <cstring>

// Linked List node
struct node {
    // key is string
    char* key;
    // value is also string
    char* value;
    struct node* next;
};

// like constructor
void setNode(struct node* node, char* key, char* value) {
    node->key = key;
    node->value = value;
    node->next = NULL;
    return;
}

struct hashMap {
    // Current number of elements in hashMap
    // and capacity of hashMap
    int numOfElements, capacity;
    // hold base address array of linked list
    struct node** arr;
};

// like constructor
void initializeHashMap(struct hashMap* mp) {
    // Default capacity in this case
    mp->capacity = 100;
    mp->numOfElements = 0;
    // array of size = 1
    mp->arr = (struct node**)malloc(sizeof(struct node*) * mp->capacity);
    return;
}

int hashFunction(struct hashMap* mp, char* key) {
    int bucketIndex;
    int sum = 0, factor = 31;
    for (int i = 0; i < strlen(key); i++) {
        // sum = sum + (ascii value of
        // char * (primeNumber ^ x))...
        // where x = 1, 2, 3....n
        sum = ((sum % mp->capacity) + (((int)key[i]) * factor) % mp->capacity) % mp->capacity;
        // factor = factor * prime
        // number....(prime
        // number) ^ x
        factor = ((factor % __INT16_MAX__) * (31 % __INT16_MAX__)) % __INT16_MAX__;
    }
    bucketIndex = sum;
    return bucketIndex;
}

void insert(struct hashMap* mp, char* key, char* value) {
    // Getting bucket index for the given
    // key - value pair
    int bucketIndex = hashFunction(mp, key);
    struct node* newNode = (struct node*)malloc(
        // Creating a new node
        sizeof(struct node));
    // Setting value of node
    setNode(newNode, key, value);
    // Bucket index is empty....no collision
    if (mp->arr[bucketIndex] == NULL) {
        mp->arr[bucketIndex] = newNode;
    }
    // Collision
    else {
        // Adding newNode at the head of
        // linked list which is present
        // at bucket index....insertion at
        // head in linked list
        newNode->next = mp->arr[bucketIndex];
        mp->arr[bucketIndex] = newNode;
    }
    return;
}

void deleteKey(struct hashMap* mp, char* key) {
    // Getting bucket index for the
    // given key
    int bucketIndex = hashFunction(mp, key);
    struct node* prevNode = NULL;
    // Points to the head of
    // linked list present at
    // bucket index
    struct node* currNode = mp->arr[bucketIndex];
    while (currNode != NULL) {
        // Key is matched at delete this
        // node from linked list
        if (strcmp(key, currNode->key) == 0) {
            // Head node
            // deletion
            if (currNode == mp->arr[bucketIndex]) {
                mp->arr[bucketIndex] = currNode->next;
            }
            // Last node or middle node
            else {
                prevNode->next = currNode->next;
}
free(currNode);
break;
}

prevNode = currNode;
        currNode = currNode->next;
    }
return;
}

char* search(struct hashMap* mp, char* key) {
// Getting the bucket index for the given key
int bucketIndex = hashFunction(mp, key);
// Head of the linked list present at bucket index
struct node* bucketHead = mp->arr[bucketIndex];

while (bucketHead != NULL) {
    
    // Key is found in the hashMap
    if (strcmp(bucketHead->key, key) == 0) {
        return bucketHead->value;
    }
    
    bucketHead = bucketHead->next;
}

// If no key found in the hashMap equal to the given key
char* errorMssg = (char*)malloc(sizeof(char) * 25);
strcpy(errorMssg, "Oops! No data found.\n");
return errorMssg;
}


// Drivers code
int main()
{
// Initialize the value of mp
struct hashMap* mp = (struct hashMap*)malloc(sizeof(struct hashMap));
initializeHashMap(mp);
insert(mp, "Yogaholic", "Anjali");
insert(mp, "pluto14", "Vartika");
insert(mp, "elite_Programmer", "Manish");
insert(mp, "GFG", "GeeksforGeeks");
insert(mp, "decentBoy", "Mayank");

printf("%s\n", search(mp, "elite_Programmer"));
printf("%s\n", search(mp, "Yogaholic"));
printf("%s\n", search(mp, "pluto14"));
printf("%s\n", search(mp, "decentBoy"));
printf("%s\n", search(mp, "GFG"));

// Key is not inserted
printf("%s\n", search(mp, "randomKey"));

printf("\nAfter deletion : \n");

// Deletion of key
deleteKey(mp, "decentBoy");

// Searching the deleted key
printf("%s\n", search(mp, "decentBoy"));
return 0;
}`
  } , 
  {
    id: "9",
    title: "Watch Hash Table Explained Video",
    isVideo: true,
  },
];

export default function HashTable() {
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
                    source={require("../../assets/videos/hash_video.mp4")}
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
      <Text style={styles.sectionTitle}>HASH TABLE</Text>
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
