import {  FC } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import { AuthProvider } from "../contexts/AuthContext";
import NotFound from "./NotFound";
import SecureRoute from "../routes/SecureRoute";
import Cart from "./Cart";
import GuestRoute from "../routes/guestRoute";

const App: FC = () => {


  return (
      <ChakraProvider>
        <AuthProvider>
          {/*<GlobalStyles/>*/}
          <Routes>
              <Route element={<GuestRoute/>}>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
              </Route>

            <Route element={<SecureRoute/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/notFound" element={<NotFound/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/notFound"/>}/>
          </Routes>
        </AuthProvider>
      </ChakraProvider>

  );
};

export default App;