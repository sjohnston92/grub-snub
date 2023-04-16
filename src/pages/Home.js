import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Firbase
import { collection, doc, setDoc, getDocs,addDoc,updateDoc,deleteDoc} from "firebase/firestore"; 
import { signOut } from "firebase/auth";
import { auth,db} from '../firebase';

// Components
import Profile from '../components/Profile';
import AllGrubs from '../components/AllGrubs';
import Cities from '../components/Cities';

// Imported Styles and UI
import FoodBack from '../images/foodBacker.jpeg'
import { Modal } from 'antd';
import styled from 'styled-components';




const Home = () => {

    // Navigation
    const navigate = useNavigate();

    // Auth
    const [userEmail, setUserEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);

    // Navigation
    const citiesRef = collection(db, "cities");

    // UI DB Properties
    const [name,setName] =useState('')
    const [state,setState] =useState('')
    const [cities, setCities] = useState([]);
    const [grubsData, setGrubsData] = useState([]);

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAllGrubs, setShowAllGrubs] = useState(false);
    const [showCities, setShowCities] = useState(true);

    // useEffect -> {Profile},{Cities},{AllGrubs}
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
            setFirstName(user.displayName.split(' ')[0]); // Get the first name from the display name
        }
        getCities();
        getGrubs();
    }, []);

    // handleLogout -> void
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        });
    }

    // getCities -> {citiesData?}
    const getCities = async () => {
        try {
            const citiesSnapshot = await getDocs(citiesRef);
            const citiesData = citiesSnapshot.docs.map(doc => doc.data());
            setCities(citiesData);
        } catch (error) {
            console.error("Error getting cities data:", error);
        }
    }

    // getGrubs -> {grubsData?}
    const getGrubs = async () => {
        try {
          const grubsSnapshot = await getDocs(collection(db, "grubs"));
          const grubsData = grubsSnapshot.docs.map(doc => doc.data());
          setGrubsData(grubsData);
        } catch (error) {
          console.error("Error getting grubs data:", error);
        }
      }

    // handleCreate -> {City}
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
          const city = {
            id: '',
            name: name,
            state: state,
          };
          const docRef = await addDoc(collection(db, 'cities'), city);
          city.id = docRef.id; 
          await updateDoc(doc(db, 'cities', docRef.id), city); 
          handleCancel();
          getCities();
        } catch (err) {
          alert(err);
        }
      };
    
    //handleDelete -> void
    const handleDelete = async (cityId) => {
        const cityDocRef = doc(db, 'cities', cityId);
            try {
                await deleteDoc(cityDocRef);
                getCities();
            } catch (err) {
                alert(err)
            }
    }

    // Modals Below
    const handleShowAllGrubs = () => {
        setShowAllGrubs(true);
        setShowCities(false);
    }

    const handleShowCities = () => {
        setShowAllGrubs(false);
        setShowCities(true);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleModalNameChange = (e) => {
        setName(e.target.value);
    };

    const handleModalStateChange = (e) => {
        setState(e.target.value);
    };
 
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
                    {showAllGrubs && <AllGrubs grubs={grubsData}/>}
                    {showCities && !showAllGrubs && <Cities  cities={cities}  handleDelete={handleDelete} />}

                    <AddCityButton onClick={showModal}>+</AddCityButton>
                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                    footer={[
                       <button onClick={handleCreate}>
                          Submit
                        </button>,
                      ]}
                    >
                        <form>
                        <label htmlFor="modalName">Name:</label>
                        <input
                            type="text"
                            id="modalName"
                            value={name}
                            onChange={handleModalNameChange}
                        />
                        <label htmlFor="modalState">State:</label>
                        <input
                            type="text"
                            id="modalState"
                            value={state}
                            onChange={handleModalStateChange}
                        />
                    </form>
                     
                    </Modal>
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