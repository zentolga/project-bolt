import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Sample data for explore page
const EXPLORE_DATA = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Travel',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Food',
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Fashion',
  },
  {
    id: '4',
    image: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Technology',
  },
  {
    id: '5',
    image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Art',
  },
  {
    id: '6',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Fitness',
  },
];

// Trending topics
const TRENDING_TOPICS = [
  'Summer Travel', 'Home Cooking', 'Minimalism', 'Book Recommendations', 
  'Productivity Tips', 'Sustainable Living'
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const renderExploreItem = ({ item, index }: { item: typeof EXPLORE_DATA[0], index: number }) => {
    // Alternating large items (0, 3) and small items
    const isLarge = index % 3 === 0;
    
    return (
      <TouchableOpacity 
        style={[
          styles.exploreItem, 
          isLarge ? styles.largeItem : styles.smallItem
        ]}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.exploreImage}
          resizeMode="cover"
        />
        <View style={styles.exploreTitleContainer}>
          <Text style={styles.exploreTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={18} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for topics, people, or posts"
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View style={styles.trendingContainer}>
        <Text style={styles.sectionTitle}>Trending Topics</Text>
        <View style={styles.trendingTopics}>
          {TRENDING_TOPICS.map((topic, index) => (
            <TouchableOpacity key={index} style={styles.topicChip}>
              <Text style={styles.topicText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.exploreSectionContainer}>
        <Text style={styles.sectionTitle}>Discover Categories</Text>
        <FlatList
          data={EXPLORE_DATA}
          renderItem={renderExploreItem}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.exploreGrid}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 16,
    color: '#334155',
  },
  trendingContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  trendingTopics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicChip: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  topicText: {
    color: '#6D28D9',
    fontSize: 14,
    fontWeight: '500',
  },
  exploreSectionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  exploreGrid: {
    paddingBottom: 16,
  },
  exploreItem: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  smallItem: {
    flex: 1,
    marginHorizontal: 6,
    height: 140,
  },
  largeItem: {
    flex: 2,
    marginHorizontal: 6,
    height: 200,
  },
  exploreImage: {
    width: '100%',
    height: '100%',
  },
  exploreTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  exploreTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});