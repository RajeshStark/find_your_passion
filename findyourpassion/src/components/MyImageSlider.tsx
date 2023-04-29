import {View, Text, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../utils/Diimensions';
import Entypo from 'react-native-vector-icons/Entypo';

export default function MyImageSlider({style, source}) {
  const [state, setState] = useState(0);
  const [media, setMedia] = useState(source[state]);
  const length = source.length;

  useEffect(() => {}, []);

  return (
    <>
      {/* {media.type === 'image' ? (
        <View>
          <Image
            source={{uri: media.img}}
            style={{
              width: DEVICE_WIDTH * 0.9,
              height: DEVICE_HEIGHT * 0.3,
              borderRadius: 15,
            }}
          />
          <Entypo
            name="chevron-left"
            size={20}
            color={'#fff'}
            style={{position: 'absolute', left: 0, top: DEVICE_HEIGHT * 0.14}}
          />
          <Entypo
            name="chevron-right"
            size={20}
            color={'#fff'}
            style={{position: 'absolute', right: 0, top: DEVICE_HEIGHT * 0.14}}
          />
        </View>
      ) : null} */}
      <FlatList 
        data={source}
        horizontal={true}
        renderItem={({item, index}) =>
    <View>

        {
            item.type === 'image' ?
            <Image
            source={{uri: item.img}}
            style={{
              width: DEVICE_WIDTH * 0.9,
              height: DEVICE_HEIGHT * 0.3,
              borderRadius: 15,
            }}
          />
          :
          null
        }
    </View> }
      />
    </>
  );
}
