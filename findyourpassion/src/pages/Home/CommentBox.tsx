import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { commentData } from '../../Data/myfeed'
import LinearGradient from 'react-native-linear-gradient'
import { useGlobal } from '../../Hooks/GloblaContext'
import { DEVICE_WIDTH } from '../../utils/Diimensions'

export default function CommentBox({item}) {
    const {colors} = useGlobal()
  return (
    <View style={{marginVertical: 60}}>
          {commentData.map((i, index) => (
            <View
            key={index}
              style={{
                marginHorizontal: 5,
                marginVertical: 5,
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: item.avatar}}
                style={{width: 40, height: 40, borderRadius: 20}}
              />
              <View>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1.5, y: 1.25}}
                  locations={[0, 0.2, 0.5]}
                  style={{
                    marginHorizontal: 5,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderTopStartRadius: 10,
                  }}
                  colors={['#A624EE', '#9144F3', '#7666F9']}>
                  <View style={[styles.commentcontainer]}>
                    <Text
                      style={[
                        styles.personname,
                        {color: colors?.BackgroundColor},
                      ]}>
                      {i.name}
                    </Text>
                    <Text
                      style={{fontSize: 14, color: colors?.BackgroundColor}}>
                      {i.comment}
                    </Text>
                  </View>
                </LinearGradient>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      margin: 5,
                      fontWeight: '500',
                      marginHorizontal: 15,
                    }}>
                    1 day ago
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      margin: 5,
                      fontWeight: '500',
                      color: i.isclapped
                        ? colors?.AppThemeColor
                        : colors?.textColor,
                    }}>
                    {i.claps} {i.claps > 1 ? 'Claps' : 'Clap'}
                  </Text>
                  <Text style={{fontSize: 16, margin: 5, fontWeight: '500'}}>
                    Reply
                  </Text>
                  {'abc' == i.commentor_id ? (
                    <Text style={{fontSize: 16, margin: 5, fontWeight: '500'}}>
                      Delete
                    </Text>
                  ) : null}
                </View>

                {i.replies.length !== 0 ? (
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        margin: 5,
                        fontWeight: '700',
                      }}>{`View ${i.replies.length} Replies`}</Text>
                  </View>
                ) : null}

              </View>
            </View>
          ))}
        </View>
  )
}


const styles = StyleSheet.create({
    commentcontainer: {
      marginLeft: 10,
      width: DEVICE_WIDTH * 0.8,
      padding: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    header: {
      width: DEVICE_WIDTH,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    tiletxt: {fontSize: 16, fontWeight: '600'},
    tileview: {padding: 10, borderRadius: 5, margin: 5},
  
    personview: {
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    personname: {fontSize: 16, fontWeight: '600'},
    persontitle: {fontSize: 14, marginLeft: 10},
  });
  