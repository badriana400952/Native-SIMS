import { Flex, Container, FormControl,Box, Input, HStack, Stack, Button, Image, Text, } from "native-base"
import { useState } from "react"
import { useAppDispatch } from "../../app/store"
import { LoginUser } from "../../app/Slice/UserSlice"

const LoginComponent = ({ navigation }: any) => {
    const [userLogin, setUserLogin] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const dispatch = useAppDispatch()

    const handleLogin = async () => {
        const datas = {
            email: userLogin,
            password: userPassword
        }
        try {
            const kirim = await dispatch(LoginUser(datas))
            console.log(kirim)
        } catch (error) {
            console.error(error);
        }
    }

    
    return (
        <>
            <Container margin='auto' >
                <Box>
                    <Flex justifyContent="center" alignItems="center" width="100%" flexDirection="row">
                        <Image source={require('../../assets/Logo.png')} alt="Logo"
                         width="30px" height="30px" style={{ marginTop: 5 }} color="#AFAFAF" />
                         <Text fontWeight="bold" ml="10px" fontSize="25px"> SIMS PPOB</Text>
                    </Flex>
                    <Text fontWeight="bold" ml="10px" fontSize="25px" textAlign="center">Masuk atau buat akun untuk memulai</Text>
                </Box>
                <Flex justifyContent="center" alignItems="center" padding="10px" mt="30px" >
                    <HStack maxWidth="100%"   >
                        <FormControl isRequired>
                            <Stack mx="4">
                                <Input  placeholder="@ masukan email anda" onChangeText={(text) => setUserLogin(text)} />
                            </Stack>
                            <Stack mx="4" mt="20px">
                                <Input type="password" placeholder="msukan password anda" onChangeText={(text) => setUserPassword(text)} />
                            </Stack>
                            <Stack mx="4" mt="20px" backgroundColor="#D80032" rounded={'lg'}>
                                <Button backgroundColor="#D80032" rounded={'lg'} onPress={() => handleLogin()}>
                                    Login
                                </Button>
                            </Stack>
                            <Text textAlign="center" mt="10px" color="gray.500">
                                Belum punya akun? registrasi  <Text color="blue.500" onPress={() => navigation.navigate("Registrasi")}>
                                    disini
                                </Text>
                            </Text>

                           
                        </FormControl>
                    </HStack>
                </Flex>
            </Container>

        </>
    )
}

export default LoginComponent
