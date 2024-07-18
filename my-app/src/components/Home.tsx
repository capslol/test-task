import React, {useEffect} from 'react';
import styled from 'styled-components';
import {colors, Container, fonts, Header, Button, Section, Avatar} from '../styles/styles';
import {useQuery} from "@tanstack/react-query";
import {Box, Spinner} from "@chakra-ui/react";
import {useAuth} from "../contexts/AuthContext";
import {User} from "../types/types";
import {getUserData} from "../services/authService";
import ProductList from "./ProductList";
import {useNavigate} from "react-router-dom";
import io from 'socket.io-client';
import {PiBellLight} from "react-icons/pi";
import {CiSearch} from "react-icons/ci";
import {CiShoppingCart} from "react-icons/ci";
import {getCartItems} from "../services/cartService";


const HomePage = () => {
    const {logout} = useAuth();
    const navigate = useNavigate()


    useEffect(() => {
        // const socket = io('http://localhost:1337', {
        //     withCredentials: true, //
        //
        // });
        //
        // socket.on('connect', () => {
        //     console.log('Connected to WebSocket server');
        // });
        //
        // socket.on('disconnect', () => {
        //     console.log('Disconnected from WebSocket server');
        // });
        //
        // socket.emit('messageFromClient', 'Hello Server!');
        //
        // socket.on('messageFromServer', (message) => {
        //     console.log('Received message from server:', message);
        // });
        //
        // return () => {
        //     socket.disconnect();
        // };
    }, []);


    const {data: user, isLoading: isLoadingUser, isError: isErrorUser} = useQuery<User>({
        queryKey: ['userData'],
        queryFn: getUserData,
    });

    useEffect(() => {
        if (isErrorUser) {
            logout();
        }
    }, [isErrorUser, logout]);

    if (isLoadingUser) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl"/>
            </Box>
        );
    }

    if (isErrorUser) {
        return null;
    }


    return (
        <Container>
            <Header>
                <UserInfo>
                    <Avatar imageurl="img/avatar1.png"/>
                    <Greeting>
                        <UserName>Hi, {user?.username}!</UserName>
                    </Greeting>
                </UserInfo>
                <IconGroup>
                    <Button>
                        <StyledPiBellLight/>
                    </Button>
                    <Button>
                        <StyledCiSearch/>
                    </Button>
                    <Button onClick={() => navigate('/cart')}>
                        <StyledCiShoppingCart/>
                    </Button>
                </IconGroup>
            </Header>
            <Section>
                <SectionTitle>
                </SectionTitle>
            </Section>
            <Section>
                <SectionTitle>Catalog</SectionTitle>
                <ProductList></ProductList>
            </Section>
        </Container>
    );
}


const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-size: 16px;
  margin: 0;
  font-family: ${fonts.primary};
`;

const Location = styled.p`
  font-size: 14px;
  color: ${colors.gray};
  margin: 0;
  font-family: ${fonts.primary};
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 150px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
`;


const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
  font-family: ${fonts.primary};
`;

const StyledPiBellLight = styled(PiBellLight)`
  height: 24px;
  width: 24px;
`;
const StyledCiSearch = styled(CiSearch)`
  height: 24px;
  width: 24px;
`;
const StyledCiShoppingCart = styled(CiShoppingCart)`
  height: 24px;
  width: 24px;
`;


export default HomePage;

