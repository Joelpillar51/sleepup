import React, { useState } from 'react';
import { View, StyleSheet, Switch, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { LogOut, ChevronRight, Bell, CreditCard, CircleHelp as HelpCircle, Settings, Moon } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppState } from '@/hooks/useAppState';
import Container from '@/components/common/Container';
import Text from '@/components/common/Text';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { BorderRadius, Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';
import AudioPlayer from '@/components/audio/AudioPlayer';

export default function ProfileScreen() {
  const { theme, colorScheme } = useTheme();
  const { user, player, updateUser } = useAppState();
  
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  
  const MenuItem = ({ icon, title, subtitle, onPress, showToggle, toggleValue, onToggle }: any) => (
    <TouchableOpacity
      style={[styles.menuItem, { borderBottomColor: theme.border }]}
      onPress={onPress}
      disabled={showToggle}
    >
      <View style={styles.menuItemIcon}>{icon}</View>
      <View style={styles.menuItemContent}>
        <Text variant="body" weight="medium">
          {title}
        </Text>
        {subtitle && (
          <Text variant="body-sm" color={theme.secondaryText}>
            {subtitle}
          </Text>
        )}
      </View>
      {showToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: theme.border, true: Colors.primary[600] }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <ChevronRight size={20} color={theme.secondaryText} />
      )}
    </TouchableOpacity>
  );
  
  return (
    <Container safeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h2">Profile</Text>
        </View>
        
        <Card style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
              style={styles.avatar}
            />
            <View style={styles.profileText}>
              <Text variant="h3">{user.name || 'Guest User'}</Text>
              <Text variant="body" color={theme.secondaryText}>
                Free Account
              </Text>
            </View>
          </View>
          
          <Button
            title="Upgrade to Premium"
            variant="outline"
            style={styles.upgradeButton}
          />
        </Card>
        
        <View style={styles.menuSection}>
          <Text variant="h4" style={styles.menuTitle}>
            App Settings
          </Text>
          
          <Card style={styles.menuCard}>
            <MenuItem
              icon={<Bell size={22} color={Colors.primary[500]} />}
              title="Reminders"
              subtitle="Set daily sound reminders"
              onPress={() => {}}
            />
            
            <MenuItem
              icon={<Moon size={22} color={Colors.primary[500]} />}
              title="Dark Mode"
              showToggle={true}
              toggleValue={darkMode}
              onToggle={(value: boolean) => setDarkMode(value)}
            />
            
            <MenuItem
              icon={<Settings size={22} color={Colors.primary[500]} />}
              title="App Settings"
              onPress={() => {}}
            />
          </Card>
        </View>
        
        <View style={styles.menuSection}>
          <Text variant="h4" style={styles.menuTitle}>
            Account
          </Text>
          
          <Card style={styles.menuCard}>
            <MenuItem
              icon={<CreditCard size={22} color={Colors.accent[500]} />}
              title="Subscription"
              subtitle={user.isPremium ? 'Premium Plan' : 'Free Plan'}
              onPress={() => {}}
            />
            
            <MenuItem
              icon={<HelpCircle size={22} color={Colors.accent[500]} />}
              title="Help & Support"
              onPress={() => {}}
            />
            
            <MenuItem
              icon={<LogOut size={22} color={Colors.error[500]} />}
              title="Sign Out"
              onPress={() => {}}
            />
          </Card>
        </View>
        
        <View style={styles.premiumCard}>
          <Card style={[styles.premiumCardContent, { backgroundColor: Colors.secondary[900] }]}>
            <Text variant="h3" color="#FFFFFF" style={styles.premiumTitle}>
              Upgrade to Premium
            </Text>
            
            <Text variant="body" color={Colors.secondary[100]} style={styles.premiumSubtitle}>
              Unlock all features and benefits
            </Text>
            
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <View style={styles.checkmark}>
                  <Text variant="body">✓</Text>
                </View>
                <Text variant="body" color="#FFFFFF">
                  Unlimited sound generation
                </Text>
              </View>
              
              <View style={styles.benefitItem}>
                <View style={styles.checkmark}>
                  <Text variant="body">✓</Text>
                </View>
                <Text variant="body" color="#FFFFFF">
                  Offline downloads
                </Text>
              </View>
              
              <View style={styles.benefitItem}>
                <View style={styles.checkmark}>
                  <Text variant="body">✓</Text>
                </View>
                <Text variant="body" color="#FFFFFF">
                  Custom playlists
                </Text>
              </View>
              
              <View style={styles.benefitItem}>
                <View style={styles.checkmark}>
                  <Text variant="body">✓</Text>
                </View>
                <Text variant="body" color="#FFFFFF">
                  7-day sound journeys
                </Text>
              </View>
            </View>
            
            <View style={styles.pricingOptions}>
              <TouchableOpacity
                style={[styles.pricingOption, { backgroundColor: Colors.secondary[700] }]}
              >
                <Text variant="body" weight="semibold" color="#FFFFFF">
                  Monthly
                </Text>
                <Text variant="body-sm" color={Colors.secondary[300]}>
                  $9.99/mo
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.pricingOption,
                  { backgroundColor: Colors.secondary[700], borderColor: Colors.secondary[400] },
                  styles.bestValue,
                ]}
              >
                <View style={styles.bestValueTag}>
                  <Text variant="caption" color="#FFFFFF">
                    BEST VALUE
                  </Text>
                </View>
                <Text variant="body" weight="semibold" color="#FFFFFF">
                  Yearly
                </Text>
                <Text variant="body-sm" color={Colors.secondary[300]}>
                  $89.99/yr
                </Text>
              </TouchableOpacity>
            </View>
            
            <Button
              title="Try 7 Days Free"
              style={[styles.trialButton, { backgroundColor: Colors.primary[500] }]}
            />
          </Card>
        </View>
      </ScrollView>
      
      {player.currentSound && <AudioPlayer mini />}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.lg,
  },
  profileCard: {
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.md,
  },
  profileText: {
    flex: 1,
  },
  upgradeButton: {
    alignSelf: 'flex-start',
  },
  menuSection: {
    marginBottom: Spacing.xl,
  },
  menuTitle: {
    marginBottom: Spacing.md,
  },
  menuCard: {
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
  },
  menuItemIcon: {
    marginRight: Spacing.md,
  },
  menuItemContent: {
    flex: 1,
  },
  premiumCard: {
    marginBottom: Spacing.xl,
  },
  premiumCardContent: {
    padding: Spacing.lg,
  },
  premiumTitle: {
    marginBottom: Spacing.xs,
  },
  premiumSubtitle: {
    marginBottom: Spacing.lg,
  },
  benefitsList: {
    marginBottom: Spacing.lg,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.secondary[400],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  pricingOptions: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  pricingOption: {
    flex: 1,
    padding: Spacing.md,
    marginRight: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  bestValue: {
    position: 'relative',
    paddingTop: Spacing.lg + 10,
  },
  bestValueTag: {
    position: 'absolute',
    top: -12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.accent[500],
    borderRadius: BorderRadius.sm,
  },
  trialButton: {
    width: '100%',
  },
});