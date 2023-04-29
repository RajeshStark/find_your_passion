
export const Elipsis = (value : string, trimto: number) => {
    if (value.length < trimto) return value;
    return value.substring(0, trimto) + "...";
  };