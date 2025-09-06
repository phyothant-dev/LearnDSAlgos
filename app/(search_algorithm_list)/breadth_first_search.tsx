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
    title: "What is Breadth First Search?",
    content:
      "Breadth First Search (BFS) is a graph traversal algorithm that explores vertices in the order of their distance from the starting vertex, visiting all neighbors at the current depth before moving to nodes at the next depth level.",
  },
  {
    id: "2",
    title: "How BFS Algorithm Works",
    content:
      "BFS uses a queue data structure. It starts from the source node, explores all its neighbors, then moves to the next level neighbors.",
  },
  {
    id: "3",
    title: "Performance Analysis of BFS",
    content:
      "The time complexity of BFS is O(V + E), where V is the number of vertices and E is the number of edges.",
  },
  {
    id: "4",
    title: "Breadth First Search Algorithm (Pseudocode)",
    isCode: true, // ✅ mark as code
    content: `procedure BFS(Graph, start_vertex)
    create a queue Q
    mark start_vertex as visited
    enqueue start_vertex into Q

    while Q is not empty do
        current ← dequeue Q
        for each neighbor v of current do
            if v is not visited then
                mark v as visited
                enqueue v into Q
    end while
end procedure`,
  },
  {
    id: "5",
    title: "Time Complexity of BFS",
    content: "Time Complexity: O(V + E)\nSpace Complexity: O(V)",
  },
  {
    id: "6",
    title: "Advantages of BFS",
    content: "1. Finds the shortest path in an unweighted graph\n2. Simple to implement",
  },
  {
    id: "7",
    title: "Disadvantages of BFS",
    content:
      "1. Requires more memory due to the queue\n2. Can be slower on very large graphs",
  },
  {
    id: "8",
    title: "BFS Implementation",
    isCode: true,
    content: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    while queue:
        node = queue.popleft()
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
  },
  {
    id: "9",
    title: "Java Code for Breadth First Search",
    isCode: true,
    content: `import java.util.LinkedList;
import java.util.Queue;
import java.util.ArrayList;
import java.util.List;

public class GraphBFS {
    private int V;
    private List<List<Integer>> adj;

    public GraphBFS(int v) {
        V = v;
        adj = new ArrayList<>(V);
        for (int i = 0; i < V; ++i) adj.add(new ArrayList<>());
    }

    public void addEdge(int v, int w) { adj.get(v).add(w); }

    public void BFS(int s) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        visited[s] = true;
        queue.add(s);

        while (!queue.isEmpty()) {
            s = queue.poll();
            System.out.print(s + " ");
            for (int n : adj.get(s)) {
                if (!visited[n]) {
                    visited[n] = true;
                    queue.add(n);
                }
            }
        }
    }

    public static void main(String[] args) {
        GraphBFS g = new GraphBFS(5);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        g.addEdge(2, 4);
        System.out.println("BFS traversal starting from vertex 0:");
        g.BFS(0);
    }
}`,
  },
  {
    id: "10",
    title: "C++ Code for Breadth First Search",
    isCode: true,
    content: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>

void bfs(const std::vector<std::vector<int>>& adj, int startNode) {
    std::unordered_set<int> visited;
    std::queue<int> q;
    visited.insert(startNode);
    q.push(startNode);

    std::cout << "BFS Traversal: ";
    while (!q.empty()) {
        int currentNode = q.front();
        q.pop();
        std::cout << currentNode << " ";
        for (int neighbor : adj[currentNode]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
    std::cout << std::endl;
}

int main() {
    std::vector<std::vector<int>> adj = {
        {1, 2}, {0, 3, 4}, {0, 5}, {1}, {1, 5}, {2, 4}
    };
    bfs(adj, 0);
    return 0;
}`,
  },
  {
    id: "11",
    title: "Watch BFS Explained Video",
    isVideo: true, // ✅ video flag
  },
];

export default function Breadth_First_Search() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const videoRef = useRef<Video>(null); // ✅ fixed

  const toggleExpand = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id));
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
      {expandedItem === item.id &&
        (item.isVideo ? (
          <Video
            ref={videoRef}
            style={styles.video}
            source={require("../../assets/videos/bfs.mp4")}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        ) : (
          <Text style={[styles.content, item.isCode && styles.codeBlock]}>
            {item.content}
          </Text>
        ))}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>BREADTH FIRST SEARCH (BFS)</Text>
      <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  card: {
    backgroundColor: "#FAF3FF",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },
  row: { flexDirection: "row", alignItems: "center" },
  video: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#000",
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
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    marginRight: 10,
  },
  title: { fontSize: 16, fontWeight: "bold", flexShrink: 1 },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: 20,
    textAlign: "center",
  },
  content: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "monospace",
  },
});
