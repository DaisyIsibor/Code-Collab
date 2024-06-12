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


// // UserList component to display a list of all users
// const UserList = () => {
//   // Initializing users state to an empty array
//   const [users, setUsers] = useState([]);
//   // Initialize loading state to true
//   const [loading, setLoading] = useState(true);
//   // State to manage any errors
//   const [error, setError] = useState(null);
//   // State for user count
//   const [userCount, setUserCount] = useState(0);
//   // State for displayed user count (animated)
//   const [displayedCount, setDisplayedCount] = useState(0);

//   // Fetch all users and user count
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Fetch all users using API call
//         const userData = await getAllUsers();
//         // Update users with API data
//         setUsers(userData);

//         // Fetch user count using API call
//         const count = await getUserCount();
//         // Update user count with API data
//         setUserCount(count);

//         // Set loading to false once data is fetched
//         setLoading(false);
//       } catch (error) {
//         // Log any error that occurs and set the error state
//         console.error('Error fetching users:', error.message ? error.message : error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     // Call fetchUsers when component mounts
//     fetchUsers();
//   }, []);

//   // Animate the displayed count
//   useEffect(() => {
//     if (userCount > 0) {
//       let start = 0;
//       const duration = 2000; // Animation duration in ms
//       const increment = userCount / (duration / 100); // Calculate the increment per frame

//       const animateCount = () => {
//         start += increment;
//         if (start < userCount) {
//           setDisplayedCount(Math.floor(start));
//           setTimeout(animateCount, 50); // Update every 50ms
//         } else {
//           setDisplayedCount(userCount); // Ensure it ends exactly at the userCount
//         }
//       };

//       animateCount();
//     }
//   }, [userCount]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching users: {error.message}</div>;
//   }

//   // Render a list of users with links to their profile page and user count
//   return (
//     <MDBContainer>
//       <MDBTypography tag="h2">All Users</MDBTypography>
//       <MDBTypography tag="p">Total Registered Users: {displayedCount}</MDBTypography>
//       {users.length > 0 ? (
//         <MDBRow className="justify-content-center">
//           {users.map((user) => (
//             <MDBCol md="6" lg="4" className="mb-4" key={user._id}>
//               <MDBCard style={{ borderRadius: '15px' }}>
//                 <MDBCardBody className="p-4 text-black">
//                   <div className="d-flex align-items-center mb-4">
//                     <MDBCardImage
//                       style={{ width: '80px',height:'80px' }}
//                       className="img-fluid rounded-circle border border-dark border-3"
//                       src={`/images/${user.photo}`}
//                       alt={user.username}
//                       fluid
//                     />
//                     <div className="flex-grow-1 ms-3">
//                       <MDBTypography tag="h6" className="mb-0">{user.username}</MDBTypography>
//                       <MDBCardText className="text-muted mb-0">{user.location}</MDBCardText>
//                       <MDBCardText className="text-muted mb-0">{user.codingLanguages}</MDBCardText>
//                       <div className="d-flex flex-row align-items-center mt-2">
//                         <Link to={`/users/${user._id}`}>
//                           <MDBBtn outline color="dark" rounded size="sm">See profile</MDBBtn>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//           ))}
//         </MDBRow>
//       ) : (
//         <div>No users found</div>
//       )}
//     </MDBContainer>
//   );
// };

// export default UserList;

