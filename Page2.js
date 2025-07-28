import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Animated
} from 'react-native';
import { WebView } from 'react-native-webview';

const Page2 = () => {
  const webViewRef = useRef(null);
  const [location, setLocation] = useState('');

  const handleLocationSubmit = () => {
    const script = `
      window.postMessage("${location}", "*");
      true;
    `;
    webViewRef.current.injectJavaScript(script);
  };

   const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          html, body {
            margin: 0;
            padding: 0;
            background: black;
            overflow: hidden;
            height: 100%;
          }
          #globeViz {
            width: 100vw;
            height: 100vh;
          }
        </style>
        <script src="https://unpkg.com/three@0.150.1/build/three.min.js"></script>
        <script src="https://unpkg.com/globe.gl"></script>
        <script src="https://unpkg.com/topojson-client@3"></script>
      </head>
      <body>
        <div id="globeViz"></div>
        <script>
          const world = Globe()
            (document.getElementById('globeViz'))
            .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
            .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
            .showAtmosphere(true)
            .atmosphereColor('lightskyblue')
            .atmosphereAltitude(0.25)
            .pointOfView({ lat: 20, lng: 78, altitude: 4 })
            .onGlobeReady(() => {
              world.controls().autoRotate = true;
              world.controls().autoRotateSpeed = 0.1;
            });

            fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
            .then(res => res.json())
            .then(countries => {
              const { features } = topojson.feature(countries, countries.objects.countries);
              world.polygonsData(features)
                .polygonCapColor(() => 'rgba(173, 64, 0, 0.1)')
                .polygonSideColor(() => 'rgba(209, 14, 14, 1)')
                .polygonStrokeColor(() => '#ffffff')
                .polygonLabel(({ properties: d }) => \`\${d.name}\`)
                .polygonAltitude(0.001);
            });

            const cities = [
          { lat: 51.5074, lng: -0.1278, name: "London" },
          { lat: 40.7128, lng: -74.0060, name: "New York" },
          { lat: 28.6139, lng: 77.2090, name: "Delhi" },
          { lat: 35.6895, lng: 139.6917, name: "Tokyo" },
          { lat: -33.8688, lng: 151.2093, name: "Sydney" },
          { lat: 55.7558, lng: 37.6173, name: "Moscow" },
        ];

        
        

          window.addEventListener('message', async function (event) {
            const location = event.data;
            const response = await fetch(\`https://nominatim.openstreetmap.org/search?format=json&q=\${location}\`);
            const data = await response.json();
            if (data.length > 0) {
              const { lat, lon } = data[0];
              world.pointOfView({ lat: parseFloat(lat), lng: parseFloat(lon), altitude: 1.5 }, 2000);
            }
          });
        </script>
      </body>
    </html>
  `;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          javaScriptEnabled
          domStorageEnabled
          allowFileAccess
          style={{ flex: 1 }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
        <TextInput
          placeholder="Where From?"
          style={styles.input}
          onChangeText={setLocation}
          onSubmitEditing={handleLocationSubmit}
          placeholderTextColor="#aaa"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  input: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 16,
    elevation: 5,
  },
});