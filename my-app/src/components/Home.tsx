import React, {useEffect} from 'react';
import styled from 'styled-components';
import {colors, Container, fonts, Header, Button, mixins, Section, Avatar} from '../styles/styles';
import {useQuery} from "@tanstack/react-query";
import { Box, Spinner} from "@chakra-ui/react";

import {useAuth} from "../contexts/AuthContext";
import {Product, User} from "../types/types";
import {getProducts} from "../services/productService";



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
  width: 90px;
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








const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const ServiceCard = styled.div`
  background-color: ${colors.lightGreen};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ServiceIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
`;

const ServiceName = styled.p`
  font-size: 14px;
  color: ${colors.gray};
  font-family: ${fonts.primary};
`;

const HomePage = () => {
    const { logout } = useAuth();

    const { data: products, isLoading, isError } = useQuery<Product[]>({
        queryKey: ['productData'],
        queryFn: getProducts
    });

    useEffect(() => {
        if (isError) {
            logout();
        }
    }, [isError, logout]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (isError) {
        return null;
    }


    return (
        <Container>
            <Header>
                <UserInfo>
                    <Avatar imageurl="img/avatar1.png"/>
                    <Greeting>
                        {/*<UserName>Привет, {user?.name}!</UserName>*/}
                        {/*<Location>Bangalore, India</Location>*/}
                    </Greeting>
                </UserInfo>
                <IconGroup>
                    <Button>
                    </Button>
                    <Button>
                    </Button>
                </IconGroup>
            </Header>
            <Section>
                <SectionTitle>Your Pets</SectionTitle>
                {/*<ProductList/>*/}
            </Section>

            <Section>
                <SectionTitle>Services</SectionTitle>
                <ServicesGrid>
                    <ServiceCard>
                        <ServiceIcon src="img/service-icon.svg" alt="Daycare"/>
                        <ServiceName>Daycare</ServiceName>
                    </ServiceCard>
                    <ServiceCard>
                        <ServiceIcon src="img/service-icon.svg" alt="Health"/>
                        <ServiceName>Health</ServiceName>
                    </ServiceCard>
                    <ServiceCard>
                        <ServiceIcon src="img/service-icon.svg" alt="Grooming"/>
                        <ServiceName>Grooming</ServiceName>
                    </ServiceCard>
                    <ServiceCard>
                        <ServiceIcon src="img/service-icon.svg" alt="Tracking"/>
                        <ServiceName>Tracking</ServiceName>
                    </ServiceCard>
                </ServicesGrid>
            </Section>
        </Container>
    );
}

export default HomePage;
