import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

export const Card = ({ children, style, onPress }) => {
    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
            {children}
        </Container>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        marginBottom: theme.spacing.m,
        ...theme.shadow,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
});
