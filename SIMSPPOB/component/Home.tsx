import { Box, Flex, HStack, Avatar,  Text, Image,  Center, Container } from 'native-base'
import { FlatList, Pressable } from 'react-native';
import { IService} from '../app/Slice/ServiceSlice';
import { IBanner } from '../app/Slice/BannerSlice';
import Carousel from 'react-native-snap-carousel';
import HomeHooks from '../hooks/HomeHooks';






const Home = () => {
  const { service, banner, balance, formatRupiah, renderName ,carouselRef, user } = HomeHooks()

  const _renderItem = ({ service }: { service: IService }) => (
    <Pressable >
      {({ pressed }: { pressed: boolean }) => (
        <Box style={{
          backgroundColor: '#F0F0F0',
          width: 54,
          height: 55,
          borderRadius: 30,
          flex: 1,
          borderWidth: 1,
          borderColor: '#F0F0F0',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image ml="10px" textAlign={'center'} source={{ uri: `${service.service_icon}` }} style={{ width: 25, height: 25, marginRight: 10 }} alt="logo" />
          <Text mt="5px" style={{ fontSize: 15, color: 'black', textAlign: 'center' }}>{renderName(service.service_name)}</Text>
        </Box>
      )}
    </Pressable>
  )

  const renderItemBanner = ({ banner, index }: { banner: IBanner, index: number }) => {
    return (
      <>
        <Box width='260' mt="10px">
          <Image width="100%" alt="logo" height="120px" style={{ objectFit: 'cover' }} borderRadius=" 10" marginTop=" 3" source={{ uri: `${banner.banner_image}` }} />
        </Box>
      </>
    );
  };
  return (
    <>
      <Center width="100%">
        <Container width="100%">
          <Flex justifyContent="space-between" flexDirection="row" alignItems="center" width="100%" mt="40px">
            <Flex justifyContent="start" flexDirection="row" alignItems="center">
              <Image source={require('../assets/Logo.png')} width="20px" height="20px" alt="logo" />
              <Text fontSize="15px" padding="10px" color="gray.500" textAlign="center">
                SIMS PPOB
              </Text>
            </Flex>
            <HStack space={2} alignItems="center">
            <Avatar
              alignSelf="center"
              size="md"
              borderRadius="full"
              source={{
                uri: `${user.profile_image}`
              }}
            />
            </HStack>
          </Flex>
          <Box mt="20px">
            <Text fontSize="25px" color="gray.500" >Selamat datang</Text>
            <Text fontSize="25px" color="gray.700" fontWeight="bold">{user.first_name}</Text>
          </Box>
          <Box width="100%" mt="30px" height="150px" rounded="20px" backgroundColor="red.500">
            <Box width="100%" height="100%" padding="20px">
              <Text fontSize="20px" color="white" lineHeight="50px">Saldo anda</Text>
              <Text fontSize="30px" color="white" fontWeight="bold" lineHeight="50px">
                {formatRupiah(balance.balance)}
              </Text>
              <Text fontSize="15px" color="white" lineHeight="50px">Lihat saldo </Text>
            </Box>
          </Box>

          <FlatList
            data={service}
            numColumns={6}
            contentContainerStyle={{
              justifyContent: 'space-around',
              marginTop: 40
            }}
            renderItem={({ item }) => _renderItem({ service: item })}
            keyExtractor={(i) => i.toString()}
          />
          <Carousel
            ref={carouselRef}
            data={banner}
            renderItem={({ item, index }) => renderItemBanner({ banner: item, index })}
            sliderWidth={305}
            itemWidth={260}
          />
        </Container>
      </Center>
    </>
  )
}

export default Home
