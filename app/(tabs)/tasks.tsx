import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gift, Coins, Play, Crown } from 'lucide-react-native';
import { useState } from 'react';

const DAILY_TASKS = [
  {
    id: '1',
    title: 'View 3 Profiles',
    description: 'Discover new matches',
    reward: 10,
    target: 3,
    type: 'profiles',
  },
  {
    id: '2',
    title: 'Start a Chat',
    description: 'Begin a conversation',
    reward: 15,
    target: 1,
    type: 'chats',
  },
  {
    id: '3',
    title: 'Send 5 Messages',
    description: 'Keep the conversation going',
    reward: 20,
    target: 5,
    type: 'messages',
  },
];

const TOKEN_PACKAGES = [
  {
    id: '1',
    amount: 50,
    price: 5.99,
    image: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    amount: 100,
    price: 11.99,
    popular: true,
    image: 'https://images.pexels.com/photos/4386367/pexels-photo-4386367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    amount: 200,
    price: 19.99,
    image: 'https://images.pexels.com/photos/4386368/pexels-photo-4386368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function TasksScreen() {
  const insets = useSafeAreaInsets();
  const [taskProgress, setTaskProgress] = useState({
    profiles: 1,
    chats: 0,
    messages: 2,
  });

  const renderTask = (task) => {
    const progress = taskProgress[task.type];
    const percentage = (progress / task.target) * 100;

    return (
      <View key={task.id} style={styles.taskCard}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <View style={styles.rewardContainer}>
            <Coins size={16} color="#FF4B7E" />
            <Text style={styles.rewardText}>{task.reward}</Text>
          </View>
        </View>
        <Text style={styles.taskDescription}>{task.description}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${percentage}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {progress}/{task.target}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Tasks</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          {DAILY_TASKS.map(renderTask)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get More Tokens</Text>
          <View style={styles.tokenPackages}>
            {TOKEN_PACKAGES.map((pkg) => (
              <TouchableOpacity key={pkg.id} style={[styles.packageCard, pkg.popular && styles.popularPackage]}>
                {pkg.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                )}
                <Image source={{ uri: pkg.image }} style={styles.packageImage} />
                <View style={styles.packageInfo}>
                  <View style={styles.tokenAmount}>
                    <Coins size={20} color="#FF4B7E" />
                    <Text style={styles.amountText}>{pkg.amount} Tokens</Text>
                  </View>
                  <Text style={styles.priceText}>${pkg.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Free Tokens</Text>
          <View style={styles.freeTokens}>
            <TouchableOpacity style={styles.freeTokenCard}>
              <Play size={24} color="#FF4B7E" />
              <Text style={styles.freeTokenTitle}>Watch Ad</Text>
              <Text style={styles.freeTokenReward}>+5 Tokens</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.freeTokenCard}>
              <Crown size={24} color="#FF4B7E" />
              <Text style={styles.freeTokenTitle}>Go Premium</Text>
              <Text style={styles.freeTokenReward}>Unlimited Access</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rewardText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4B7E',
  },
  taskDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF4B7E',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64748B',
  },
  tokenPackages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  packageCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  popularPackage: {
    borderWidth: 2,
    borderColor: '#FF4B7E',
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF4B7E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  packageImage: {
    width: '100%',
    height: 120,
  },
  packageInfo: {
    padding: 12,
  },
  tokenAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  amountText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  priceText: {
    fontSize: 14,
    color: '#64748B',
  },
  freeTokens: {
    flexDirection: 'row',
    gap: 12,
  },
  freeTokenCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  freeTokenTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  freeTokenReward: {
    fontSize: 14,
    color: '#FF4B7E',
  },
});