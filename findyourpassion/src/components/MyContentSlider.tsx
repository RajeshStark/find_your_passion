import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../utils/Diimensions';
import {useGlobal} from '../Hooks/GloblaContext';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyModal from './MyModal';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {ActivityIndicator} from 'react-native';
import PostFullScreenView from './PostFullScreenView';

export default function MyContentSlider({data, item, index}) {
  const navigation = useNavigation();
  const {colors} = useGlobal();
  const [showContent, setShowContent] = useState({
    show: false,
    media: [],
    index: 0,
  });
  const medialength = data.media.length;
  const [mute, setmute] = useState(true);
  const [videoLoader, setVideoLoader] = useState(true);
  const [play, setPlay] = useState(true);


  return (
    <>
      <View style={styles.container}>
        {medialength > 1 ? (
          <Text style={styles.numbertxt}>{`${index + 1}/${medialength}`}</Text>
        ) : null}

        {item.type === 'image' ? (
          <Pressable
            onPress={() => {
              setShowContent({
                show: true,
                media: item,
                index: index + 1,
              });
            }}>
            <Image source={{uri: item.url}} style={styles.img} />
          </Pressable>
        ) : item.type === 'video' ? (
          <>

            <Pressable onPress={() => setPlay(!play)}>
            {
                videoLoader ?
                 <View  style={[styles.video, {backgroundColor: '#000', justifyContent: 'center', alignItems:'center'}]}>
                   <ActivityIndicator color={'#fff'} size={40}/>
                   <Text style={{color: '#fff', fontSize: 14}}>Please wait while video loading...</Text>
                 </View>
                 :
                 null
              }
              
              <Video
                source={{
                  uri: item.url,
                }}
                style={styles.video}
                resizeMode="cover"
                controls={false}
                audioOnly={true}
                muted={mute}
                paused={!play}
                onLoadStart={() => setVideoLoader(true)}
                onLoad={() => setVideoLoader(false)}
              />
             
              {play ? null : (
                <>
                  <Ionicons
                    style={{
                      alignSelf: 'center',
                      backgroundColor: '#000',
                      borderRadius: 50,
                      padding: 10,
                      marginTop: -DEVICE_HEIGHT * 0.17,
                    }}
                    name={'play'}
                    color={'#fff'}
                    size={20}
                    onPress={() => setPlay(!play)}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Ionicons
                      style={{marginTop: 60, margin: 5}}
                      name={mute ? 'ios-volume-mute' : 'ios-volume-high'}
                      color={'#fff'}
                      size={25}
                      onPress={() => setmute(!mute)}
                    />
                    <Octicons
                      style={{marginTop: 65, margin: 5}}
                      name={'screen-full'}
                      color={'#fff'}
                      size={20}
                      onPress={() =>
                        setShowContent({
                          show: true,
                          media: item,
                          index: index + 1,
                        })
                      }
                    />
                  </View>
                </>
              )}
            </Pressable>
          </>
        ) : null}
      </View>
      <PostFullScreenView showContent={showContent} setShowContent={setShowContent} data={data}/>

    </>
  );
}

const styles = StyleSheet.create({
  container: {width: DEVICE_WIDTH * 0.9, height: DEVICE_HEIGHT * 0.3},
  numbertxt: {
    fontSize: 14,
    padding: 3,
    position: 'absolute',
    right: 0,
    zIndex: 999,
    color: '#fff',
    backgroundColor: '#000',
    opacity: 0.4,
    borderBottomLeftRadius: 5,
  },
  img: {
    width: DEVICE_WIDTH * 0.9,
    height: DEVICE_HEIGHT * 0.3,
    alignSelf: 'center',
  },
  video: {
    width: DEVICE_WIDTH * 0.9,
    height: DEVICE_HEIGHT * 0.3,
    alignSelf: 'center',
  },
});
