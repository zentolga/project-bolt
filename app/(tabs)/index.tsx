import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, X, Coins, Crown } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const AI_CHARACTERS = [
  {
    id: '1',
    name: 'Sophie',
    age: 24,
    occupation: 'Travel Photographer',
    education: 'BA in Photography, NYU',
    bio: 'Adventure seeker with a passion for capturing life's beautiful moments. Let's explore the world together! 🌎✈️',
    quote: 'Life is either a daring adventure or nothing at all.',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    interests: ['Photography', 'Travel', 'Nature', 'Adventure'],
    tokenCost: 50,
    isPremium: false,
  },
  {
    id: '2',
    name: 'Emma',
    age: 23,
    occupation: 'Digital Artist',
    education: 'BFA in Digital Media, RISD',
    bio: 'Creating art that blends technology and emotion. Looking for someone who appreciates creativity and innovation. 🎨💻',
    quote: 'Art is the stored honey of the human soul.',
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/3062948/pexels-photo-3062948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2867921/pexels-photo-2867921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    interests: ['Digital Art', 'Technology', 'Music', 'Innovation'],
    tokenCost: 30,
    isPremium: false,
  },
  {
    id: '3',
    name: 'Lina',
    age: 25,
    occupation: 'Yoga Instructor',
    education: 'Certified Yoga Teacher, 500 RYT',
    bio: 'Finding balance in life through mindfulness and movement. Seeking a soul who values wellness and personal growth. 🧘‍♀️✨',
    quote: 'The journey of a thousand miles begins with a single step.',
    image: 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    interests: ['Yoga', 'Meditation', 'Wellness', 'Nature'],
    tokenCost: 40,
    isPremium: true,
  },
  {
    id: '4',
    name: 'Zara',
    age: 24,
    occupation: 'Fashion Designer',
    education: 'Fashion Institute of Technology',
    bio: 'Creating beauty through design and style. Looking for someone who appreciates art in all its forms. 👗✨',
    quote: 'Style is a way to say who you are without having to speak.',
    image: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2922301/pexels-photo-2922301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2922301/pexels-photo-2922301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    interests: ['Fashion', 'Art', 'Design', 'Travel'],
    tokenCost: 45,
    isPremium: true,
  }
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tokens, setTokens] = useState(100); // Initial tokens
  const [isPremium, setIsPremium] = useState(false);
  
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const character = AI_CHARACTERS[currentIndex];

  const nextCharacter = () => {
    if (currentIndex < AI_CHARACTERS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      translateX.value = 0;
      rotate.value = 0;
    }
  };

  const handleLike = () => {
    if (character.isPremium && !isPremium) {
      router.push('/premium');
      return;
    }

    if (tokens < character.tokenCost && !isPremium) {
      router.push('/tokens');
      return;
    }

    if (!isPremium) {
      setTokens(prev => prev - character.tokenCost);
    }

    translateX.value = withSpring(SCREEN_WIDTH * 1.5);
    setTimeout(() => {
      router.push(`/chat/${character.id}`);
    }, 500);
  };

  const handleNope = () => {
    translateX.value = withSpring(-SCREEN_WIDTH * 1.5);
    setTimeout(nextCharacter, 500);
  };

  const gesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
      rotate.value = event.translationX / SCREEN_WIDTH * 60;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        if (event.translationX > 0) {
          handleLike();
        } else {
          handleNope();
        }
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` }
    ]
  }));

  if (!character) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.noMoreText}>No more profiles to show!</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>AI Dating</Text>
        </View>
        <View style={styles.headerRight}>
          {isPremium ? (
            <Crown size={24} color="#FFD700" />
          ) : (
            <View style={styles.tokenContainer}>
              <Coins size={20} color="#FF4B7E" />
              <Text style={styles.tokenCount}>{tokens}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.card, cardStyle]}>
            <Image 
              source={{ uri: character.image }} 
              style={styles.cardImage}
            />
            {character.isPremium && !isPremium && (
              <View style={styles.premiumBadge}>
                <Crown size={16} color="#FFD700" />
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            )}
            <View style={styles.cardInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{character.name}, {character.age}</Text>
                {!isPremium && (
                  <View style={styles.tokenRequired}>
                    <Coins size={16} color="#FF4B7E" />
                    <Text style={styles.tokenCost}>{character.tokenCost}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.occupation}>{character.occupation}</Text>
              <Text style={styles.education}>{character.education}</Text>
              <Text style={styles.bio}>{character.bio}</Text>
              <Text style={styles.quote}>"{character.quote}"</Text>
              <View style={styles.interests}>
                {character.interests.map((interest, index) => (
                  <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.nopeButton]}
          onPress={handleNope}
        >
          <X size={30} color="#FF4B7E" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]}
          onPress={handleLike}
        >
          <Heart size={30} color="#FF4B7E" fill="#FF4B7E" />
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF4B7E',
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tokenCount: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4B7E',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_WIDTH * 1.6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '60%',
  },
  premiumBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  premiumText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
  },
  cardInfo: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  tokenRequired: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tokenCost: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4B7E',
  },
  occupation: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  education: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 12,
  },
  quote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#64748B',
    marginBottom: 12,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#FFE4E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    color: '#FF4B7E',
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  nopeButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF4B7E',
  },
  likeButton: {
    backgroundColor: '#FFE4E9',
    borderWidth: 2,
    borderColor: '#FF4B7E',
  },
  noMoreText: {
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
  },
});