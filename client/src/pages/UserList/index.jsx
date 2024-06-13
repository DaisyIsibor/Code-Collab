// This page displays a list of all users with links to their profile page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers, getUserCount } from '../../utils/api';
import './style.css';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
// UserList component to display a list of all users
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
        const count = await getUserCount();
        setUserCount(count);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error.message ? error.message : error);
        setError(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    if (userCount > 0) {
      let start = 0;
      const duration = 2000;
      const increment = userCount / (duration / 100);
      const animateCount = () => {
        start += increment;
        if (start < userCount) {
          setDisplayedCount(Math.floor(start));
          setTimeout(animateCount, 50);
        } else {
          setDisplayedCount(userCount);
        }
      };
      animateCount();
    }
  }, [userCount]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }
// added search query
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
// <<<<<<< sheryl/code-work4
//     <div>
//       <h2>All Users</h2>
//       <p>Total Registered Users: {displayedCount}</p> {/* Display animated user count */}
//       {users.length > 0 ? (
//         <ul>
//           {users.map((user) => (
//             <li key={user._id}>
//               <img src={`/images/${user.photo}`} alt={user.username}/>
//               <Link to={`/users/${user._id}`}>{user.username}</Link>
//               {/* ADD CODING LANGUAGES */}
//               <p>{user.codingLanguages}</p>
//               {/* ADD LOCATION */}
//               <p> {user.location}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div>No users found</div>
//       )}
//     </div>
//
    <MDBContainer>
      <MDBTypography tag="h6" className="header-text">
        All Users
      </MDBTypography>
      <MDBTypography tag="h6" className="header-text">
        Total Registered Users: {displayedCount}
      </MDBTypography>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <MDBRow className="justify-content-center">
        {filteredUsers.map((user) => (
          <MDBCol md="6" lg="4" key={user._id}>
            <MDBCard className="user-card">
              <MDBCardBody className="user-card-body text-center">
                <MDBCardImage
                  src={user.photo ? `/images/${user.photo}` : '/default-image.jpg'}
                  alt={user.username}
                  className="user-card-image mb-3"
                  fluid
                />
                <MDBTypography tag="h5" className="mb-2">
                  {user.username}
                </MDBTypography>
                <MDBTypography tag="p" className="user-card-text">
                  {user.location}
                </MDBTypography>
                <MDBTypography tag="p" className="user-card-text">
                  {user.codingLanguages}
                </MDBTypography>
                <div className="user-card-buttons">
                  <Link to={`/users/${user._id}`}>
                    <MDBBtn outline color="dark" rounded size="sm">
                      Go to profile
                    </MDBBtn>
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};
export default UserList;
// import React, { useState, useEffect } from 'react';
// import { getAllUsers, getUserCount } from "../../utils/api";
// import "./style.css";
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from "mdb-react-ui-kit";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [userCount, setUserCount] = useState(0);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const userData = await getAllUsers();
//       setUsers(userData);
//       const countData = await getUserCount();
//       setUserCount(countData);
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <MDBContainer>
//       <MDBRow>
//         <MDBCol>
//           <h1>User List</h1>
//           <p>Total Users: {userCount}</p>
//           {users.map(user => (
//             <MDBCard key={user._id} className="mb-3">
//               <MDBCardImage src={`/images/${user.photo}`} position="top" alt={user.username} />
//               <MDBCardBody>
//                 <MDBCardText>{user.username}</MDBCardText>
//                 <MDBBtn href={`/user/${user._id}`}>View Profile</MDBBtn>
//               </MDBCardBody>
//             </MDBCard>
//           ))}
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

// export default UserList;
