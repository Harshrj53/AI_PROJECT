import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View, Text } from 'react-native';
import { theme } from '../theme';

export const Input = ({ label, value, onChangeText, placeholder, multiline, style }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <RNTextInput
                style={[styles.input, multiline && styles.multiline, style]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={multiline}
                placeholderTextColor={theme.colors.subtext}
                textAlignVertical={multiline ? 'top' : 'center'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.m,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.s,
    },
    input: {
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        fontSize: 16,
        color: theme.colors.text,
    },
    multiline: {
        minHeight: 100,
    },
});
