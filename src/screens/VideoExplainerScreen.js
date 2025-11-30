import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { generateResponse } from '../services/api';
import { saveItem, addToHistory, KEYS } from '../storage/storage';

export const VideoExplainerScreen = () => {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleGenerate = async () => {
        if (!url.trim()) {
            Alert.alert('Error', 'Please enter a YouTube URL');
            return;
        }

        setLoading(true);
        try {
            // We ask the user for the title/context because we can't scrape it easily from the frontend
            const promptContext = title ? `Title: ${title}` : 'the provided URL';
            const prompt = `Explain this video based on the title + description. URL: ${url}. ${promptContext}. Provide a summary of what this video is likely about.`;

            const response = await generateResponse(prompt);
            setResult(response);
            await addToHistory('video', url + (title ? ` (${title})` : ''));
        } catch (error) {
            Alert.alert('Error', 'Failed to generate explanation');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!result) return;

        const saved = await saveItem(KEYS.VIDEO_HISTORY, {
            id: Date.now().toString(),
            url,
            title,
            content: result,
            date: new Date().toISOString(),
        });

        if (saved) {
            Alert.alert('Success', 'Explanation saved!');
        }
    };

    return (
        <ScreenLayout scrollable>
            <Text style={styles.title}>YouTube Explainer</Text>
            <Text style={styles.subtitle}>Get an AI explanation of a video.</Text>

            <Card>
                <Input
                    label="YouTube URL"
                    placeholder="https://youtube.com/watch?v=..."
                    value={url}
                    onChangeText={setUrl}
                />
                <Input
                    label="Video Title / Context (Optional)"
                    placeholder="e.g. Introduction to React Native"
                    value={title}
                    onChangeText={setTitle}
                />
                <Button
                    title="Explain Video"
                    onPress={handleGenerate}
                    loading={loading}
                    style={{ backgroundColor: '#FF0000' }}
                />
            </Card>

            {result && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Explanation</Text>
                    <Card style={styles.resultCard}>
                        <Text style={styles.resultText}>{result}</Text>
                    </Card>
                    <Button
                        title="Save Explanation"
                        onPress={handleSave}
                        variant="secondary"
                        style={styles.saveButton}
                    />
                </View>
            )}
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: theme.colors.subtext,
        marginBottom: theme.spacing.l,
    },
    resultContainer: {
        marginTop: theme.spacing.l,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    resultCard: {
        backgroundColor: theme.colors.white,
    },
    resultText: {
        fontSize: 15,
        lineHeight: 24,
        color: theme.colors.text,
    },
    saveButton: {
        marginTop: theme.spacing.m,
    },
});
