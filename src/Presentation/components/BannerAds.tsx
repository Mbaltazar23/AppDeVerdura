import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const ClientBannerCarouselAds = () => {
  const banners = [
    require('../../../assets/banner01.jpg'),
    require('../../../assets/banner02.jpg'),
    require('../../../assets/banner03.jpg'),
    // Agrega aquí más imágenes de banners si es necesario
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Cambiar automáticamente al siguiente banner después de 5 segundos
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Cambia el tiempo aquí según tus necesidades (en milisegundos)

    return () => clearInterval(timer);
  }, [currentBannerIndex]);

  return (
    <View style={{ height: 150, overflow: 'hidden' }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={{ width: width * banners.length }}
        onMomentumScrollEnd={(event) => {
          const contentOffset = event.nativeEvent.contentOffset;
          const newIndex = Math.round(contentOffset.x / width);
          setCurrentBannerIndex(newIndex);
        }}
      >
        {banners.map((banner, index) => (
          <Image
            key={index}
            source={banner}
            style={{
              width: width,
              height: 150,
              resizeMode: 'contain',
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};
