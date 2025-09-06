import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";

// Define Question type
type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function DSAlgoQuiz() {
  const allQuestions: Question[] = [
    { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: "O(log n)" },
    { question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
    { question: "What is the time complexity of inserting in a hash table (average case)?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: "O(1)" },
    { question: "Which traversal of a binary search tree gives sorted output?", options: ["Preorder", "Postorder", "Inorder", "Level order"], answer: "Inorder" },
    { question: "Which sorting algorithm is the fastest on average?", options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"], answer: "Quick Sort" },
    { question: "Which data structure uses LIFO?", options: ["Stack", "Queue", "Heap", "Graph"], answer: "Stack" },
    { question: "Which algorithm is used to find the shortest path in a weighted graph?", options: ["DFS", "BFS", "Dijkstra’s Algorithm", "Prim’s Algorithm"], answer: "Dijkstra’s Algorithm" },
    { question: "What is the space complexity of Merge Sort?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: "O(n)" },
    { question: "Which of the following is a self-balancing BST?", options: ["AVL Tree", "Binary Tree", "Heap", "B-Tree"], answer: "AVL Tree" },
    { question: "In a max heap, the largest element is at the?", options: ["Leaf", "Root", "Middle", "None"], answer: "Root" },
    { question: "Which algorithm is best for finding connected components in a graph?", options: ["DFS", "BFS", "Kruskal’s", "Dijkstra’s"], answer: "DFS" },
    { question: "What is the best case complexity of Quick Sort?", options: ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"], answer: "O(n log n)" },
    { question: "Which data structure is used for recursion?", options: ["Queue", "Stack", "Heap", "Graph"], answer: "Stack" },
    { question: "What is the auxiliary space of BFS?", options: ["O(1)", "O(V)", "O(E)", "O(V+E)"], answer: "O(V)" },
    { question: "Which algorithm is used for cycle detection in a linked list?", options: ["Floyd’s Cycle Detection", "DFS", "BFS", "Bellman-Ford"], answer: "Floyd’s Cycle Detection" },
    { question: "Which of these is a divide and conquer algorithm?", options: ["Merge Sort", "Heap Sort", "Counting Sort", "Radix Sort"], answer: "Merge Sort" },
    { question: "What is the worst case complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: "O(log n)" },
    { question: "Which traversal is used in BFS?", options: ["Level order", "Inorder", "Postorder", "Preorder"], answer: "Level order" },
    { question: "What is the maximum number of nodes in a binary tree of height h?", options: ["2^h", "2^(h+1)-1", "h^2", "h*2"], answer: "2^(h+1)-1" },
    { question: "Which algorithm is used for minimum spanning tree?", options: ["Prim’s", "Dijkstra’s", "Bellman-Ford", "Floyd-Warshall"], answer: "Prim’s" },
    // Fill up until 100 questions...
  ];

  // Duplicate to reach 100 questions (temporary)
  while (allQuestions.length < 100) {
    allQuestions.push(
      ...allQuestions.slice(0, Math.min(20, 100 - allQuestions.length))
    );
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleRefresh = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 20));
    setAnswers({});
    setSubmitted(false);
  };

  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 20));
  }, []);

  const handleSelect = (qIndex: number, option: string) => {
    if (!submitted) {
      setAnswers({ ...answers, [qIndex]: option });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    return questions.reduce((score, q, i) => {
      if (answers[i] === q.answer) score++;
      return score;
    }, 0);
  };

  return (
    <ScreenWrapper bg="white">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Data Structures & Algorithms Quiz</Text>

        {questions.map((q, qIndex) => (
          <View key={qIndex} style={styles.questionBlock}>
            <Text style={styles.question}>
              {qIndex + 1}. {q.question}
            </Text>
            {q.options.map((option: string, oIndex: number) => {
              const isSelected = answers[qIndex] === option;
              const isCorrect = submitted && option === q.answer;
              const isWrong = submitted && isSelected && option !== q.answer;

              return (
                <TouchableOpacity
                  key={oIndex}
                  style={[
                    styles.option,
                    isSelected && !submitted && styles.selectedOption,
                    isCorrect && styles.correctOption,
                    isWrong && styles.wrongOption,
                  ]}
                  onPress={() => handleSelect(qIndex, option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {!submitted ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: "#28a745" }]}
              onPress={handleRefresh}
            >
              <Text style={styles.submitButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <Text style={styles.scoreText}>
              Your Score: {getScore()} / {questions.length}
            </Text>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: "#28a745" }]}
              onPress={handleRefresh}
            >
              <Text style={styles.submitButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
    textAlign: "center",
  },
  questionBlock: {
    marginBottom: 15,
    backgroundColor: "#f8f9fb",
    borderRadius: 8,
    padding: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
  option: {
    padding: 10,
    borderRadius: 6,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: {
    backgroundColor: "#d0ebff",
    borderColor: "#74c0fc",
  },
  correctOption: {
    backgroundColor: "#d3f9d8",
    borderColor: "#51cf66",
  },
  wrongOption: {
    backgroundColor: "#ffe3e3",
    borderColor: "#ff6b6b",
  },
  optionText: {
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 20,
    textAlign: "center",
  },
});
