import {HStack,Text,Container,Button, Flex, useColorMode} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react'
import { CiSquarePlus } from 'react-icons/ci';
import { FaMoon,FaSun } from 'react-icons/fa';

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return <Container maxW={"1140px"} px={4}>
    <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{base:"column", md:"row"}}>
        <Text
          fontSize={{base:"22",sm:"28"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r,cyan.400, blue.500)"}
          bgClip={"text"}
        >
            <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={4} mt={{base:4, md:0}}>
            <Link to={"/create"}>
                <Button>
                    <CiSquarePlus fontSize={20}/>
                </Button>
            </Link>
            <Button onClick={toggleColorMode}>
                {colorMode ==="light" ? <FaMoon fontSize={20}/> : <FaSun fontSize={20}/>}
            </Button>
        </HStack>
    </Flex>
  </Container>
}

export default Navbar;
