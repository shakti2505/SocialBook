
export const apiVariables = {
  signup: {
    url: "/authentication/createUser",
  },
  signin: {
    url: "/authentication/login"
  },
  uploadDP: {
    url: "/authentication/upload-dp"
  },
  getLoggedInUserData: {
    url: "/authentication/getLoggedInUserData"
  },
  logout: {
    url: "/authentication/logout"
  },
  userProfilePicture: {
    url: "/authentication/user_profiel_picture"

  },
  createPost: {
    url: "/services/createPost"
  },
  getPosts: {
    url: "/services/get-Post"
  },
  //  searchPotentialConnetion:{
  //   url:"/services/search_potential_connetion"
  //  },
  searchPotentialConnetion: (username) => ({
    url: `/services/search_potential_connetion?username=${username}`
  }),

  getPendingFriendRequest: {
    url: "/services/get_received_friendRequests"
  },
  getAllUsers: {
    url: "/services/all_users"
  },
  sendFriendRequest: {
    url: "/services/receieve_friend_requests"
  },
  uploadDP: {
    url: "/authentication/updateUserInfo"
  },
  get_notification_count: {
    url: "/services/get_notification_count"
  },
  action_friend_request: {
    url: "/services/accept_reject_friend_request"
  },
  createComments: {
    url: "/services/Comments/create_comment"
  },
  getPostComments:{
    url: "/services/Comments/get_comments"
  },
  getSubscription:{
    url: "/services/Subscription/get_subscription"
  },
  getLoggedInUserFriends:{
    url: "/services/get_logged_in_user_friends"
  },
  getUserSpecificPosts:{
    url:'/services/get_user_specific_posts'
  },
  sendOtp:{
    url:"/authentication/forgotpassword"
  },
  verifyOtp:{
    url:"/authentication/verifyOtp"
  },
  resetPassword:{
    url:"/authentication/resetpassword"
  },
  likePost:{
    url:"/services/like_post"
  },
  getSpecifiedUser: (id) => ({
    url: `/authentication/get_specificUserData?username=${id}`
  }),
  create_text_story:{
    url:"/services/Story/create_text_storyv2"
  },
  get_text_stories:{
    url:"/services/Story/get_text_stories"
  },
  view_marked_text_stories:{
    url:"/services/Story/mark_story_viewed"
  },
  createChat:{
    url:"/services/chat/createchat"
  },
  sendMessages:{
    url:"/services/message/createmessages"
  },
  getChat: (firstId, secondId) => ({
    url: `/services/chat/findchat/${firstId}/${secondId}`
  }),
  getMessages: (chatId) => ({
    url: `/services/message/getmessage/${chatId}`
  }),
}




