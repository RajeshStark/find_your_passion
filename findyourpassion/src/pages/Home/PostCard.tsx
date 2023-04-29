import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../utils/Diimensions';
import { useGlobal } from '../../Hooks/GloblaContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PostCard({item}) {
    const {colors} = useGlobal()
  return (
    <View
            style={{
              width: DEVICE_WIDTH * 0.95,
              backgroundColor: colors?.BackgroundColor,
              alignItems: 'center',
              padding: 20,
              alignSelf: 'center',
              borderRadius: 15,
              marginTop: 10,
            }}>
            <View style={{alignSelf: 'flex-start', marginLeft: -10}}>
              <View style={styles.personview}>
                <Image
                  source={{uri: item.avatar}}
                  style={{width: 40, height: 40, borderRadius: 20}}
                />
                <View>
                  <Text style={[styles.personname, {color: colors?.textColor}]}>
                    {item.creater_name}
                  </Text>
                  <Text
                    style={[styles.persontitle, {color: colors?.textColor}]}>
                    {item.creater_info}
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={{uri: item.img}}
              style={{
                width: DEVICE_WIDTH * 0.9,
                height: DEVICE_HEIGHT * 0.3,
                borderRadius: 15,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: colors?.textColor,
                marginLeft: -10,
                marginTop: 10,
              }}>
              {item.detail}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Pressable
                style={{
                  width: DEVICE_WIDTH * 0.3,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="hand-clap"
                  size={25}
                  color={
                    item.isLiked ? colors?.AppThemeColor : colors?.textColor
                  }
                />
                <Text
                  style={{
                    padding: 5,
                    fontSize: 14,
                    color: item.isLiked
                      ? colors?.AppThemeColor
                      : colors?.textColor,
                  }}>
                  {item.likes}
                </Text>
              </Pressable>

              <Pressable
                style={{
                  width: DEVICE_WIDTH * 0.3,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={25}
                  color={colors?.textColor}
                />
                <Text
                  style={{padding: 5, fontSize: 14, color: colors?.textColor}}>
                  {item.comments}
                </Text>
              </Pressable>

              <Pressable
                style={{
                  width: DEVICE_WIDTH * 0.3,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="share-outline"
                  size={25}
                  color={colors?.textColor}
                />
                <Text
                  style={{padding: 5, fontSize: 14, color: colors?.textColor}}>
                  {item.shares}
                </Text>
              </Pressable>
            </View>
          </View>
  )
}

const styles = StyleSheet.create({
    header: {
      width: DEVICE_WIDTH,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    tiletxt: {fontSize: 16, fontWeight: '600'},
    tileview: {padding: 10, borderRadius: 5, margin: 5},
  
    personview: {
      // marginTop: 30,
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'flex-start',
      // backgroundColor: 'red'
    },
    personname: {fontSize: 16, fontWeight: '600', marginLeft: 10},
    persontitle: {fontSize: 14, marginLeft: 10},
  });