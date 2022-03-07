import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, HStack, Box, Spacer, Text, Heading, Input, Button, Slider, SliderTrack, SliderFilledTrack, Table, Thead, Th, Tr, Tbody, Td, Image, Link, useColorModeValue, Center, Spinner, AlertDialog, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import React from 'react';
import Web3 from 'web3';

/* framer-motion yüklendi
   emotion/react yüklendi
   web3 yüklendi
*/
import { load } from '../src/funcs';


const Loading = () => {
  const bg = useColorModeValue('gray.200', 'gray.600');
  return ( // dikey bosluk ayarı
    <VStack minH='800px' bg={bg} w='full'>  
      <Spacer />
      <Center>
        <Spinner />
      </Center>
      <Spacer />
    </VStack>
  );
};

const Home: NextPage = () => { // ui yardımıyla bir sonraki sayfa renk modu tanımlamaları
  const bg = useColorModeValue('green.200', 'green.700');
  const hBG = useColorModeValue('purple.300', 'purple.500');
  const sliderBG = useColorModeValue('purple.300', 'purple.500');
  const doldur = useColorModeValue('blue.300', 'blue.600');
  
  // React.useState ile değişken tanımlamaları
  const [yenile, setYenile] = React.useState<boolean>(true);
  const [uyelik, setUyelik] = React.useState<any>(null);
  const [contracttoken, setContracttoken] = React.useState<any>(null);
  const [contracttokensale, setContracttokensale] = React.useState<any>(null);
  const [tokenssatis, setTokenssatis] = React.useState<any>(null);
  const [transactionCount, setTransactionCount] = React.useState<any>(null);
  const [ethFunds, setEthFunds] = React.useState<any>(null);
  const [ETtoETH, setETtoETH] = React.useState<any>(null);
  const [myET, setMyET] = React.useState<number>(0);
  const [transactions, setTransactions] = React.useState<any[]>([]);

  // Model
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const [inputValue, setInputValue] = React.useState<number>(0);
  const handleInput = (e:any) => setInputValue(e.currentTarget.value);

  //yan islemler

  const handleUseEffect = async () => {
    if (!yenile) return;
    setYenile(false);
    load().then((e) => {
      setUyelik(e.uyelik);
      setContracttoken(e.contractET);
      setContracttokensale(e.contractETS);
      setTokenssatis(e.tokensSatis);
      setTransactionCount(e.transactionCount);
      setEthFunds(e.ethFunds);
      const esadtokenETH = (50 / e.ethPriceN).toFixed(2);
      setETtoETH(ETtoETH);
      setTransactions(e.transactions)
      setMyET(e.myET);
    });
  };

  // React.useEffect ile yan işlemleri cagirma
  React.useEffect(() => { handleUseEffect(); } );


  // Fonksiyonlar
  const isLoading = () => uyelik == null || contracttoken == null || contracttokensale == null || tokenssatis == null || transactionCount == null || ethFunds == null || ETtoETH == null;
  const SliderValue = () => {
    const bigInt = 1000000000 * 10**18; // arz * gwei
    const r = ((tokenssatis * 100) / bigInt);
    return r;
  };
  const buyTokens = async () => {
    const big = BigInt(inputValue * 10**18);
    await contracttokensale.buyToken(big, {
      from: uyelik,
      value: inputValue * ETtoETH * 10**18,
      gas: 500000 // Gas limit
    });
    setIsOpen(false);
    setYenile(true);
  };

  return (
    isLoading() ? <Loading /> :
    <VStack minH='800px' w='full' bg={bg}>
      
      
      <HStack w='md' display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
        <Heading size='md'>1EsadToken = 1 USD = {ETtoETH} ETH</Heading>
        <Spacer/>
        <Link href='https://faucets.chain.link/' isExternal>
          <Button bg='gray.600' color='gray.200' variant='link' w='100px' minH='40px'>ETH Al</Button>
        </Link>
      </HStack> 

      
     
      <Box h='10px'/>
      
      <HStack w='md' display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
        <Slider value={SliderValue()} h='50px'>
          <SliderTrack bg={sliderBG} h='25px' borderRadius={8}>
            <SliderFilledTrack bg={doldur}/>
            <Center>
              <Text>{Number(tokenssatis).toFixed()} / 1.000.000.000 EsadToken</Text>
            </Center>
          </SliderTrack>
        </Slider>
      </HStack>
    
      <HStack w='md' h='50px' bg={hBG} borderRadius={8} display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
        <Box w='5px'/>
      
        <Box w='1px'/>
        <Text>{transactionCount} İşlemler</Text>
      </HStack>

      <HStack w='md' h='50px' bg={hBG} borderRadius={8} display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
       
        <Text>{(ethFunds / 10**18).toFixed(2)} ETH</Text>
      </HStack>
      
      <HStack w='md' h='50px' bg={hBG} borderRadius={8} display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
        <Box w='15px' />
        <Text>Adresim: {uyelik}</Text>
      </HStack>
 
      <HStack w='md' h='50px' bg={hBG} borderRadius={8} display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
        
        <Text>{myET}</Text>
      </HStack>
      
   
      <HStack w='full' display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
      {
        transactions.length == 0 ? null :
        <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            transactions.map((tran, idx) =>
            <Tr key={idx}>
            <Td fontSize='10px'>{tran[0]}</Td>
            <Td>{(tran[1] / 10**18).toFixed()}</Td>
          </Tr>
            )
          }
        </Tbody>
      </Table>
      }
      
      {
        transactions.length == 0 ? null :
        <VStack w='full'>
          <HStack w='full'>
            <Box w='10px' />
            <Text color={doldur}>Address</Text>
            <Spacer />
            <Text color={doldur}>Amount</Text>
            <Box w='10px' />
          </HStack>
          <Box h='10px'/>
          {
            transactions.map((tran, idx) =>
            <HStack w='full' key={idx}>
              <Box w='10px' />
              <Text fontSize='xs'>{tran[0]}</Text>
              <Spacer />
              <Text>{(tran[1] / 10**18).toFixed(2)}</Text>
              <Box h='10px' w='10px' />
            </HStack>
            )
          }
        </VStack>
      }
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Token Satın AL !</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Input
            placeholder='1 EsadToken'
            type='number'
            value={inputValue}
            onChange={handleInput}
            size='md'
            />
          </ModalBody>
          <ModalFooter>
            <Button bg='green.400' onClick={buyTokens}>Satın Al</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default Home
