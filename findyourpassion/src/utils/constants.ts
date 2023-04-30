import { Image } from "react-native";

export const Elipsis = (value : string, trimto: number) => {
    if (value.length < trimto) return value;
    return value.substring(0, trimto) + "...";
  };

  export  const getSize = (img, type) => {
    // return 200
  const size =  Image.getSize(img, (width, height) => {
      return 200
    })
    return size
  }