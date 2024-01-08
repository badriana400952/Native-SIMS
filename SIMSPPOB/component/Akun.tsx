import axios from "axios";
import { Box, ScrollView, Center, Container, Button, Avatar, Text, VStack, Modal, FormControl, Input, Flex, HStack, Divider, Skeleton } from "native-base"
import React, { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../app/store";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { getUser, logout, IUpdateImage, updateImageProfile, updateProfile } from "../app/Slice/UserSlice"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AkunHooks from "../hooks/AkunHooks";


const Akun: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = AkunHooks()
  const [image, setImage] = useState(null)

  const [email, setEmail] = useState("")
  const [namaDepan, setNamaDepan] = useState("")
  const [namaBelakang, setNamaBelakang] = useState("")

  const handleUpdateProfile = async () => {
    const data = {
      first_name: namaDepan,
      last_name: namaBelakang
    }
    try {
      const kirim = await dispatch(updateProfile(data))
      console.log(kirim)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    dispatch(getUser())
  }, [])

  const handleLogoute = () => {
    dispatch(logout())
  }

  const handleUpdateImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    console.log("options", options)

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage: any = response.assets[0].uri;
        console.log("selectedImage", selectedImage);
        setImage(selectedImage);

        const data = {
          file: selectedImage,
        };

        dispatch(updateImageProfile(data));
      }
    });
  };

  const handleimageKirim = async () => {
    const newData: IUpdateImage = {
      file: image !== null ? image : undefined
    }
    try {
      const kirim = await dispatch(updateImageProfile(newData))
      console.log("ini kirimn", kirim)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Center width="100%">
        <Container width="95%" p="10px" mt="20px" >
          <Text fontWeight="bold" fontSize="25px" textAlign="center"> Akun </Text>

          <VStack mt="20px" w="90%" maxW="400" space={1} overflow="hidden"  >
            <Avatar
              alignSelf="center"
              size="lg"
              source={{
                uri: `${user.profile_image}`
              }}
            />
            <Button position="absolute" right="80px" top="20px" width="40px" height="40px" rounded="full" backgroundColor="white" onPress={handleUpdateImage} > <EvilIcons name="pencil" size={20} /> </Button>
            <Text fontWeight="bold" fontSize="20px" textAlign="center">{user.first_name} </Text>
            {/* <VStack my="20px">
              <Image source={{
                uri: `${image}`
              }} style={{ width: 100, height: 100 }} />

              <Button width="100%"   onPress={handleimageKirim} > kitim </Button>
            </VStack> */}

          </VStack>
          <VStack mt="20px" w="90%" maxW="400" space={1} overflow="hidden"  >
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Nama Depan</FormControl.Label>
              <Input
                placeholder="Nama Depan"
                onChangeText={(text) => setNamaDepan(text)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Nama Belakang</FormControl.Label>
              <Input
                placeholder="Nama Belakang"
                onChangeText={(text) => setNamaBelakang(text)}
              />
            </FormControl>

            <FormControl mt="3">
              <Button backgroundColor="transparent" borderColor="gray" color="black" borderWidth="1" onPress={() => handleUpdateProfile()}><Text style={{ color: "black" }}>Update Profile</Text></Button>
            </FormControl>
            <FormControl mt="8">
              <Button backgroundColor="red.500" onPress={() => handleLogoute()}> Logout </Button>
            </FormControl>

          </VStack>
        </Container>
      </Center>



    </>
  );
};

export default Akun;
