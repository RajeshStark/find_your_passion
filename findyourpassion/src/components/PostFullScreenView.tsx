import { View, Text, Platform, StyleSheet, Image } from 'react-native'
import React, {SetStateAction, useState} from 'react'
import MyModal from './MyModal'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../utils/Diimensions';
import { useGlobal } from '../Hooks/GloblaContext';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {ActivityIndicator} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

type Props = {
    showContent: {show: boolean; media: Array<Object>; index: number };
    setShowContent: SetStateAction<Object>;
    data?: Object
}
export default function PostFullScreenView({showContent, setShowContent, data}: Props) {
    const navigation = useNavigation();
  const {colors} = useGlobal();
  const [like, setLike] = useState(false);

  const [mute, setmute] = useState(true);
  const [videoLoader, setVideoLoader] = useState(true);
  const [play, setPlay] = useState(true);


    const Render = (item :Object) => {
        return (
          <>
            <View
              style={{
                height: DEVICE_HEIGHT,
                width: DEVICE_WIDTH,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
              }}>
               { item.type === 'image'?
              <MaterialCommunityIcons
                name="close"
                size={30}
                color={'#fff'}
                style={{
                  position: 'absolute',
                  top: Platform.OS === 'ios' ? 50 : 10,
                  right: 10,
                  zIndex: 9999,
                }}
                onPress={() => setShowContent({show: false, media: [], index: 0})}
              /> : null}
              {/* <Text style={{color: 'red'}}>{JSON.stringify(item.url)}</Text> */}
              {item.type === 'image' ? (
                <ReactNativeZoomableView
                  onSingleTap={() => setShowContent({show: false, media: [], index: 0})}
                  maxZoom={10}
                  minZoom={1}
                  zoomStep={0.1}
                  initialZoom={1}
                  bindToBorders={true}
                  style={{
                    width: DEVICE_WIDTH,
                    height: DEVICE_HEIGHT,
                  }}>
                  <Image
                    source={{uri: item.url}}
                    style={{
                      width: DEVICE_WIDTH,
                      height: DEVICE_HEIGHT,
                      resizeMode: 'contain',
                    }}
                  />
                </ReactNativeZoomableView>
              ) : item.type === 'video' ? (

                <>
                 {
                    videoLoader ?
                     <View  style={{position: 'absolute', alignSelf: 'center'}}>
                       <ActivityIndicator color={'#fff'} size={40}/>
                       <Text style={{color: '#fff', fontSize: 14}}>Please wait while video loading...</Text>
                     </View>
                     :
                     null
                  }
                    <VideoPlayer
                    
                  source={{
                    uri: item.url,
                  }}
                  _on
                  style={{
                    width: DEVICE_WIDTH,
                    height: '100%',
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                  controls={true}
                  //  posterResizeMode='cover'
                  onLoadStart={() => setVideoLoader(true)}
                  onLoad={() => setVideoLoader(false)}
                  // audioOnly={true}
                  _onBack={()=> setShowContent({show: false, media: [], index: 0})}
                />
               
               
                </>
              ) : null}
            </View>
            {/* {
                data ?
                <TouchableOpacity
              onPress={() =>
                navigation.navigate('Fullpost', {
                  item: data,
                })
              }
              style={{
                width: DEVICE_WIDTH * 0.9,
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#fff',
                alignItems: 'center',
                padding: 10,
                marginTop: -70,
              }}>
              <Text style={{color: '#fff', fontSize: 18}}> View post</Text>
            </TouchableOpacity>
            :null
            } */}
          </>
        );
      };
      
  return (
    <MyModal
        visible={showContent.show}
        onDismiss={() => {}}
        children={Render(showContent.media)}
      />
  )
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
  