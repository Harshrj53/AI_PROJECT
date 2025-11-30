import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { getItems, storeItems, KEYS } from '../storage/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export const QuickNotesScreen = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null); // { id, title, content, date }
    const [isEditing, setIsEditing] = useState(false);

    // Load notes when screen focuses or mode changes
    useFocusEffect(
        useCallback(() => {
            loadNotes();
        }, [])
    );

    const loadNotes = async () => {
        const savedNotes = await getItems(KEYS.QUICK_NOTES);
        setNotes(savedNotes);
    };

    const handleSaveNote = async () => {
        if (!currentNote) return;

        const updatedNotes = isEditing
            ? notes.map(n => n.id === currentNote.id ? { ...currentNote, date: new Date().toISOString() } : n)
            : [{ ...currentNote, id: Date.now().toString(), date: new Date().toISOString() }, ...notes];

        await storeItems(KEYS.QUICK_NOTES, updatedNotes);
        setNotes(updatedNotes);
        setCurrentNote(null);
        setIsEditing(false);
    };

    const handleDeleteNote = async (id) => {
        const updatedNotes = notes.filter(n => n.id !== id);
        await storeItems(KEYS.QUICK_NOTES, updatedNotes);
        setNotes(updatedNotes);
    };

    const startNewNote = () => {
        setCurrentNote({ title: '', content: '' });
        setIsEditing(false);
    };

    const editNote = (note) => {
        setCurrentNote(note);
        setIsEditing(true);
    };

    if (currentNote) {
        return (
            <ScreenLayout>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => setCurrentNote(null)} style={styles.backButton}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.primary} />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{isEditing ? 'Edit Note' : 'New Note'}</Text>
                    <TouchableOpacity onPress={handleSaveNote}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <Input
                    placeholder="Title"
                    value={currentNote.title}
                    onChangeText={(text) => setCurrentNote({ ...currentNote, title: text })}
                    style={styles.titleInput}
                />
                <Input
                    placeholder="Start typing..."
                    value={currentNote.content}
                    onChangeText={(text) => setCurrentNote({ ...currentNote, content: text })}
                    multiline
                    style={styles.contentInput}
                />
            </ScreenLayout>
        );
    }

    return (
        <ScreenLayout>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Quick Notes</Text>
                <Button
                    title="+ New"
                    onPress={startNewNote}
                    style={styles.newButton}
                    textStyle={{ fontSize: 14 }}
                />
            </View>

            <FlatList
                data={notes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card onPress={() => editNote(item)} style={styles.noteCard}>
                        <View style={styles.noteHeader}>
                            <Text style={styles.noteTitle} numberOfLines={1}>{item.title || 'Untitled'}</Text>
                            <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
                                <MaterialCommunityIcons name="trash-can-outline" size={20} color={theme.colors.error} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.notePreview} numberOfLines={2}>{item.content}</Text>
                        <Text style={styles.noteDate}>{new Date(item.date).toLocaleDateString()}</Text>
                    </Card>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No notes yet. Tap "+ New" to create one.</Text>
                }
            />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    newButton: {
        paddingVertical: theme.spacing.s,
        paddingHorizontal: theme.spacing.m,
    },
    noteCard: {
        marginBottom: theme.spacing.s,
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        flex: 1,
    },
    notePreview: {
        fontSize: 14,
        color: theme.colors.subtext,
        marginBottom: 8,
    },
    noteDate: {
        fontSize: 12,
        color: theme.colors.subtext,
        alignSelf: 'flex-end',
    },
    emptyText: {
        textAlign: 'center',
        color: theme.colors.subtext,
        marginTop: theme.spacing.xl,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: theme.colors.primary,
        fontSize: 16,
        marginLeft: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    saveText: {
        color: theme.colors.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    titleInput: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: theme.spacing.s,
        borderWidth: 0,
        backgroundColor: 'transparent',
        padding: 0,
    },
    contentInput: {
        flex: 1,
        textAlignVertical: 'top',
        borderWidth: 0,
        backgroundColor: 'transparent',
        padding: 0,
        fontSize: 16,
    },
});
