import {View, Text, Image} from 'react-native';
import React from 'react';
import {useGlobal} from '../../Hooks/GloblaContext';
import Entypo from 'react-native-vector-icons/Entypo';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/Diimensions';

const PostCard =({item}: any)=> {
  const {colors} = useGlobal();
  return (
    <View
      style={{
        width: DEVICE_WIDTH *0.95,
        margin: 10,
        backgroundColor: colors?.cardBackground,
        borderRadius: 10,
        padding: 20,
        alignItems:'center',

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        
        elevation: 1,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 40, height: 40, borderRadius: 20}}
            source={{uri: item.profileImg}}
          />
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                color: colors?.textColor,
                marginHorizontal: 10,
              }}>
              {item.username}
            </Text>
            <Text style={{fontSize: 12, marginHorizontal: 10}}>
              {item.tagline}
            </Text>
          </View>
        </View>
        <Entypo
          name="dots-two-horizontal"
          size={30}
          color={colors?.textColor}
        />
      </View>

      <Image
        style={{borderRadius: 20, width: DEVICE_WIDTH*0.9, height: DEVICE_WIDTH/2,marginVertical: 20 }}
        resizeMode="stretch"
        source={{uri: item.media[0].url}}
      />

      <Text numberOfLines={5} ellipsizeMode="tail" style={{ textAlign: 'left', }}>{item.description}</Text>


    </View>
  );
}

export default PostCard