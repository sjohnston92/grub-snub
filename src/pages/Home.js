import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth,db} from '../firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { collection, doc, setDoc, getDocs} from "firebase/firestore"; 

import FoodBack from '../images/foodBacker.jpeg'


import Profile from '../components/Profile';
import AllGrubs from '../components/AllGrubs';
import Cities from '../components/Cities';

const Home = () => {
    const citiesRef = collection(db, "cities");
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [cities, setCities] = useState([]);
    const [showAllGrubs, setShowAllGrubs] = useState(false);
    const [showCities, setShowCities] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
            setFirstName(user.displayName.split(' ')[0]); // Get the first name from the display name
        }
        getCities();
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        });
    }
    const getCities = async () => {
        try {
            const citiesSnapshot = await getDocs(citiesRef);
            const citiesData = citiesSnapshot.docs.map(doc => doc.data());
            setCities(citiesData);
        } catch (error) {
            console.error("Error getting cities data:", error);
        }
    }

    const addCities = () => {
        console.log('hi');
    }

    const handleShowAllGrubs = () => {
        setShowAllGrubs(true);
        setShowCities(false);
    }

    const handleShowCities = () => {
        setShowAllGrubs(false);
        setShowCities(true);
    }
 
    return (
        <DashContainer>
            <ProfileContainer>
                <p>
                    Welcome Home, {firstName}
                </p>
            </ProfileContainer>
            <MainContainer>
                <div>
                    <button onClick={handleShowCities}>
                        Cities
                    </button>
                    <button onClick={handleShowAllGrubs}>
                        Top Spots
                    </button>
                    {showAllGrubs && <AllGrubs />}
                    {showCities && !showAllGrubs && <Cities  cities={cities} />}

                    <AddCityButton onClick={addCities}>+</AddCityButton>
                </div>
            </MainContainer>
            <LogoutContainer onClick={handleLogout}>
                    Logout 
            </LogoutContainer>
        </ DashContainer>
    )
}

const DashContainer = styled.div`
    background-image: url(${FoodBack});
    background-position: center;
    background-size: contain;
    height:100vh;
    padding: 10px;
`
const ProfileContainer = styled.div`
    border-radius: 15px;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    margin-bottom:10px;   
`
const MainContainer = styled.div`
    border-radius: 15px;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);   
`
const LogoutContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 15px 15px 0px 0px;
    padding: 20px;
    color:#ffffff;
    text-align:center;
    background: #F04D6D;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); 
    margin-top:10px;
`

const AddCityButton = styled.div`
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); 
    text-align:center;
    border-radius: 15px;
    padding: 20px;
    background:#0C86D6;

`

export default Home;