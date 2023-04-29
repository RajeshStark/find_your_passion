import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Image, TouchableOpacity, Keyboard } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
  SCREEN_HEIGHT,
} from "@gorhom/bottom-sheet";

type Props = {
  visible: { visible: boolean; snappoint: [] } | any;
  children: React.ReactElement;
};
const MyBottomsheet = ({ visible, children }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

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
