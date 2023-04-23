import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import FoodBack from '../images/foodBacker.jpeg'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore"; 
import { Modal,Spin,Row,Col,Form, Input, Slider } from 'antd';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';
import {FaPlus} from 'react-icons/fa'




const Grubs = () => {
  const [cityData, setCityData] = useState(null);
  const [grubsData, setGrubsData] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: cityId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [style,setStyle] =useState('')
  const [name,setName] =useState('')
  const [ambience,setAmbience] =useState(5)
  const [service,setService] =useState(5)
  const [grub,setGrub] =useState(5)

  const handleGoBack = () => {
    navigate(-1);
  };

  const getForCityGrubs = async () => {
    try {
      const grubsSnapshot = await getDocs(collection(db, "grubs"));
      const grubsData = grubsSnapshot.docs.map(doc => doc.data());
      setGrubsData(grubsData.filter(grub => grub.cityId === cityData.id));
    } catch (error) {
      console.error("Error getting grubs data:", error);
    }
  }

  const getCityData = async () => {
    try {
      if (cityId) {
        const cityDocRef = doc(db, 'cities', cityId);
        const cityDocSnapshot = await getDoc(cityDocRef);
        if (cityDocSnapshot.exists()) {
          setCityData(cityDocSnapshot.data());
        } else {
          console.log(`City with ID '${cityId}' not found in Firebase`);
        }
      }
    } catch (error) {
      console.error('Error fetching city data from Firebase: ', error);
    }
  };

  const createGrub = async () => {
    try {
      const ambienceNum = ambience;
      const grubNum = grub;
      const serviceNum = service
      const total = (ambienceNum + grubNum + serviceNum) / 3;
      const roundedTotal = total.toFixed(2)

      const newGrub = {
        cityId: cityData.id,
        name: name,
        ambience: ambience,
        grub: grub,
        service: service,
        style: style,
        total: Number(roundedTotal) 
      };
      const grubDocRef = await addDoc(collection(db, 'grubs'), newGrub);
      newGrub.id = grubDocRef.id;
      setGrubsData([...grubsData, newGrub]); 
    } catch (error) {
      console.error('Error creating new grub:', error);
    }
    handleCancel()
  };





  useEffect(() => {
    getCityData();
  }, [cityId]);

  useEffect(() => {
    if (cityData) {
      getForCityGrubs(); // Fetch grubs data after cityData is set
    }
  }, [cityData]);

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
  const handleGrubChange = (value) => {
    setGrub(value);
  };

  const handleServiceChange = (value) => {
    setService(value);
  };

  const handleAmbienceChange = (value) => {
    setAmbience(value);
  };
  const handleModalStyleChange = (e) => {
    setStyle(e.target.value);
  };


  return (
    <Container>
      <ContentContainer>
        {cityData ? (
          <>
            <BackButton onClick={handleGoBack}><BsFillArrowLeftCircleFill/></BackButton>
            <HeaderCity>
              <HeaderTop>
                {cityData.name}
              </HeaderTop>
              <HeaderBottom>
                {cityData.state}
              </HeaderBottom>
            </HeaderCity>
            <AddGrubButton onClick={showModal}><FaPlus/></AddGrubButton>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            footer={[
                <button onClick={createGrub}>
                  Submit
                </button>,
              ]}
            >
        <Form form={form} onFinish={createGrub}>
        <Form.Item name="name" label="Restaurant Name" rules={[{ required: true }]}>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={handleModalNameChange}
          />
        </Form.Item>
        <Form.Item name="grub" label="Quality of Food" rules={[{ required: true }]}>
          <Slider
            id="grub"
            value={grub}
            min={1} 
            max={10} 
            onChange={handleGrubChange}
            marks={{ 1: '1', 10: '10' }}
            step={0.1}
          />
        </Form.Item>
        <Form.Item name="service" label="Quality of Service" rules={[{ required: true }]}>
          <Slider
            id="service"
            value={service}
            onChange={handleServiceChange}
            min={1} 
            max={10}
            marks={{ 1: '1', 10: '10' }}
            step={0.1}
          />
        </Form.Item>
        <Form.Item name="ambience" label="Ambience of Restaurant" rules={[{ required: true }]}>
          <Slider
            id="ambience"
            min={1} 
            max={10}
            value={ambience}
            onChange={handleAmbienceChange}
            marks={{ 1: '1', 10: '10' }}
            step={0.1}
          />
        </Form.Item>
        <Form.Item name="type" label="Type of Restaurant" rules={[{ required: true }]}>
          <Input
            type="text"
            id="style"
            value={style}
            onChange={handleModalStyleChange}
          />
        </Form.Item>
        </Form>
            </Modal>
            {grubsData.map(grub => (
              <GrubContainer key={grub.id}>
                <Row gutter={[8, 8]} justify="center" align="middle">
                  <Col span={20}>
                    {grub.name}
                  </Col>
                  <NumberCol  span={4}>
                    {grub.total}
                  </NumberCol >
                </Row>
              </GrubContainer>
            ))}
          </>
        ) : (
          <Spin  justify="center" align="middle"/>
        )}
      </ContentContainer>
    </Container>
  );
};

const NumberCol = styled(Col)`
  background: #F04D6D;
  border-radius: 19%;
  padding:20px;
  padding-left:20px;
  color:white;
  font-size:20px;
  font-weight:800;
  text-align:center;
`

const Container = styled.div`
  background-image: url(${FoodBack});
  background-position: center;
  background-size: contain;
  padding-top:10px;
  padding-bottom:10px;
  height:100vh;
`

const ContentContainer = styled.div`
  background: #ffffff;
  margin: 5%;
  padding: 5%;
  border-radius: 15px;
  background-position: center;
  background-size: contain;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative; /* Add position relative to make back button absolute relative to this container */
`;

const HeaderCity = styled.div`
  text-align:center;
  text-transform
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
  position: absolute;
  top: 10px; /* Adjust top value to desired position */
  left: 10px; /* Adjust left value to desired position */
  background-color: #ccc;
  padding: 5px 20px 0px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size:20px;
  color:#ffffff;
`;

const AddGrubButton = styled.div`
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); 
  text-align:center;
  border-radius: 15px;
  padding: 20px;
  background:#0C86D6;
  margin-top:10px;
  color:white;
`

const GrubContainer = styled.div`
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  transform-origin: top center;
  cursor: pointer;
  padding-left:10px;
`;

export default Grubs;