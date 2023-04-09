import React, { useState } from 'react';
import styled from 'styled-components';
import { BsThreeDotsVertical, BsFillTrash3Fill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Cities = ({ cities }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate(); // Get the history object from react-router-dom

  const handleDotsClick = (city) => {
    setSelectedCity((prevCity) => (prevCity === city ? null : city));
  };

  const handleDelete = () => {
    // Delete city logic here
  };

  const handleContainerClick = (city) => {
    if (city && city.name) {
      // Redirect to city's unique URL with the city id as parameter
      const cityId = `${city.name.toLowerCase().replace(/\s+/g, '-')}-${city.state.toLowerCase()}`;
      navigate(`/${cityId}/grubs`); // Update the path with the city id
    }
  };

  return (
    <>
      {cities.map((city, index) => (
        <CityContainer
          key={index}
          selected={city === selectedCity}
        >
          <div  onClick={() => handleContainerClick(city)}>
            <CityName>{city.name}</CityName>
          </div>
          <DotsContainer onClick={() => handleDotsClick(city)}>
            <BsThreeDotsVertical />
          </DotsContainer>
          {city === selectedCity && (
            <FormContainer>
              <Form>
                {/* Add form elements here */}
              </Form>
              <DeleteButton onClick={handleDelete}>
                <BsFillTrash3Fill />
              </DeleteButton>
            </FormContainer>
          )}
        </CityContainer>
      ))}
    </>
  );
};

const CityContainer = styled.div`
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  transform-origin: top center;
  transform: ${(props) => (props.selected ? 'scale(1.05)' : 'scale(1)')};
  cursor: pointer; /* Add cursor pointer for clickability */
`;

const CityName = styled.span`
  /* Add any additional styles for the city name here */
`;

const DotsContainer = styled.span`
  cursor: pointer;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 20px;
  background: white;
  margin-top: 5px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  /* Add any styles for the form container here */
`;

const DeleteButton = styled.div`
  color: #ffffff;
  background: #f04d6d;
  padding: 10px;
  border-radius: 15px;
`;

export default Cities;