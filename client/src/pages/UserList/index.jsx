import React, { useState, useEffect } from 'react';
import { getAllUsers, getUserCount } from "../../utils/api";
import "./style.css";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from "mdb-react-ui-kit";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getAllUsers();
      setUsers(userData);
      const countData = await getUserCount();
      setUserCount(countData);
    };
    fetchUsers();
  }, []);

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <h1>User List</h1>
          <p>Total Users: {userCount}</p>
          {users.map(user => (
            <MDBCard key={user._id} className="mb-3">
              <MDBCardImage src={`/images/${user.photo}`} position="top" alt={user.username} />
              <MDBCardBody>
                <MDBCardText>{user.username}</MDBCardText>
                <MDBBtn href={`/user/${user._id}`}>View Profile</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          ))}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default UserList;
