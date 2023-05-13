import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { commentData } from '../../Data/myfeed'
import LinearGradient from 'react-native-linear-gradient'
import { useGlobal } from '../../Hooks/GloblaContext'
import { DEVICE_WIDTH } from '../../utils/Diimensions'
import { FlatList } from 'react-native-gesture-handler'
import CommentBubble from './CommentBubble'

export default function CommentBox({item}) {
    const {colors} = useGlobal()
  return (
    <View style={{marginVertical: 60}}>
      <FlatList 
        data={commentData}
        renderItem={({item, index}) => 
        <>
        <CommentBubble item={item} child={false}/>
        {
          item.replies.length !== 0 ?
          <CommentBubble item={item.replies[0]} child={true}/>
          :null
        }
         {item.replies.length > 1 ? (

                  <Text
                   
                    style={{
                      fontSize: 18,
                    margin: 5,
                    marginLeft: 60,
                     fontWeight: '700',
                   }}>{`View ${item.replies.length - 1} Replies`}</Text>
             
            ) : null}

        </>
        }
        // keyExtractor={({item}) => item.item.id}
      />
    
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
    commentcontainer2: {
      marginLeft: 10,
      width: DEVICE_WIDTH * 0.685,
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
  