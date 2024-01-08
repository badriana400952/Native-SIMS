import { Button, Center, Container, HStack, Input, Stack, FormControl, Text, Box, Alert, Flex, VStack, IconButton, CloseIcon } from 'native-base'
import { useAppDispatch, useAppSelector } from '../app/store';
import TopupHooks from '../hooks/TopupHooks';
import { postTopup } from '../app/Slice/TopupSlice';




function Topup() {
  const dispatch = useAppDispatch()
  const { balance, selectedAmount, setSelectedAmount, handleAmountSelection, formatRupiah } = TopupHooks()



  const handleTopup = async () => {
    const newData = {
      top_up_amount: selectedAmount,
    }

    try {
      const kirim = await dispatch(postTopup(newData))
      console.log("ini kirimn", kirim)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Center width="100%">
        <Container width="90%">
          <Box width="100%" mt="30px" height="150px" rounded="20px" backgroundColor="red.500">
            <Box width="100%" height="100%" padding="20px">
              <Text fontSize="20px" color="white" lineHeight="50px">Saldo anda</Text>
              <Text fontSize="30px" color="white" fontWeight="bold" lineHeight="50px">
                {formatRupiah(balance.balance)}
              </Text>
            </Box>
          </Box>

          <Box mt="20px">
            <Text fontSize="25px" color="gray.500" >Silahkan Masukkan</Text>
            <Text fontSize="25px" color="gray.700" fontWeight="bold">Nominal Top Up</Text>
          </Box>

          <Box mt="20px">
            <HStack maxWidth="100%"   >
              <FormControl >
                <Stack mx="4">
                  <Input placeholder="masukan Nomor Top Up" />
                </Stack>
              </FormControl>
            </HStack>

            <HStack maxWidth="100%" >
              <Flex justifyContent="space-between" flexDirection="row" width="100%" flexWrap="wrap">
                <Button px="5" mt="8" py="4" backgroundColor="transparent" borderColor="gray.300" borderWidth="1" onPress={() => handleAmountSelection(10000)}>
                  <Text style={{ color: selectedAmount === 10000 ? 'blue' : 'black' }}>Rp 10.000</Text>
                </Button>
                <Button px="5" mt="8" py="4" backgroundColor="transparent" borderColor="gray.300" borderWidth="1" onPress={() => handleAmountSelection(20000)}>
                  <Text style={{ color: selectedAmount === 20000 ? 'blue' : 'black' }}>Rp 20.000</Text>
                </Button>
                <Button px="5" mt="8" py="4" backgroundColor="transparent" borderColor="gray.300" borderWidth="1" onPress={() => handleAmountSelection(50000)}>
                  <Text style={{ color: selectedAmount === 50000 ? 'blue' : 'black' }}>Rp 50.000</Text>
                </Button>
                <Button px="5" mt="8" py="4" backgroundColor="transparent" borderColor="gray.300" borderWidth="1" onPress={() => handleAmountSelection(100000)}>
                  <Text style={{ color: selectedAmount === 100000 ? 'blue' : 'black' }}>Rp 100.000</Text>
                </Button>
                <Button px="5" mt="8" py="4" backgroundColor="transparent" borderColor="gray.300" borderWidth="1" onPress={() => handleAmountSelection(250000)}>
                  <Text style={{ color: selectedAmount === 250000 ? 'blue' : 'black' }}>Rp 250.000</Text>
                </Button>
                <Button px="5" mt="8" py="4" backgroundColor="transparent" borderColor="gray.300" borderWidth="1" onPress={() => handleAmountSelection(500000)}>
                  <Text style={{ color: selectedAmount === 500000 ? 'blue' : 'black' }}>Rp 500.000</Text>
                </Button>
              </Flex>
            </HStack>
            <Button mt="20" onPress={handleTopup} padding="18px" backgroundColor="gray.500" disabled={selectedAmount === null}>
              <Text color="white" >Top Up</Text>
            </Button>
          </Box>
        </Container>
      </Center>
    </>
  )
}

export default Topup
