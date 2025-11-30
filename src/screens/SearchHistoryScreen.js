import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { getItems, KEYS, clearKey } from '../storage/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export const SearchHistoryScreen = ({ navigation }) => {
    const [history, setHistory] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadHistory();
        }, [])
    );

    const loadHistory = async () => {
        const data = await getItems(KEYS.SEARCH_HISTORY);
        setHistory(data);
    };

    const handleClear = async () => {
        await clearKey(KEYS.SEARCH_HISTORY);
        setHistory([]);
    };

    const handlePress = (item) => {
        // Navigate to respective screen with the query
        switch (item.type) {
            case 'quiz':
                navigation.navigate('QuizGenerator', { topic: item.query });
                break;
            case 'summary':
                navigation.navigate('SummaryGenerator', { topic: item.query });
                break;
            case 'full':
                navigation.navigate('FullNotesGenerator', { topic: item.query });
                break;
            case 'video':
                // For video, query might be "URL (Title)" or just URL.
                // We'll try to extract the URL.
                const url = item.query.split(' ')[0];
                navigation.navigate('VideoExplainer', { url });
                break;
            default:
                break;
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'quiz': return 'brain';
            case 'summary': return 'text-short';
            case 'full': return 'notebook';
            case 'video': return 'youtube';
            default: return 'magnify';
        }
    };

    return (
        <ScreenLayout>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Search History</Text>
                <TouchableOpacity onPress={handleClear}>
                    <Text style={styles.clearText}>Clear All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={history}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card onPress={() => handlePress(item)} style={styles.card}>
                        <View style={styles.row}>
                            <View style={styles.iconContainer}>
                                <MaterialCommunityIcons name={getIcon(item.type)} size={24} color={theme.colors.primary} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.query}>{item.query}</Text>
                                <Text style={styles.meta}>{item.type.toUpperCase()} • {new Date(item.timestamp).toLocaleDateString()}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color={theme.colors.subtext} />
                        </View>
                    </Card>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No history yet.</Text>
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
        padding: theme.spacing.s,
        marginBottom: theme.spacing.s,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.m,
    },
    textContainer: {
        flex: 1,
    },
    query: {
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 2,
    },
    meta: {
        fontSize: 12,
        color: theme.colors.subtext,
    },
    emptyText: {
        textAlign: 'center',
        color: theme.colors.subtext,
        marginTop: theme.spacing.xl,
    },
});
