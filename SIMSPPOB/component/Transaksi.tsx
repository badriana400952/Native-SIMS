import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Flex, Stack, Input, Container, Center, Button } from 'native-base';

import { useAppDispatch, useAppSelector } from '../app/store';
import { getTransaksi } from '../app/Slice/TransaksiSlice';
import { ScrollView } from 'react-native';
import { getBalance } from '../app/Slice/BalanceSlice';
import TransaksiHooks from '../hooks/TransaksiHooks';


const Transaksi = () => {
  const {transaksi, balance, visibleCards, setVisibleCards, handleSeeMoreClick, konversiWaktu, formatRupiah } = TransaksiHooks()

  return (
    <>
      <ScrollView>
        <Center width="100%">
          <Container width="95%">
            <Text fontWeight="bold" mt="20px" fontSize="25px" textAlign="center"> Transaksi </Text>
            <Box width="100%" mt="30px" height="150px" rounded="20px" backgroundColor="red.500">
              <Box width="100%" height="100%" padding="20px">
                <Text fontSize="20px" color="white" lineHeight="50px">Saldo anda</Text>
                <Text fontSize="30px" color="white" fontWeight="bold" lineHeight="50px">
                  {formatRupiah(balance.balance)}
                </Text>
              </Box>
            </Box>

            <Text fontWeight="bold" fontSize="25px" mt="20px" textAlign="center"> Transaksi </Text>
            {transaksi?.records?.slice(0, visibleCards).map((item, index) => (
              <Flex key={index} justifyContent="space-between" direction="row" width="100%" mt="30px" height="80px" borderRadius="6px" borderColor="gray.300" borderWidth="1">
                <Box padding="20px">
                  <Text fontSize="20px" color={item.transaction_type === 'TOPUP' ? "green.500" : "red.500"} fontWeight="bold">{item.transaction_type === 'TOPUP' ? "+ " + item.total_amount : "- " + item.total_amount}</Text>
                  <Text fontSize="15px" color="gray.500"> {konversiWaktu(item.created_on)} </Text>
                </Box>
                <Text fontSize="14px" padding="20px">{item.description}</Text>
              </Flex>
            ))}
            <Box width="100%" my="20px" rounded="20px" backgroundColor="gray.500">
              <Button onPress={handleSeeMoreClick} >show more</Button>
            </Box>

          </Container>
        </Center>
      </ScrollView>
    </>
  );
};

export default Transaksi;
