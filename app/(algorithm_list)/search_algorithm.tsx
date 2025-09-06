import ScreenWrapper from '@/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Search_Algorithm = () => {
  const router = useRouter();
  const topics = [
    { title: 'Linear Search', image: require('../../assets/images/linear.png') , routeTo: './../(search_algorithm_list)/linear_search' },
    { title: 'Binary Search', image: require('../../assets/images/binary.png') , routeTo: './../(search_algorithm_list)/binary_search' },
    { title: 'A* Search', image: require('../../assets/images/a.tsx.png'), routeTo: './../(search_algorithm_list)/a_search' },
    { title: 'Interpolation Search', image: require('../../assets/images/inter.png'), routeTo: './../(search_algorithm_list)/interpolation' },
    { title: 'Breadth First Search', image: require('../../assets/images/bfs.jpg'), routeTo: './../(search_algorithm_list)/breadth_first_search' },
    { title: 'Depth First Search', image: require('../../assets/images/dfs.jpg'), routeTo: './../(search_algorithm_list)/depth_first_search' },
   
  ];
  return (
    <ScreenWrapper bg="white">
    <View style={styles.container}>
       <Text style={styles.sectionTitle}>Searching Algorithm</Text>
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

export default Search_Algorithm

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
