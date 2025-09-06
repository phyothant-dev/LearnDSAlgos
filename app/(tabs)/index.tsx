import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';

export default function Index() {
  const router = useRouter();

  const topics = [
  { title: 'Overview', image: require('../../assets/images/data structure.jpg'), routeTo: '/(modals)/overview' },
  { title: 'Data Structures', image: require('../../assets/images/ds_photo.png'), routeTo: '/(modals)/data_structure' },
  { title: 'Array', image: require('../../assets/images/array_photo.png'), routeTo: '/(modals)/arrays' },
  { title: 'Linked List', image: require('../../assets/images/linked_list_photo.png'), routeTo: '/(modals)/linked_list' },
  { title: 'Stack', image: require('../../assets/images/stack_photo.png'), routeTo: '/(modals)/stacks' },
  { title: 'Pointer', image: require('../../assets/images/pointer_photo.png'), routeTo: '/(modals)/pointers_page' },
  { title: 'Queue', image: require('../../assets/images/queue_photo.png'), routeTo: '/(modals)/queues' },
  { title: 'Tree', image: require('../../assets/images/tree_photo.png'), routeTo: '/(modals)/trees' },
  { title: 'Binary Tree', image: require('../../assets/images/binary_photo.png'), routeTo: '/(modals)/binary_trees' },
  { title: 'Binary Search Tree', image: require('../../assets/images/binary_search_tree_photo.png'), routeTo: '/(modals)/binary_search_trees' },
  { title: 'Hash Table', image: require('../../assets/images/hash.png'), routeTo: '/(modals)/hashtable' },
  { title: 'Graph', image: require('../../assets/images/graph.png'), routeTo: '/(modals)/graph' },
];


  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>DATA STRUCTURES</Text>
        <FlatList
          data={topics}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(item.routeTo as any)}

            >
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.title}
          numColumns={2}
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#f8f9fb',
    paddingHorizontal: 10,
    justifyContent:'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '45%',
    margin: 10,
    height: 150, // Set a fixed height for the card
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 0, // Remove padding so image can fill
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '75%', // Occupy most of the card
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2, // Remove padding to fill the card
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardText: {
    marginTop: 0,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 8,
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});