
export const apiVariables = {
 signup:{
   url: "/authentication/createUser",
 },
 signin:{
  url:"/authentication/login"
 },
 uploadDP:{
  url:"/authentication/upload-dp"
 },
 getLoggedInUserData:{
  url:"/authentication/getLoggedInUserData"
 },
 logout:{
  url:"/authentication/logout"
 },
 userProfilePicture:{
  url:"/authentication/user_profiel_picture"

 },
 createPost:{
  url:"/services/createPost"
 },
 getPosts:{
  url:"/services/get-Post"
 },
//  searchPotentialConnetion:{
//   url:"/services/search_potential_connetion"
//  },
 searchPotentialConnetion: (username) => ({
  url: `/services/search_potential_connetion?username=${username}`
}),

getPendingFriendRequest:{
  url:"/services/get_received_friendRequests"
},
getAllUsers:{
  url:"/services/all_users"
},
sendFriendRequest:{
  url:"/services/receieve_friend_requests"
},
}

