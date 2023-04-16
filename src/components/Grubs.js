import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import the db object from firebase.js
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import styled from 'styled-components';
import FoodBack from '../images/foodBacker.jpeg'
import { collection, doc, setDoc, getDocs, addDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore"; 


const Grubs = () => {
  const [cityData, setCityData] = useState(null);
  const [grubsData, setGrubsData] = useState([]); // Add state for grubs data
  const { id: cityId } = useParams();
  const navigate = useNavigate();
  const [newGrub, setNewGrub] = useState({ name: '', score: '', category: '', id: '', type: '' });

  useEffect(() => {
    fetchCityAndGrubsData();
  }, [cityId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchCityAndGrubsData = async () => {
    try {
      if (cityId) {
        const cityDocRef = doc(db, 'cities', cityId);
        const cityDocSnapshot = await getDoc(cityDocRef);
        if (cityDocSnapshot.exists()) {
          setCityData(cityDocSnapshot.data());

          // Fetch grubs associated with the city from Firebase
          const grubsCollectionRef = collection(db, 'cities', cityId, 'grubs');
          const grubsQuerySnapshot = await getDocs(grubsCollectionRef);
          const grubsData = grubsQuerySnapshot.docs.map(doc => doc.data());
          setGrubsData(grubsData); // Set grubs data in state
        } else {
          console.log(`City with ID '${cityId}' not found in Firebase`);
        }
      }
    } catch (error) {
      console.error('Error fetching city data from Firebase: ', error);
    }
  };

  const handleCreateGrub = async () => {
    try {
      // Create a new document in the 'grubs' collection associated with the city ID
      const grubsCollectionRef = collection(db, 'cities', cityId, 'grubs');
      await addDoc(grubsCollectionRef, newGrub);
      console.log('New grub added successfully!');
      // Fetch the updated grubs data and set it in state
      const grubsQuerySnapshot = await getDocs(grubsCollectionRef);
      const updatedGrubsData = grubsQuerySnapshot.docs.map(doc => doc.data());
      setGrubsData(updatedGrubsData);
      // Reset the new grub item state
      setNewGrub({ name: '', score: '', category: '', type: '' });

    } catch (error) {
      console.error('Error creating new grub: ', error);
    }
  };

  return (
    <Container>
      <ContentContainer>
        {cityData ? (
          <>
            <HeaderCity>
              <HeaderTop>
                {cityData.name}
              </HeaderTop>
              <HeaderBottom>
              {cityData.state}
              </HeaderBottom>
            </HeaderCity>
            {grubsData && grubsData.length > 0 ? (
              grubsData.map((grub, index) => (
                <div key={index}>
                  <p>Name: {grub.Name}</p>
                  <p>Score: {grub.Score}</p>
                  <p>Category: {grub.category}</p>
                  <p>ID: {grub.id}</p>
                  <p>Type: {grub.type}</p>
                </div>
              ))
            ) : (
              <p>No grubs data found.</p>
            )}
          </>
        ) : (
          <p>Loading city data...</p>
        )}
        <form onSubmit={handleCreateGrub}>
        <input
          type="text"
          placeholder="Name"
          value={newGrub.name}
          onChange={e => setNewGrub({ ...newGrub, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Score"
          value={newGrub.score}
          onChange={e => setNewGrub({ ...newGrub, score: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newGrub.category}
          onChange={e => setNewGrub({ ...newGrub, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={newGrub.type}
          onChange={e => setNewGrub({ ...newGrub, type: e.target.value })}
        />
        <button type="submit">Create Grub</button>
      </form>
        <BackButton onClick={handleGoBack}>Go Back</BackButton>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  background-image: url(${FoodBack});
  background-position: center;
  background-size: contain;
  padding-top:10px;
  padding-bottom:10px;
  height:100vh;
`

const ContentContainer = styled.div`
  background:#ffffff;
  margin:5%;
  padding:5%;
  border-radius:15px;
  background-position: center;
  background-size: contain;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`
const HeaderCity = styled.div`
  text-align:center;
  text-transform:uppercase;
`
const HeaderTop = styled.div`
  font-size: 24px; /* set desired font size */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* set desired drop shadow */
  line-height: 1.2; /* set desired line height */
  letter-spacing: 1px; /* set desired letter spacing */
`
const HeaderBottom = styled.div`
color: rgba(128, 128, 128, 0.7);
`;

const BackButton = styled.button`
  margin-top: 10px;
  background-color: #ccc;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

export default Grubs;