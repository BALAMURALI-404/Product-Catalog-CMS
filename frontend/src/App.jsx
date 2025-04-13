import {Box} from '@chakra-ui/react';
import {Route ,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { useColorModeValue } from '@chakra-ui/react'; 

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("grey.100","grey.900")}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create" element={<CreatePage/>}/>
        </Routes>
      </Box>
    </>
  )
}

export default App
