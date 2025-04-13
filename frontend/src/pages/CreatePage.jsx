import { Heading, VStack, Container,Box, useColorModeValue, Button} from '@chakra-ui/react'
import React, { use } from 'react'
import { h1 } from 'react-dom'
import { useProductStore } from '../store/product'
import { useToast } from '@chakra-ui/react'

const CreatePage = () => {
    const[newProduct, setNewProduct] = React.useState({
        name: "",
        price: "",
        image: "",
    })
    const toast = useToast();

    const {createProduct} = useProductStore();
    const handleNewProduct = async () => {
    const {success,message} = await createProduct(newProduct);
    if(!success){
        toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }
    else{
        toast({
            title: "Success",
            description: message,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        setNewProduct({
            name: "",
            price: "",
            image: "",
        });
    }
}
return (
<Container maxW={"container.sm"}>
    <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
            </Heading>
            <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            p={6} rounded={"lg"} shadow={"lg"}>
                    <VStack spacing={4} w={"full"}>
                            <input 
                            style={{ outline: "1px solid", width: "100%", padding: "8px", borderRadius: "4px" }}
                            placeholder='Product Name' name='name' value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required
                            />
                            <input
                            style={{ outline: "1px solid", width: "100%", padding: "8px", borderRadius: "4px" }}
                            placeholder='Product Price' name='price' type='number' value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required
                            />
                            <input
                            style={{ outline: "1px solid", width: "100%", padding: "8px", borderRadius: "4px" }}
                            placeholder='Product Image URL' name='image' value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} required
                            />
                            <Button colorScheme='teal' onClick={handleNewProduct} w={"full"}>
                                    Add Product
                            </Button>
                    </VStack>
            </Box>
    </VStack>
</Container>
);
}

export default CreatePage
