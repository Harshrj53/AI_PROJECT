import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../components/Card';
import { ScreenLayout } from '../components/ScreenLayout';
import { theme } from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MenuOption = ({ title, icon, color, onPress, description }) => (
    <Card onPress={onPress} style={styles.menuCard}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <MaterialCommunityIcons name={icon} size={32} color={color} />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.menuTitle}>{title}</Text>
            <Text style={styles.menuDesc}>{description}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.subtext} />
    </Card>
);

export const HomeScreen = ({ navigation }) => {
    return (
        <ScreenLayout scrollable>
            <View style={styles.header}>
                <Text style={styles.greeting}>Welcome back!</Text>
                <Text style={styles.title}>AI Study Buddy</Text>
                <Text style={styles.subtitle}>Your smart learning assistant</Text>
            </View>

            <Text style={styles.sectionTitle}>Tools</Text>

            <MenuOption
                title="AI Quiz Generator"
                description="Test your knowledge with AI-generated quizzes"
                icon="brain"
                color="#FF6B6B"
                onPress={() => navigation.navigate('QuizGenerator')}
            />

            <MenuOption
                title="Summary Notes"
                description="Get quick summaries of any topic"
                icon="text-short"
                color="#4ECDC4"
                onPress={() => navigation.navigate('SummaryGenerator')}
            />

            <MenuOption
                title="Full Notes Generator"
                description="Detailed structured notes for deep learning"
                icon="notebook"
                color="#45B7D1"
                onPress={() => navigation.navigate('FullNotesGenerator')}
            />

            <MenuOption
                title="YouTube Explainer"
                description="Understand videos from title & description"
                icon="youtube"
                color="#FF0000"
                onPress={() => navigation.navigate('VideoExplainer')}
            />

            <MenuOption
                title="Quick Notes"
                description="Jot down your thoughts manually"
                icon="pencil"
                color="#F7B731"
                onPress={() => navigation.navigate('QuickNotes')}
            />

            <Text style={styles.sectionTitle}>Library</Text>

            <MenuOption
                title="Search History"
                description="View past queries and regenerate"
                icon="history"
                color="#5D6D7E"
                onPress={() => navigation.navigate('SearchHistory')}
            />

            <MenuOption
                title="Saved Notes"
                description="Access your saved study materials"
                icon="bookmark"
                color="#A569BD"
                onPress={() => navigation.navigate('SavedNotes')}
            />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: theme.spacing.l,
    },
    greeting: {
        fontSize: 16,
        color: theme.colors.subtext,
        marginBottom: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.primary,
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
        marginTop: theme.spacing.s,
    },
    menuCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.m,
    },
    textContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 2,
    },
    menuDesc: {
        fontSize: 12,
        color: theme.colors.subtext,
    },
});
