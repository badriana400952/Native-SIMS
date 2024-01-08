import { Flex, Container, Center, Alert, VStack, FormControl, Box, Input, HStack, Stack, Button, Image, Text, IconButton, CloseIcon, } from "native-base"
import { useState, useEffect } from "react"
import { TextInput } from "react-native"
import { useAppDispatch } from "../../app/store"
import { LoginUser, registrasiUser } from "../../app/Slice/UserSlice"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Registrasi = ({ navigation }: any) => {
    const [userFirst_name, setUserFirst_name] = useState("")
    const [userLast_name, setUserLast_name] = useState("")
    const [userLogin, setUserLogin] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userPasswordKonfirmasi, setUserPasswordKonfirmasi] = useState("")
    const dispatch = useAppDispatch()


    const handleRegister = () => {
        if (userPassword !== userPasswordKonfirmasi) {
            return <Text>Password Tidak Sesuai</Text>
        } else {
            const handleRegis = async () => {
                const datas = {
                    id : 0,
                    first_name: userFirst_name,
                    last_name: userLast_name,
                    email: userLogin,
                    password: userPassword
                }
                try {
                    const kirim = await dispatch(registrasiUser(datas))
                    navigation.navigate("Login")
                    console.log("berhasil register",kirim)
                } catch (error) {
                    console.error(error);
                }
            }
            handleRegis()
        }
    };






    console.log("userLogin", userLogin)
    console.log("userPassword", userPassword)
    return (
        <>
            <Container margin='auto' >
                <Box>
                    <Flex justifyContent="center" alignItems="center" width="100%" flexDirection="row">
                        <Image source={require('../../assets/Logo.png')} alt="Logo"
                            width="30px" height="30px" style={{ marginTop: 5 }} color="#AFAFAF" />
                        <Text fontWeight="bold" ml="10px" fontSize="25px"> SIMS PPOB</Text>
                    </Flex>
                    <Text fontWeight="bold" ml="10px" fontSize="25px" textAlign="center">Lengkapi data untuk membuat akun</Text>
                </Box>
                <Flex justifyContent="center" alignItems="center" padding="10px" mt="30px" >
                    <HStack maxWidth="100%"   >
                        <FormControl isRequired>

                            <Stack mx="4" mt="20px">
                                <Input  placeholder="masukan email anda" onChangeText={(text) => setUserLogin(text)} />
                            </Stack>

                            <Stack mx="4" mt="20px">
                                <Input placeholder="nama depan" onChangeText={(text) => setUserFirst_name(text)} />
                            </Stack>

                            <Stack mx="4" mt="20px">
                                <Input placeholder="nama belakang" onChangeText={(text) => setUserLast_name(text)} />
                            </Stack>



                            <Stack mx="4" mt="20px">
                                <Input type="password" placeholder="Buat password anda" onChangeText={(text) => setUserPassword(text)} />
                            </Stack>

                            <Stack mx="4" mt="20px">
                                <Input type="password" placeholder="konfirmasi password" onChangeText={(text) => setUserPasswordKonfirmasi(text)} />
                            </Stack>

                            <Stack mx="4" mt="20px" backgroundColor="#D80032" rounded={'lg'}>
                                <Button backgroundColor="#D80032" rounded={'lg'} onPress={() => handleRegister()}>
                                    Registrasi
                                </Button>
                            </Stack>

                            <Text textAlign="center" mt="10px" color="gray.500">
                                Sudah punya akun? Login <Text color="#D80032" onPress={() => navigation.navigate("Login")}>disini</Text>
                            </Text>
                        </FormControl>
                    </HStack>
                </Flex>
            </Container>

        </>
    )
}

export default Registrasi
