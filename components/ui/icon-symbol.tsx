import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  'list.bullet.rectangle.fill': 'list-alt',
  'square.and.pencil': 'note-add',
  'sun.max.fill': 'light-mode',
  'moon.fill': 'dark-mode',
  'checkmark.circle.fill': 'done-all',
  'speedometer': 'speed',
  'plus.circle.fill': 'add-circle',
  'doc.text.fill': 'drafts',
  'arrowshape.turn.up.left.fill': 'logout',
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
