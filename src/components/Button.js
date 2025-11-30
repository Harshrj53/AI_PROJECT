import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme';

export const Button = ({ title, onPress, loading, style, textStyle, variant = 'primary' }) => {
    const backgroundColor = variant === 'secondary' ? theme.colors.secondary : theme.colors.primary;

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, style]}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color={theme.colors.white} />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.l,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadow,
    },
    text: {
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});
