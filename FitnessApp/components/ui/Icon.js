import { SvgXml } from "react-native-svg";

export default function IconShare({ xmlData, isFocused, width, height, color, ...props}) {
  if (!xmlData) {
    return null;
  }

  if (isFocused) {
    const modifiedXml = xmlData.replace(/fill="[^"]*"/g, `fill="${color}"`);
    return <SvgXml {...props} width={width} height={height} xml={modifiedXml} />
  }

  return <SvgXml {...props} width={width} height={height} xml={xmlData} />
}