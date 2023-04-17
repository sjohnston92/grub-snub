import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Row,Col} from 'antd';

const Profile = ({user}) => {
  return (
    <>
    {user ? (
      <Row gutter={[8, 8]} align="middle" justify="center">
      <Col span={7}>
        <Avatar size={64} icon={<UserOutlined />} />
      </Col>
      <Col span={17}>
        {user.displayName}
        <br/>
        {user.email}
      </Col>
    </Row>
    ):(
      console.log('Profile Loaded')
    )
    }
    </>
  )
}

export default Profile