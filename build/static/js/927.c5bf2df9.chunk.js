"use strict";(self.webpackChunksocialbook=self.webpackChunksocialbook||[]).push([[927],{1927:(e,s,t)=>{t.r(s),t.d(s,{default:()=>p});var l=t(5043),c=t(1030),a=t(7154),i=t(1197),r=(t(6330),t(1638)),n=t(579);var d=t(8320),o=t(7403),m=t(4282),h=t(5475),x=t(3047);const g=()=>{const e=JSON.parse(localStorage.getItem("User")),{onlineUsers:s,loggedInUserfriend:t,notificaiton:a,updateMessage:i,message:r,CreateNewChat:g,sendMessage:w,existingMessages:u,chatWindowData:f,setChatWindowData:j,updateChatWindowData:v,getMessages:p,lastMessages:b,searchPotentialConnetion:N,SerchedUsers:C,updateSearchUser:F,searchUser:y,updateSearchedUser:z,updateLoggedInUserFriend:M,updateSearchUserforPotentialChats:S,potentialChat:V,updatePotentialChats:_,searchUserforPotentialChats:k}=(0,l.useContext)(d.U),H=(0,l.useRef)(),[B,L]=((0,o.t)(a),null===a||void 0===a||a.map((e=>{const s=t.find((s=>s.friend_ID===e.senderId));return{...e,sendername:null===s||void 0===s?void 0:s.friendName}})),(0,l.useState)(!1)),[A,I]=(0,l.useState)(!1),[U,D]=(0,l.useState)([]),[P,O]=(0,l.useState)(!1),[E,W]=(0,l.useState)("w-0"),R=s=>{p(s.friend_ID),L(!0),g(e._id,s.friend_ID)},J=u.sort(((e,s)=>new Date(e.timestamp)-new Date(s.timestamp))),T=(J[J.length-1],document.getElementById("messageField"));return T&&T.focus(),(0,l.useEffect)((()=>{var e;null===(e=H.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})}),[u]),(0,l.useEffect)((()=>{const e=setTimeout((()=>{N(c.W.searchPotentialConnetion(y))}),500);return()=>clearTimeout(e)}),[y]),(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"col-4 sticky h-[100vh] p-4 top-0 hidden sm:hidden md:hidden lg:block xl:block  2xl:block",children:[(0,n.jsxs)("div",{className:"flex justify-between items-center",children:[(0,n.jsx)("h5",{className:"xs:hidden max-lg:hidden ",children:"Contacts"}),(0,n.jsxs)("div",{className:"flex justify-between items-center",children:[(0,n.jsx)("button",{onClick:()=>{O(!1),S(""),_([])},className:P?"bg-[#E2E8F0] outline-none rounded-tl-lg p-[0.290rem]":"hidden",children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",width:"25",height:"25",children:(0,n.jsx)("path",{d:"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"})})}),(0,n.jsx)("input",{onChange:e=>S(e.target.value),type:"text",value:k,placeholder:"Search friends here",className:P?"mr-10 rounded-tr-lg ".concat(E," transition-width duration-500 ease-in-out bg-slate-200 p-2 outline-none"):"w-0"}),(0,n.jsx)("svg",{onClick:()=>{O(!P),W("w-full")},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:"20",height:"20",className:P?"hidden":"mr-10 hover:cursor-pointer",children:(0,n.jsx)("path",{d:"M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"})}),(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",width:"20",height:"20",children:(0,n.jsx)("path",{d:"M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"})})]}),(0,n.jsx)("div",{className:"absolute bottom-10 left-[30rem]",children:0!==U.length&&U.map(((e,s)=>(0,n.jsx)("img",{src:e.friend_dp,className:"object-cover w-16 h-16 rounded-full shadow-2xl m-2 hover:cursor-pointer",onClick:()=>(e=>{L(!0),I(!1);const s=U.indexOf(e);U.splice(s,1),U.some((e=>e._id===f._id))||D([...U,f]),v(e)})(e)},s+5)))})]}),(0,n.jsx)("div",{className:"flex items-center justify-end",children:(0,n.jsx)("div",{className:" flex-col lg:w-[13.9rem] xl:w-[16.1rem] flex items-center justify-center bg-[#E2E8F0] xl:mr-[3.6rem] md:mr-[3.6rem] sm:mr-[3.6rem]",children:V.map(((e,s)=>(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"flex items-start p-2",id:s+1,children:[(0,n.jsx)("img",{src:e.friend_dp,className:"rounded-full h-10 w-10 object-cover "}),(0,n.jsxs)("div",{className:"d-flex flex-column ml-2 items-start",children:[(0,n.jsx)(h.N_,{to:"/profile/".concat(e._id),children:(0,n.jsx)("strong",{className:" text-sm ml-1",children:e.friendName})}),(0,n.jsx)("div",{className:"flex flex-row",children:(0,n.jsx)(m.A,{size:"sm",variant:"primary",onClick:()=>R(e),className:"mt-1 ml-1",children:"Send Message"})})]})]})})))})}),0!==t.length&&t.map(((e,t)=>(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"flex items-center justify-between active:bg-gray-300 rounded-r-xl bg bg-[#F0F2F5] mt-3 p-2 hover:cursor-pointer ",children:[(0,n.jsxs)("div",{onClick:()=>{R(e),v(e)},className:"flex items-center  relative  active:bg-gray-300 px-2 py-2 rounded-l-lg",children:[(0,n.jsx)("img",{src:e.friend_dp,className:"object-cover rounded-full h-12 w-12"}),(0,n.jsx)("span",{className:null!==s&&void 0!==s&&s.some((s=>s.userId===e.friend_ID))?"before:absolute before:flex before:top-0.5 before:left-1 before:shadow-2xl before:bg-[#34C300] before:rounded-full before:h-4 before:w-4":""}),(0,n.jsxs)("div",{className:"flex flex-col justify-start items-center",children:[(0,n.jsx)("strong",{className:"ml-2",children:e.friendName}),(0,n.jsx)("small",{className:"text-left ml-2 text-muted",children:e.text})]})]},t+5),(0,n.jsx)("small",{children:(0,x._k)(e.createdAt)})]})}))),B&&(0,n.jsxs)("div",{id:"chat window",className:B?"absolute bottom-0 left-0 border-1 w-75 border-grey overflow-hidden rounded-md transition-all h-1/2 shadow-lg rea":"hidden",children:[(0,n.jsxs)("div",{className:"flex justify-between items-center shadow-sm  p-2",children:[(0,n.jsxs)("button",{className:"flex",children:[(0,n.jsx)("img",{src:f.friend_dp,className:"  object-cover w-12 h-12 rounded-full"}),(0,n.jsxs)("div",{className:"flex flex-column ml-2",children:[(0,n.jsx)("span",{children:f.friendName}),(0,n.jsx)("small",{className:"text-muted",children:"Active now"})]})]}),(0,n.jsxs)("div",{className:"flex justify-between items-center gap-3",children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:"20",height:"20",children:(0,n.jsx)("path",{fill:"#0866FF",d:"M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"})}),(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512",width:"20",height:"20",children:(0,n.jsx)("path",{fill:"#0866FF",d:"M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"})}),(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",width:"20",height:"20",onClick:()=>(e=>(U.some((s=>s._id===e._id))||(D([...U,e]),L(!1)),U))(f),className:"hover:cursor-pointer",children:(0,n.jsx)("path",{fill:"#0866FF",d:"M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"})}),(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512",width:"20",height:"20",onClick:()=>(e=>{L(!1);const s=U.indexOf(e);U.splice(s,1),v([])})(f),className:"hover:cursor-pointer",children:(0,n.jsx)("path",{fill:"#0866FF",d:"M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"})})]})]}),(0,n.jsxs)("div",{className:" overflow-auto h-[20rem] px-2",children:[(0,n.jsxs)("div",{className:"flex flex-col justify-center items-center p-2",children:[(0,n.jsx)("img",{src:f.friend_dp,className:"object-cover w-16 h-16 rounded-full"}),(0,n.jsx)("strong",{children:f.friendName}),(0,n.jsx)("small",{className:"text-muted",children:"Socialbook"}),(0,n.jsx)("small",{className:"text-muted",children:"You're friends on socialbook"})]}),J.map(((s,t)=>{const l=s.senderId===e._id,c=l?"justify-end":"justify-start",a=l?"bg-[#F0F2F5] flex-row-reverse":"bg-[#F0F2F5]";return(0,n.jsxs)("div",{className:"flex items-center ".concat(c," mt-2 mx-2"),ref:H,children:[!l&&(0,n.jsx)("img",{src:s.senderDp,className:"w-8 h-8 rounded-full object-cover"}),(0,n.jsx)("div",{className:"flex items-center p-2 rounded-2xl ".concat(a),children:(0,n.jsx)("p",{className:"text-muted mx-2 text-center",children:s.text})}),l&&(0,n.jsx)("img",{src:s.senderDp,className:"w-8 h-8 rounded-full object-cover"})]},t)}))]}),(0,n.jsxs)("div",{className:"flex justify-between items-center bottom-0 absolute w-full mb-2",children:[0===r.length&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512",width:"20",height:"20",children:(0,n.jsx)("path",{fill:"#0866FF",d:"M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"})}),(0,n.jsx)("label",{htmlFor:"file",className:"flex flex-col justify-center items-center",children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:"20",height:"20",className:"ml-2",children:(0,n.jsx)("path",{fill:"#0866FF",d:"M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-#.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"})})}),(0,n.jsx)("input",{type:"file",multiple:!0,accept:"image/png, image/jpg, image/jpeg , image/bmp",className:"hidden",id:"file"}),(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:"25",height:"25",className:"ml-2",children:(0,n.jsx)("path",{fill:"#0866FF",d:"M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"})})]}),(0,n.jsx)("textarea",{id:"messageField",rows:"1",value:r,onChange:e=>{i(e.target.value)},type:"text",placeholder:"Aa!",className:"outline-none h-full rounded-xl px-3 bg-gray-200 ml-2 mr-2  ".concat(0===r.length?"w-2/3":"w-full"," transition-width duration-300")}),(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:"25",height:"25",className:0==r.length?"":"d-none",children:(0,n.jsx)("path",{fill:"#0866FF",d:"M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"})}),(0,n.jsx)("svg",{onClick:()=>w(e._id,f.friend_ID),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:"25",height:"25",className:0==r.length?"d-none":" hover:cursor-pointer",children:(0,n.jsx)("path",{fill:"#0866FF",d:"M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"})})]})]})]})})};var w=t(6660),u=(t(2915),t(7407)),f=t(4816),j=(t(6803),t(3216)),v=t(8628);const p=()=>{const[e,s]=(0,l.useState)(!0),[t,d]=(0,l.useState)(!1),[o,m]=(0,l.useState)({}),[h,p]=(0,l.useState)([]),[b,N]=(0,l.useState)(!1),[C,F]=(0,l.useState)(""),{loggedInUser:y,OpenPostModal:z,ClosePostModal:M,modalShow:S}=(0,l.useContext)(r.A),V=JSON.parse(localStorage.getItem("User")),[_,k]=(0,l.useState)([]),H=(0,j.Zp)(),[B,L]=(localStorage.getItem("subscription"),(0,l.useState)(!1)),[A,I]=(0,l.useState)({}),U=h.find((e=>e.user===V._id)),D=async e=>{201!==(await a.A.post(i.A+c.W.view_marked_text_stories.url,{storyId:e},{withCredentials:!0})).status?N(!1):N(!0)};return(0,l.useEffect)((()=>{(async()=>{let e=await a.A.get(i.A+c.W.get_text_stories.url,{withCredentials:!0});200!==e.status?console.log("NO text stories found"):p(e.data.textStories)})()}),[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"d-flex",children:[(0,n.jsx)("div",{className:"col-8 p-4",id:"middleBar",style:{overflowY:"hidden"},children:(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"w-full overflow-x-scroll mt-2",children:(0,n.jsxs)("div",{className:"d-flex gap-3 w-max",children:[(0,n.jsxs)("div",{className:"relative ".concat(0!==h.length&&h[0].bgColor," h-[17rem] rounded-md"),children:[0==h.length&&(0,n.jsx)("img",{src:V.profilePic,alt:"images",className:" object-cover w-40 rounded-t-lg h-[13rem]"}),(0,n.jsx)("div",{className:"w-40 h-12 m-2 rounded-md",children:U&&(0,n.jsx)("img",{src:U.storyURL,alt:"Story Image",className:"object-cover w-40 rounded-t-lg h-52"})}),(0,n.jsx)("button",{onClick:()=>H("/stories/create"),className:"rounded-full ring-offset-2 ring w-8 h-8 absolute left-16 bottom-12 bg-[#1049F4] flex items-center  justify-center",children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",height:"13",width:"13",children:(0,n.jsx)("path",{fill:"#FFFFFF",d:"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"})})}),(0,n.jsx)("p",{className:" absolute bottom-0 left-7 ",children:"Create stroy"})]}),0!==h.length&&h.map(((e,s)=>(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{onClick:()=>(e=>{F(),L(!0);const s=h.filter((s=>s._id===e));I(s[0]),F(s[0].views.length),D(e)})(e._id),className:"relative w-40",children:[(0,n.jsx)("img",{className:"rounded-full absolute top-2 bg-slate-950  w-8 h-8 left-2 shadow-2xl ring ring-blue-500",src:e.storyOwnerdp}),(0,n.jsx)("img",{src:e.storyURL,alt:"images",className:" object-cover w-40 rounded-md h-[17rem]"})]},s)})))]})}),(0,n.jsxs)("div",{className:"card mt-2 shadow-sm",children:[(0,n.jsx)("div",{className:"card-body",children:(0,n.jsxs)("div",{className:"d-flex",children:[(0,n.jsx)("a",{href:"/profile",children:(0,n.jsx)("img",{src:V.profilePic,className:"w-14 h-14 object-cover rounded-full"})}),(0,n.jsx)("button",{onClick:z,className:"searchBtn text-muted btn btn-light mx-2 w-100 d-flex justify-start items-center shadow-md",children:"What's on you mind, ".concat(V.firstName," ?")})]})}),(0,n.jsx)("hr",{}),(0,n.jsxs)("div",{className:"d-flex justify-content-around align-items-center mb-2",children:[(0,n.jsxs)("button",{className:"btn btn-light btn-md d-flex justify-content-between align-items-center shadow-md",children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"2rem",width:"2rem",viewBox:"0 0 576 512",children:(0,n.jsx)("path",{fill:"#F02849",d:"M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"})}),(0,n.jsx)("small",{className:"text-muted mx-2",children:"Live Video"})]}),(0,n.jsxs)("button",{onClick:z,type:"button",className:"btn btn-light btn-md shadow-md d-flex justify-content-between align-items-center",children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"2rem",width:"2rem",viewBox:"0 0 576 512",children:(0,n.jsx)("path",{fill:"#46BD63",d:"M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z"})}),(0,n.jsx)("small",{className:"text-muted mx-2",children:"Photo/Video"})]}),(0,n.jsxs)("button",{type:"button",className:"btn btn-light btn-md d-flex justify-content-between shadow-md  align-items-center",children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"2rem",width:"2rem",viewBox:"0 0 512 512",children:(0,n.jsx)("path",{fill:"#FFD43B",d:"M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"})}),(0,n.jsx)("small",{className:"text-muted mx-2",children:"Feeling/Activity"})]})]})]}),(0,n.jsx)(f.A,{}),(0,n.jsx)(u.A,{})]})}),(0,n.jsx)(g,{})]}),(0,n.jsxs)(w.A,{size:"sm",show:B,onHide:()=>L(!1),"aria-labelledby":"example-modal-sizes-title-sm",centered:!0,className:"relative",children:[V._id===A.user&&(0,n.jsxs)("div",{className:"flex justify-start items-center",children:[(0,n.jsx)("svg",{className:"ml-2",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512",width:"25",height:"25",children:(0,n.jsx)("path",{fill:"#36454F",d:"M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"})}),(0,n.jsx)("small",{className:"text-3xl text-slate-500 ml-2",children:C&&C})]}),(0,n.jsx)("div",{className:" absolute mt-2 ml-2",children:(0,n.jsxs)("div",{className:"d-flex",children:[(0,n.jsx)("a",{href:"/profile",children:(0,n.jsx)("img",{src:A.storyOwnerdp,className:"ml-1 rounded-full h-12 w-12 object-cover "})}),(0,n.jsxs)("div",{className:"d-flex flex-column",children:[(0,n.jsx)("strong",{className:"mx-2 text-white",children:A.storyOwnerName}),(0,n.jsx)("p",{style:{fontSize:"0.8rem"},className:"mx-2 text-white",children:(0,x._k)(A.createdAt)})]})]})}),(0,n.jsx)(v.A.Img,{variant:"top",src:A.storyURL})]})]})}}}]);
//# sourceMappingURL=927.c5bf2df9.chunk.js.map