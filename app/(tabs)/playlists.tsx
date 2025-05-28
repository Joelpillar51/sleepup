import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppState } from '@/hooks/useAppState';
import Container from '@/components/common/Container';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import PlaylistCard from '@/components/audio/PlaylistCard';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { BorderRadius, Spacing } from '@/constants/Spacing';
import { samplePlaylists } from '@/data/mockData';

export default function PlaylistsScreen() {
  const { theme } = useTheme();
  const { playlists, player, createPlaylist } = useAppState();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  
  // Add sample playlists for demo purposes
  useEffect(() => {
    if (playlists.length === 0) {
      samplePlaylists.forEach((playlist) => {
        createPlaylist(playlist.name, playlist.description);
      });
    }
  }, []);
  
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName, newPlaylistDescription);
      setNewPlaylistName('');
      setNewPlaylistDescription('');
      setModalVisible(false);
    }
  };
  
  return (
    <Container safeArea>
      <View style={styles.header}>
        <Text variant="h2">Your Playlists</Text>
        <Button
          title="Create New"
          leftIcon={<Plus size={18} color="#FFFFFF" />}
          onPress={() => setModalVisible(true)}
        />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {playlists.length === 0 ? (
          <View style={styles.emptyState}>
            <Text
              variant="body"
              color={theme.secondaryText}
              align="center"
              style={styles.emptyStateText}
            >
              You don't have any playlists yet. Create your first playlist to organize your sounds.
            </Text>
            <Button
              title="Create Playlist"
              leftIcon={<Plus size={18} color="#FFFFFF" />}
              onPress={() => setModalVisible(true)}
              style={styles.createButton}
            />
          </View>
        ) : (
          <View>
            <Text variant="h4" style={styles.sectionTitle}>
              All Playlists
            </Text>
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onPress={() => {}}
                onPlayPress={() => {
                  if (playlist.sounds.length > 0) {
                    // Play the first sound in the playlist
                  }
                }}
                onMorePress={() => {}}
              />
            ))}
          </View>
        )}
        
        <View style={styles.autogenSection}>
          <Card style={styles.autogenCard}>
            <Text variant="h4" style={styles.autogenTitle}>
              Auto-Generate Playlist
            </Text>
            <Text variant="body" color={theme.secondaryText} style={styles.autogenDescription}>
              Let AI create a playlist based on your listening habits and preferences.
            </Text>
            <Button title="Generate" variant="outline" />
          </Card>
        </View>
      </ScrollView>
      
      {/* Create Playlist Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text variant="h3">Create New Playlist</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputContainer}>
              <Text variant="body" style={styles.inputLabel}>
                Playlist Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    borderColor: theme.border,
                    backgroundColor: theme.background,
                  },
                ]}
                placeholder="Enter playlist name"
                placeholderTextColor={theme.secondaryText}
                value={newPlaylistName}
                onChangeText={setNewPlaylistName}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text variant="body" style={styles.inputLabel}>
                Description (Optional)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    color: theme.text,
                    borderColor: theme.border,
                    backgroundColor: theme.background,
                  },
                ]}
                placeholder="Enter a description"
                placeholderTextColor={theme.secondaryText}
                multiline
                numberOfLines={4}
                value={newPlaylistDescription}
                onChangeText={setNewPlaylistDescription}
              />
            </View>
            
            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                variant="outline"
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              />
              <Button
                title="Create"
                style={styles.modalButton}
                disabled={!newPlaylistName.trim()}
                onPress={handleCreatePlaylist}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {player.currentSound && <AudioPlayer mini />}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  emptyState: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    marginBottom: Spacing.lg,
  },
  createButton: {
    minWidth: 200,
  },
  autogenSection: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  autogenCard: {
    padding: Spacing.lg,
  },
  autogenTitle: {
    marginBottom: Spacing.xs,
  },
  autogenDescription: {
    marginBottom: Spacing.md,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 500,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.md,
  },
  modalButton: {
    marginLeft: Spacing.sm,
    minWidth: 100,
  },
});