import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const SmoothGradientCircle = ({ isRecording }: { isRecording: boolean }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      const growScale = isRecording ? 1.25 : 1.15;
      
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: growScale,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ]).start(() => animate());
    };

    animate();
    return () => scaleAnim.stopAnimation();
  }, [isRecording]);

  return (
    <View style={styles.circleContainer}>
      <Animated.View style={[styles.circleBase, { transform: [{ scale: scaleAnim }] }]}>
        {/* Outermost layers - very light blues and pinks */}
        <View style={[styles.circle, { ...styles.gradientBase, opacity: 0.1, transform: [{ scale: 1.5 }], backgroundColor: '#E1F5FE' }]} />
        <View style={[styles.circle, { ...styles.gradientBase, opacity: 0.15, transform: [{ scale: 1.45 }], backgroundColor: '#E3F2FD' }]} />
        <View style={[styles.circle, { ...styles.gradientBase, opacity: 0.2, transform: [{ scale: 1.4 }], backgroundColor: '#F1F8FF' }]} />
        
        {/* Middle layers - soft blues */}
        <View style={[styles.circle, { ...styles.gradientBase, opacity: 0.25, transform: [{ scale: 1.35 }], backgroundColor: '#BBE3FA' }]} />
        <View style={[styles.circle, { ...styles.gradientBase, opacity: 0.3, transform: [{ scale: 1.3 }], backgroundColor: '#B3E0FF' }]} />
        <View style={[styles.circle, { ...styles.gradientBase, opacity: 0.35, transform: [{ scale: 1.25 }], backgroundColor: '#AED8F0' }]} />
        
        {/* Inner layers - stronger blues */}
        <View style={[styles.circle, { ...styles.gradientBase, opacity: 0.4, transform: [{ scale: 1.2 }], backgroundColor: '#90CAF9' }]} />
        <View style={[styles.circle, { ...styles.gradientBase, opacity: 0.45, transform: [{ scale: 1.15 }], backgroundColor: '#64B5F6' }]} />
        <View style={[styles.circle, { ...styles.gradientBase, opacity: 0.5, transform: [{ scale: 1.1 }], backgroundColor: '#42A5F5' }]} />
        
        {/* Core layers */}
        <View style={[styles.circle, { ...styles.gradientBase, opacity: 0.6, transform: [{ scale: 1.05 }], backgroundColor: '#2196F3' }]} />
      </Animated.View>
      
      {/* Center core */}
      <View style={styles.centerCore} />
    </View>
  );
};

export default function AudioTranscriber() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>('');

  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording(): Promise<void> {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording(): Promise<void> {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);

      if (uri) {
        await uploadAudio(uri);
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  }

  async function uploadAudio(uri: string): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'audio/m4a',
        name: 'recording.m4a',
      } as any);

      const response = await fetch('http://localhost:8000/transcribe/', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      if (data.transcription) {
        setTranscription(data.transcription);
      } else {
        console.error('Transcription failed:', data.error);
      }
    } catch (err) {
      console.error('Failed to upload audio:', err);
      if (err instanceof Error) {
        console.error('Error details:', err.message);
      }
      alert('Failed to upload audio. Check console for details.');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        style={styles.buttonContainer}
      >
        <SmoothGradientCircle isRecording={isRecording} />
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.transcriptionContainer}>
        <Text style={styles.transcriptionTitle}>Transcription:</Text>
        <Text style={styles.transcriptionText}>{transcription}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  circleContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBase: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  gradientBase: {
    alignSelf: 'center',
  },
  centerCore: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#1976D2',
    opacity: 0.9,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 90,
    textAlign: 'center',
  },
  transcriptionContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  transcriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transcriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
});