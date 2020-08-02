import React, { useState, useMemo, ComponentProps, useRef } from 'react';
import { View, Text, FlatList, ImageBackground, Dimensions } from 'react-native';
import { styles } from './styles';

type Props = {
  categories: (Pick<ItemProps, 'name' | 'photo'> & { uuid: string })[];
};

type ItemProps = {
  name: string;
  photo: string;
  width: number;
  totalItemCount: number;
  currentIndex: number;
};

export const BestDealsList = ({ categories }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useMemo(() => Dimensions.get('window'), []);
  const onViewRef = useRef<NonNullable<ComponentProps<typeof FlatList>['onViewableItemsChanged']>>(
    ({ viewableItems }) => {
      if (!viewableItems.length) return;
      setCurrentIndex(viewableItems[0]?.index ?? 0);
    },
  );
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <Item {...item} width={width} currentIndex={currentIndex} totalItemCount={categories.length} />
      )}
      keyExtractor={(item) => item.uuid}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      pagingEnabled
      getItemLayout={(_, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      snapToInterval={width}
      bounces={false}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
    />
  );
};

const Item = ({ name, photo, width, currentIndex, totalItemCount }: ItemProps) => {
  return (
    <ImageBackground
      source={{ uri: photo }}
      style={[styles.itemImageBackground, { width }]}
      imageStyle={styles.itemImage}
    >
      <View style={styles.itemInner}>
        <Text style={styles.itemName}>{name}</Text>
      </View>
      <View style={styles.indicatorContainer}>
        {[...Array(totalItemCount)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.indicator,
              i === currentIndex && styles.indicatorActive,
              i + 1 === totalItemCount && styles.indicatorLast,
            ]}
          />
        ))}
      </View>
    </ImageBackground>
  );
};
