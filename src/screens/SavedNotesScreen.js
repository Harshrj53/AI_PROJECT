import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { getItems, storeItems, KEYS } from '../storage/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export const SavedNotesScreen = () => {
    const [items, setItems] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadAllSavedItems();
        }, [])
    );

    const loadAllSavedItems = async () => {
        const quizzes = await getItems(KEYS.QUIZ_HISTORY);
        const summaries = await getItems(KEYS.SUMMARY_NOTES);
        const fullNotes = await getItems(KEYS.FULL_NOTES);
        const videos = await getItems(KEYS.VIDEO_HISTORY);
        // Quick notes are managed in their own screen, but we could list them here too. 
        // The prompt says "List all saved: Summaries, Full notes, Quick notes, Quizzes, Video explanations".
        const quickNotes = await getItems(KEYS.QUICK_NOTES);

        const allItems = [
            ...quizzes.map(i => ({ ...i, type: 'Quiz', key: KEYS.QUIZ_HISTORY })),
            ...summaries.map(i => ({ ...i, type: 'Summary', key: KEYS.SUMMARY_NOTES })),
            ...fullNotes.map(i => ({ ...i, type: 'Full Note', key: KEYS.FULL_NOTES })),
            ...videos.map(i => ({ ...i, type: 'Video', key: KEYS.VIDEO_HISTORY })),
            ...quickNotes.map(i => ({ ...i, type: 'Quick Note', key: KEYS.QUICK_NOTES })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        setItems(allItems);
    };

    const handleDelete = async (item) => {
        Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        // Get current list for that key
                        const currentList = await getItems(item.key);
                        const newList = currentList.filter(i => i.id !== item.id);
                        await storeItems(item.key, newList);
                        loadAllSavedItems();
                    }
                }
            ]
        );
    };

    const handleClearAll = async () => {
        Alert.alert(
            'Clear All',
            'Are you sure you want to delete ALL saved items?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: async () => {
                        await storeItems(KEYS.QUIZ_HISTORY, []);
                        await storeItems(KEYS.SUMMARY_NOTES, []);
                        await storeItems(KEYS.FULL_NOTES, []);
                        await storeItems(KEYS.VIDEO_HISTORY, []);
                        await storeItems(KEYS.QUICK_NOTES, []);
                        loadAllSavedItems();
                    }
                }
            ]
        );
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Quiz': return 'brain';
            case 'Summary': return 'text-short';
            case 'Full Note': return 'notebook';
            case 'Video': return 'youtube';
            case 'Quick Note': return 'pencil';
            default: return 'file';
        }
    };

    return (
        <ScreenLayout>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Saved Library</Text>
                <TouchableOpacity onPress={handleClearAll}>
                    <Text style={styles.clearText}>Clear All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={items}
                keyExtractor={item => item.id + item.type}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <View style={styles.header}>
                            <View style={styles.typeContainer}>
                                <MaterialCommunityIcons name={getIcon(item.type)} size={16} color={theme.colors.primary} />
                                <Text style={styles.typeText}>{item.type}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDelete(item)}>
                                <MaterialCommunityIcons name="trash-can-outline" size={20} color={theme.colors.error} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.itemTitle}>
                            {item.topic || item.title || item.url || 'Untitled'}
                        </Text>

                        <Text style={styles.preview} numberOfLines={3}>
                            {item.content}
                        </Text>

                        <Text style={styles.date}>
                            {new Date(item.date).toLocaleDateString()}
                        </Text>
                    </Card>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No saved items found.</Text>
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
    clearText: {
        color: theme.colors.error,
        fontSize: 14,
    },
    card: {
        marginBottom: theme.spacing.m,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeText: {
        fontSize: 12,
        color: theme.colors.primary,
        marginLeft: 4,
        fontWeight: '600',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    preview: {
        fontSize: 14,
        color: theme.colors.subtext,
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: theme.colors.subtext,
        alignSelf: 'flex-end',
    },
    emptyText: {
        textAlign: 'center',
        color: theme.colors.subtext,
        marginTop: theme.spacing.xl,
    },
});
