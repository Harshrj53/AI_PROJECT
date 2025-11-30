import React from 'react';
import { View, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

export const ScreenLayout = ({ children, scrollable = false }) => {
    const Content = scrollable ? ScrollView : View;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <Content
                    style={styles.content}
                    contentContainerStyle={scrollable ? styles.scrollContent : null}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </Content>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        padding: theme.spacing.m,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xl,
    },
});
