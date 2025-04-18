import {useState} from 'react'
import { Box, HStack, IconButton, Image, Text, useColorModeValue, Heading, useToast, useDisclosure, VStack, Button} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'
import {MdDeleteForever} from 'react-icons/md'
import { useProductStore } from '../store/product.js'


const ProductCard = ({product}) => {
    const [updatedProduct, setUpdateProduct] = useState(product)
    const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();
    const{isOpen, onOpen, onClose} = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const {success,message} = await deleteProduct(pid);
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message}=await updateProduct(pid, updatedProduct);
        onClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

  return (
    <Box shadow={"lg"} borderRadius="lg" overflow="hidden" transition="all 0.3s" _hover={{ transform:"translateY(-5px)",shadow:"xl"}} bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}/>
        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight={"bold"} fontSize="xl" color={textColor} mb={4}>
                ₹{product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<FaEdit/>} onClick={onOpen} colorScheme='blue'/>
                <IconButton icon={<MdDeleteForever/>} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'/>
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack spacing={4} w={"full"}>
                            <input 
                            style={{ outline: "1px solid", width: "100%", padding: "8px", borderRadius: "4px" }}
                            placeholder='Product Name' name='name' value={updatedProduct.name}
                            onChange={(e) =>setUpdateProduct({...updatedProduct, name: e.target.value})}
                            />
                            <input
                            style={{ outline: "1px solid", width: "100%", padding: "8px", borderRadius: "4px" }}
                            placeholder='Product Price' name='price' type='number' value={updatedProduct.price}
                            onChange={(e) =>setUpdateProduct({...updatedProduct, price: e.target.value})}
                            />
                            <input
                            style={{ outline: "1px solid", width: "100%", padding: "8px", borderRadius: "4px" }}
                            placeholder='Product Image URL' name='image' value={updatedProduct.image}
                            onChange={(e) =>setUpdateProduct({...updatedProduct, image: e.target.value})} 
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update
                        </Button>
                        <Button colorScheme='red' onClick={onClose} ml={3}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
        </Modal>
    </Box>
  )
}
export default ProductCard