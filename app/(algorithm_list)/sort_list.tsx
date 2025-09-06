import ScreenWrapper from '@/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Sort_List = () => {
  const router = useRouter();
  const topics = [
    { title: 'Bubble Sort', image: require('../../assets/images/bubble.jpg') , routeTo: './../(sort_list)/bubble_sort' },
    { title: 'Heap Sort', image: require('../../assets/images/heap.jpg') , routeTo: './../(sort_list)/heap_sort' },
    { title: 'Merge Sort', image: require('../../assets/images/merge.png'), routeTo: './../(sort_list)/merge_sort' },
    { title: 'Quick Sort', image: require('../../assets/images/quick.png'), routeTo: './../(sort_list)/quick_sort' },
   { title: 'Selection Sort', image: require('../../assets/images/selection.png'), routeTo: './../(sort_list)/selection_sort' },
   { title: 'Insertion Sort', image: require('../../assets/images/insertion.png'), routeTo: './../(sort_list)/insertion_sort' },
  ];
  return (
    <ScreenWrapper bg="white">
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>SORTING ALGORITHMS</Text>
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
              />
    </View>
    </ScreenWrapper>
  )
}

export default Sort_List

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
    fontSize: 25,
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
