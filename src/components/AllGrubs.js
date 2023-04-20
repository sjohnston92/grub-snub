import React from 'react'
import styled from 'styled-components';
import { Row,Col } from 'antd';


const AllGrubs = ({grubs}) => {
  const sortedGrubs = grubs.sort((a, b) => b.total - a.total);

  return (
    <>
    {sortedGrubs.map((grub) => (
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
  )
}

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



export default AllGrubs