import { StyleSheet } from 'react-native';
import { makeCircleStyle } from 'helpers/styles';

export const styles = StyleSheet.create({
  itemImageBackground: {
    position: 'relative',
    aspectRatio: 1.5,
  },
  itemImage: {
    resizeMode: 'cover',
  },
  itemInner: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  itemName: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    color: 'rgba(255,255,255,.7)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // indicatorContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   position: 'absolute',
  //   bottom: 24,
  // },
  // indicator: {
  //   backgroundColor: 'rgba(255,255,255,.7)',
  //   ...makeCircleStyle(6),
  //   marginRight: 10,
  // },
  // indicatorLast: {
  //   marginRight: 0,
  // },
  // indicatorActive: {
  //   backgroundColor: '#ffffff',
  // },
});