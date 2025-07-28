import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const Page1 = ({ navigation }) => {
  const videoRef = useRef(null);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../assets/abcd1.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
        onError={(e) => console.log("Video error:", e)}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>TravelMate AI</Text>
        <Text style={styles.subtitle}>Explore the globe in a whole new way</Text>
        <Text style={styles.subtitle2}>Your Ultimate Travel Companion!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Page2')}>
          <Text style={styles.buttonText}>Let's TAKEOFF!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page1;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    position: 'absolute',
    width,
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 28,
    textShadowColor: '#000000ff',
    textShadowRadius: 10,
    color: '#ccc',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle2: {
    fontSize: 18,
    textShadowColor: '#000000ff',
    textShadowRadius: 10,
    color: '#ccc',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#00f0ff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});
