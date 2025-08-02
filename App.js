import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import * as Font from 'expo-font';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  const targetDate = new Date('2025-08-28T15:00:00');

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Regular': require('./assets/fonts/Poppins-Black.ttf'), // using your existing font
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft("🎉 You're in Paris! 🎉");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={require('./assets/liquid-black.mp4')}
        rate={1.0}
        volume={0}
        isMuted
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Paris in...</Text>
        <Text style={styles.countdown}>{timeLeft}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  countdown: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});