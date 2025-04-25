import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Share, MoveVertical as MoreVertical } from 'lucide-react-native';
import { useState } from 'react';

type User = {
  name: string;
  avatar: string;
};

type PostCardProps = {
  id: string;
  user: User;
  content: string;
  image?: string | null;
  likes: number;
  comments: number;
  timestamp: string;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
};

export default function PostCard({
  id,
  user,
  content,
  image,
  likes,
  comments,
  timestamp,
  onLike,
  onComment,
  onShare,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    if (onLike) {
      onLike(id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={20} color="#64748B" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.content}>{content}</Text>
      
      {image && (
        <Image 
          source={{ uri: image }} 
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.stats}>
        <Text style={styles.statsText}>{likesCount} likes • {comments} comments</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleLike}
        >
          <Heart 
            size={22} 
            color={isLiked ? '#EF4444' : '#64748B'} 
            fill={isLiked ? '#EF4444' : 'transparent'}
          />
          <Text style={[styles.actionText, isLiked && styles.likedText]}>Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onComment?.(id)}
        >
          <MessageCircle size={22} color="#64748B" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onShare?.(id)}
        >
          <Share size={22} color="#64748B" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  timestamp: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  image: {
    width: '100%',
    height: 300,
  },
  stats: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  statsText: {
    fontSize: 14,
    color: '#64748B',
  },
  actions: {
    flexDirection: 'row',
    padding: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#64748B',
  },
  likedText: {
    color: '#EF4444',
  }
});