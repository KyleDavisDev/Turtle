import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Turtle</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#df928e',
        fontWeight: '200',
        fontSize: 32,
    }
});

export {Header};
