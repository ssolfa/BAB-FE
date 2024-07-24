import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import { SplashContainer, Logo, Title } from './Splash.style';

export const Splash: React.FC = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const timer = setTimeout(()=>navigate("/membertype"), 1000);
        return ()=> clearTimeout(timer);
    }, []);

    return (
        <SplashContainer>
            <Logo src="src/assets/bablogo.png" alt="Logo" />
            <Title>밥이득</Title>
        </SplashContainer>
    );
};
