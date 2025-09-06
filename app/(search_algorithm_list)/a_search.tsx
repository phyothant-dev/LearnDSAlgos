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
    title: "What is A* Search?",
    content:
      "A* search is a graph traversal and pathfinding algorithm that finds the shortest path between nodes using heuristics to improve efficiency. It combines the benefits of Dijkstra’s Algorithm and Greedy Best-First Search.",
  },
  {
    id: "2",
    title: "How A* Search Algorithm Works",
    content:
      "A* uses a cost function f(n) = g(n) + h(n), where g(n) is the cost from the start to node n, and h(n) is the heuristic estimate from n to the goal. Nodes are explored based on the lowest f(n) value.",
  },
  {
    id: "3",
    title: "Performance Analysis of A* Search",
    content:
      "A* is optimal and complete if the heuristic h(n) is admissible (never overestimates the cost). Its performance depends on the accuracy of the heuristic.",
  },
  {
    id: "4",
    title: "Pseudocode of A* Search",
    content: `function A_Star(start, goal):
    openSet = {start}
    cameFrom = empty map

    gScore[start] = 0
    fScore[start] = heuristic(start, goal)

    while openSet is not empty:
        current = node in openSet with lowest fScore
        if current == goal:
            return reconstruct_path(cameFrom, current)

        remove current from openSet
        for each neighbor of current:
            tentative_gScore = gScore[current] + distance(current, neighbor)
            if tentative_gScore < gScore[neighbor]:
                cameFrom[neighbor] = current
                gScore[neighbor] = tentative_gScore
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal)
                if neighbor not in openSet:
                    add neighbor to openSet

    return failure`,
    isCode: true,
  },
  {
    id: "5",
    title: "Time Complexity of A* Search",
    content:
      "The time complexity depends on the heuristic but can be as bad as O(b^d) (similar to BFS) where b is branching factor and d is depth.",
  },
  {
    id: "6",
    title: "Advantages of A* Search",
    content:
      "1. Finds optimal path with admissible heuristics.\n2. Efficient compared to uninformed search.\n3. Widely used in AI, robotics, and gaming.",
  },
  {
    id: "7",
    title: "Disadvantages of A* Search",
    content:
      "1. Requires good heuristic for efficiency.\n2. May consume a lot of memory.\n3. Performance degrades with poor heuristic.",
  },
  
  {
    id: "8",
    title: "Java Code for A* Search",
    content: `import java.util.*;

class AStarNode implements Comparable<AStarNode> {
    int x, y, g, h;
    AStarNode parent;

    AStarNode(int x, int y, int g, int h, AStarNode parent) {
        this.x = x; this.y = y;
        this.g = g; this.h = h;
        this.parent = parent;
    }

    int f() { return g + h; }

    @Override
    public int compareTo(AStarNode other) {
        return Integer.compare(this.f(), other.f());
    }
}

public class AStarSearch {
    static int heuristic(int x1, int y1, int x2, int y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    public static void main(String[] args) {
        PriorityQueue<AStarNode> openSet = new PriorityQueue<>();
        boolean[][] closedSet = new boolean[5][5];
        int[][] grid = {
            {0,0,0,0,0},
            {0,1,1,0,0},
            {0,0,0,1,0},
            {0,1,0,0,0},
            {0,0,0,0,0}
        };

        int startX = 0, startY = 0;
        int goalX = 4, goalY = 4;

        openSet.add(new AStarNode(startX, startY, 0,
            heuristic(startX, startY, goalX, goalY), null));

        while (!openSet.isEmpty()) {
            AStarNode current = openSet.poll();

            if (current.x == goalX && current.y == goalY) {
                System.out.println("Path found!");
                return;
            }

            closedSet[current.x][current.y] = true;
            int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
            for (int[] d : dirs) {
                int nx = current.x + d[0], ny = current.y + d[1];
                if (nx>=0 && ny>=0 && nx<5 && ny<5 &&
                    grid[nx][ny]==0 && !closedSet[nx][ny]) {
                    int g = current.g + 1;
                    int h = heuristic(nx, ny, goalX, goalY);
                    openSet.add(new AStarNode(nx, ny, g, h, current));
                }
            }
        }
        System.out.println("No path found.");
    }
}`,
    isCode: true,
  },
  {
    id: "9",
    title: "C++ Code for A* Search",
    content: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int x, y, g, h;
    Node* parent;
    Node(int _x, int _y, int _g, int _h, Node* _p = nullptr)
        : x(_x), y(_y), g(_g), h(_h), parent(_p) {}
    int f() const { return g + h; }
};

struct Compare {
    bool operator()(const Node* a, const Node* b) {
        return a->f() > b->f();
    }
};

int heuristic(int x1, int y1, int x2, int y2) {
    return abs(x1 - x2) + abs(y1 - y2);
}

int main() {
    int grid[5][5] = {
        {0,0,0,0,0},
        {0,1,1,0,0},
        {0,0,0,1,0},
        {0,1,0,0,0},
        {0,0,0,0,0}
    };
    bool closed[5][5] = {};
    priority_queue<Node*, vector<Node*>, Compare> openSet;

    int startX = 0, startY = 0, goalX = 4, goalY = 4;
    openSet.push(new Node(startX, startY, 0,
        heuristic(startX, startY, goalX, goalY)));

    while (!openSet.empty()) {
        Node* current = openSet.top();
        openSet.pop();

        if (current->x == goalX && current->y == goalY) {
            cout << "Path found!\\n";
            return 0;
        }

        closed[current->x][current->y] = true;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        for (auto& d : dirs) {
            int nx = current->x + d[0], ny = current->y + d[1];
            if (nx>=0 && ny>=0 && nx<5 && ny<5 &&
                grid[nx][ny]==0 && !closed[nx][ny]) {
                int g = current->g + 1;
                int h = heuristic(nx, ny, goalX, goalY);
                openSet.push(new Node(nx, ny, g, h, current));
            }
        }
    }
    cout << "No path found.\\n";
    return 0;
}`,
    isCode: true,
  },
  {
    id: "10",
    title: "Watch A* Search Explained Video",
    isVideo: true,
  },
];

export default function A_Search() {
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

  const copyToClipboard = async (content: string, id: string) => {
    await Clipboard.setStringAsync(content);
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
            onPress={() => copyToClipboard(item.content!, item.id)}
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
            source={require("../../assets/videos/a search.mp4")}
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
      <Text style={styles.sectionTitle}>A* SEARCH</Text>
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
