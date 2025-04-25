import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, CreditCard as Edit2, Grid2x2 as Grid, Bookmark, Heart } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

// Sample user data
const USER_DATA = {
  name: 'Alex Rodriguez',
  username: '@alexrod',
  bio: 'Photographer | Traveler | Coffee Enthusiast\nCapturing moments and sharing stories.',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  stats: {
    posts: 143,
    followers: 2467,
    following: 518,
  },
  photos: [
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1322184/pexels-photo-1322184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1591382/pexels-photo-1591382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1456268/pexels-photo-1456268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
};

type TabType = 'posts' | 'saved' | 'liked';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('posts');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <View style={styles.photosGrid}>
            {USER_DATA.photos.map((photo, index) => (
              <TouchableOpacity key={index} style={styles.photoContainer}>
                <Image 
                  source={{ uri: photo }} 
                  style={styles.photo}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'saved':
        return (
          <View style={styles.emptyStateContainer}>
            <Bookmark size={48} color="#CBD5E1" />
            <Text style={styles.emptyStateText}>No saved posts yet</Text>
          </View>
        );
      case 'liked':
        return (
          <View style={styles.emptyStateContainer}>
            <Heart size={48} color="#CBD5E1" />
            <Text style={styles.emptyStateText}>No liked posts yet</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={22} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: USER_DATA.avatar }} style={styles.avatar} />
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{USER_DATA.stats.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{USER_DATA.stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{USER_DATA.stats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{USER_DATA.name}</Text>
          <Text style={styles.userHandle}>{USER_DATA.username}</Text>
          <Text style={styles.userBio}>{USER_DATA.bio}</Text>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Edit2 size={16} color="#6D28D9" style={styles.editIcon} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Grid size={22} color={activeTab === 'posts' ? '#6D28D9' : '#94A3B8'} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Bookmark size={22} color={activeTab === 'saved' ? '#6D28D9' : '#94A3B8'} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'liked' && styles.activeTab]}
            onPress={() => setActiveTab('liked')}
          >
            <Heart size={22} color={activeTab === 'liked' ? '#6D28D9' : '#94A3B8'} />
          </TouchableOpacity>
        </View>
        
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 24,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  profileInfo: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  userHandle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  userBio: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
    marginBottom: 16,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#6D28D9',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editIcon: {
    marginRight: 8,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6D28D9',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6D28D9',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  photoContainer: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 2,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 12,
  },
});