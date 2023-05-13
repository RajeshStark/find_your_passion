import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Image, TouchableOpacity, Keyboard } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
  SCREEN_HEIGHT,
} from "@gorhom/bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  visible: { visible: boolean; snappoint: [] } | any;
  children: React.ReactElement;
  onPress: () => void;
};
const MyBottomsheet = ({ visible, children, onPress }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const topmargin = visible.snappoint[0]

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
     const keyboardDidShowListener = Keyboard.addListener(
       'keyboardDidShow',
       () => {
         setKeyboardVisible(true); // or some other action
       }
     );
     const keyboardDidHideListener = Keyboard.addListener(
       'keyboardDidHide',
       () => {
         setKeyboardVisible(false); // or some other action
       }
     );
 
     return () => {
       keyboardDidHideListener.remove();
       keyboardDidShowListener.remove();
     };
   }, []);

   useEffect(() => {
    if(!isKeyboardVisible){
      bottomSheetRef.current?.snapToPosition(visible.snappoint)
    }
   }, [isKeyboardVisible])
   

  return (
    <>
      {visible.visible ? (
        <>
        <TouchableOpacity
              style={{
                backgroundColor: "#F0F1F4",
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: topmargin - 20,
                right: 20,
                zIndex: 999,
              }}
              onPress={onPress}
            >
              <Ionicons
                name="close-outline"
                size={28}
                color={"#000000"}
                
              />
            </TouchableOpacity>
        
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={visible.snappoint}
            handleIndicatorStyle={{
              backgroundColor: "#fff",
              width: 60,
              height: 3,
            }}
            onChange={handleSheetChanges}
          >
        {children}
          </BottomSheet>
        </>
      ) : null}
    </>
  );
};

export default MyBottomsheet;
