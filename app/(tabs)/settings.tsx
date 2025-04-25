import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronRight, Bell, Lock, Eye, Moon, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

// Settings sections data
const SETTINGS_SECTIONS = [
  {
    title: 'Preferences',
    items: [
      {
        id: 'notifications',
        title: 'Notifications',
        icon: <Bell size={20} color="#64748B" />,
        type: 'navigate',
      },
      {
        id: 'darkMode',
        title: 'Dark Mode',
        icon: <Moon size={20} color="#64748B" />,
        type: 'toggle',
        value: false,
      },
    ],
  },
  {
    title: 'Privacy',
    items: [
      {
        id: 'privacy',
        title: 'Privacy Settings',
        icon: <Lock size={20} color="#64748B" />,
        type: 'navigate',
      },
      {
        id: 'visibleStatus',
        title: 'Visible Status',
        icon: <Eye size={20} color="#64748B" />,
        type: 'toggle',
        value: true,
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        id: 'help',
        title: 'Help Center',
        icon: <HelpCircle size={20} color="#64748B" />,
        type: 'navigate',
      },
    ],
  },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    darkMode: false,
    visibleStatus: true,
  });

  const handleToggle = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderSettingItem = (
    item: {
      id: string;
      title: string;
      icon: JSX.Element;
      type: string;
      value?: boolean;
    }
  ) => {
    return (
      <View key={item.id} style={styles.settingItem}>
        <View style={styles.settingItemLeft}>
          {item.icon}
          <Text style={styles.settingItemText}>{item.title}</Text>
        </View>
        
        {item.type === 'toggle' ? (
          <Switch
            value={settings[item.id]}
            onValueChange={() => handleToggle(item.id)}
            trackColor={{ false: '#E2E8F0', true: '#A78BFA' }}
            thumbColor={settings[item.id] ? '#6D28D9' : '#FFFFFF'}
          />
        ) : (
          <ChevronRight size={20} color="#94A3B8" />
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {SETTINGS_SECTIONS.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(item => renderSettingItem(item))}
            </View>
          </View>
        ))}
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#EF4444" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2025 SocialFeed</Text>
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
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6D28D9',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    color: '#334155',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 24,
    paddingBottom: 32,
  },
  appVersion: {
    fontSize: 14,
    color: '#94A3B8',
  },
  appCopyright: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
});