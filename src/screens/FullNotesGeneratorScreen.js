import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { generateResponse } from '../services/api';
import { saveItem, addToHistory, KEYS } from '../storage/storage';

export const FullNotesGeneratorScreen = () => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            Alert.alert('Error', 'Please enter a topic');
            return;
        }

        setLoading(true);
        try {
            const prompt = `Generate detailed, structured notes on the topic: ${topic}. Use headings, bullet points, and clear sections.`;
            const response = await generateResponse(prompt);
            setResult(response);
            await addToHistory('full', topic);
        } catch (error) {
            Alert.alert('Error', 'Failed to generate notes');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!result) return;

        const saved = await saveItem(KEYS.FULL_NOTES, {
            id: Date.now().toString(),
            topic,
            content: result,
            date: new Date().toISOString(),
        });

        if (saved) {
            Alert.alert('Success', 'Notes saved!');
        }
    };

    return (
        <ScreenLayout scrollable>
            <Text style={styles.title}>Full Notes Generator</Text>
            <Text style={styles.subtitle}>Generate comprehensive study notes.</Text>

            <Card>
                <Input
                    label="Topic"
                    placeholder="e.g. Machine Learning Algorithms"
                    value={topic}
                    onChangeText={setTopic}
                />
                <Button
                    title="Generate Notes"
                    onPress={handleGenerate}
                    loading={loading}
                />
            </Card>

            {result && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Detailed Notes</Text>
                    <Card style={styles.resultCard}>
                        <Text style={styles.resultText}>{result}</Text>
                    </Card>
                    <Button
                        title="Save Notes"
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
