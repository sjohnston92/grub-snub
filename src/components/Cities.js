import React, { useState } from 'react';
import styled from 'styled-components';
import { BsThreeDotsVertical, BsFillTrash3Fill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {Row,Col} from 'antd'
import { BsX } from 'react-icons/bs';
import {FaShare,FaEdit} from 'react-icons/fa'

const Cities = ({ cities, handleDelete}) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate(); // Get the history object from react-router-dom
  const [showX, setShowX] = useState(false);

  const handleDotsClick = (city) => {
    setShowX(!showX);
    setSelectedCity((prevCity) => (prevCity === city ? null : city));
  };


  const handleContainerClick = (city) => {
    if (city) {
      navigate(`/cities/${city.id}`); // Update the path with the city id
    }
  };

  const handleCityDelete = (city) => {
    console.log(city)
    // Call the handleDelete function with the city's id to delete the city
    handleDelete(city.id);
  };


  return (
    <>
      {cities.map((city, index) => (
        <CityContainer key={index} selected={city === selectedCity}>
          <Row gutter={[8, 8]} style={{ textAlign: 'left', width: '100%' }} align="middle" justify="space-between">
            <Col span={22} onClick={() => handleContainerClick(city)}>
              <CityName>{city.name}</CityName>
              <br/>
              <span>{city.state}</span>

            </Col>
            <Col span={2}>
              <DotsContainer onClick={() => handleDotsClick(city)}>
                {showX ? (
                  // Display X icon if showX is true
                  <BsX />
                ) : (
                  // Display three dots icon if showX is false
                  <BsThreeDotsVertical />
                )}
              </DotsContainer>
            </Col>
            <Col span={24}>
              {city === selectedCity && (
                // Use CSS positioning to overlay FormContainer
                <FormContainer>
                  <Form>
                    {/* Render the form content */}
                  </Form>
                  <EditButton style={{ textAlign: 'center' }}>
                    <FaEdit/>
                  </EditButton>
                  <DeleteButton onClick={() => handleCityDelete(city)} style={{ textAlign: 'center' }}>
                    <BsFillTrash3Fill />
                  </DeleteButton>
                </FormContainer>
              )}
            </Col>
          </Row>
        </CityContainer>
      ))}
    </>
  );
};


const CityContainer = styled.div`
  display:flex;
  background:#FFFFFF;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 15px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  transform-origin: top center;
  transform: ${(props) => (props.selected ? 'scale(1.05)' : 'scale(1)')};
  cursor: pointer;
`;

const CityName = styled.span`
  font-size: 20px; /* set desired font size */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* set desired drop shadow */
  line-height: 1.2; /* set desired line height */
  letter-spacing: 1px; /* set desired letter spacing */
  text-transform: uppercase;
`;

const DotsContainer = styled.span`
  cursor: pointer;
`;

const FormContainer = styled.div`
  margin-top: 5px;
`;

const Form = styled.form`
  /* Add any styles for the form container here */
`;

const DeleteButton = styled.div`
  color: #ffffff;
  background: #f04d6d;
  padding: 10px;
  border-radius: 15px;
  margin-top:10px;
`;

const EditButton = styled.div`
  color: #ffffff;
  background: #FFC43D;
  padding: 10px;
  border-radius: 15px;
`;

export default Cities;