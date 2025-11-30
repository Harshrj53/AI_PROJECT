import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { generateResponse } from '../services/api';
import { saveItem, addToHistory, KEYS } from '../storage/storage';

export const QuizGeneratorScreen = () => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            Alert.alert('Error', 'Please enter a topic');
            return;
        }

        setLoading(true);
        setQuizData(null);
        setUserAnswers({});
        setShowResults(false);

        try {
            const prompt = `Generate a multiple choice quiz (3 questions) on the topic: "${topic}". 
      Return ONLY valid JSON in this format: 
      [
        {
          "question": "Question text",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Option A"
        }
      ]
      Do not include any markdown formatting or extra text.`;

            const response = await generateResponse(prompt);

            // Try to parse JSON
            let parsed = [];
            try {
                // Clean up markdown code blocks if present
                const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
                parsed = JSON.parse(cleanJson);
            } catch (e) {
                console.error('JSON Parse Error:', e);
                Alert.alert('Error', 'Failed to parse quiz data. Showing raw text instead.');
                return;
            }

            setQuizData(parsed);
            await addToHistory('quiz', topic);
        } catch (error) {
            Alert.alert('Error', 'Failed to generate quiz');
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (questionIndex, option) => {
        if (showResults) return; // Disable changing after submission
        setUserAnswers(prev => ({
            ...prev,
            [questionIndex]: option
        }));
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const handleSave = async () => {
        if (!quizData) return;

        const saved = await saveItem(KEYS.QUIZ_HISTORY, {
            id: Date.now().toString(),
            topic,
            content: JSON.stringify(quizData), // Save as string for consistency
            date: new Date().toISOString(),
        });

        if (saved) {
            Alert.alert('Success', 'Quiz saved to library!');
        }
    };

    const getOptionStyle = (qIndex, option) => {
        if (!showResults) {
            return userAnswers[qIndex] === option ? styles.selectedOption : styles.option;
        }

        const correctAnswer = quizData[qIndex].answer;
        const isSelected = userAnswers[qIndex] === option;

        if (option === correctAnswer) return styles.correctOption;
        if (isSelected && option !== correctAnswer) return styles.wrongOption;
        return styles.option;
    };

    return (
        <ScreenLayout scrollable>
            <Text style={styles.title}>AI Quiz Generator</Text>
            <Text style={styles.subtitle}>Enter a topic to generate a practice quiz.</Text>

            <Card>
                <Input
                    label="Topic"
                    placeholder="e.g. Photosynthesis, World War II"
                    value={topic}
                    onChangeText={setTopic}
                />
                <Button
                    title="Generate Quiz"
                    onPress={handleGenerate}
                    loading={loading}
                />
            </Card>

            {quizData && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Quiz: {topic}</Text>

                    {quizData.map((q, index) => (
                        <Card key={index} style={styles.questionCard}>
                            <Text style={styles.questionText}>{index + 1}. {q.question}</Text>
                            {q.options.map((option, optIndex) => (
                                <TouchableOpacity
                                    key={optIndex}
                                    style={[styles.optionButton, getOptionStyle(index, option)]}
                                    onPress={() => handleOptionSelect(index, option)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </Card>
                    ))}

                    {!showResults ? (
                        <Button title="Submit Answers" onPress={handleSubmit} style={styles.submitButton} />
                    ) : (
                        <View>
                            <Text style={styles.scoreText}>
                                Score: {quizData.filter((q, i) => userAnswers[i] === q.answer).length} / {quizData.length}
                            </Text>
                            <Button
                                title="Save Quiz"
                                onPress={handleSave}
                                variant="secondary"
                                style={styles.saveButton}
                            />
                        </View>
                    )}
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
        paddingBottom: 40,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    questionCard: {
        marginBottom: theme.spacing.m,
    },
    questionText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    optionButton: {
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.s,
        backgroundColor: theme.colors.white,
    },
    selectedOption: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary + '10', // 10% opacity
    },
    correctOption: {
        borderColor: theme.colors.success,
        backgroundColor: theme.colors.success + '20',
    },
    wrongOption: {
        borderColor: theme.colors.error,
        backgroundColor: theme.colors.error + '20',
    },
    optionText: {
        fontSize: 14,
        color: theme.colors.text,
    },
    submitButton: {
        marginTop: theme.spacing.m,
        backgroundColor: theme.colors.success,
    },
    saveButton: {
        marginTop: theme.spacing.m,
    },
    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary,
        textAlign: 'center',
        marginVertical: theme.spacing.m,
    },
});
