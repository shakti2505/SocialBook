let BASE_URL_API
if(
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === ""
     
){
    BASE_URL_API = "http://localhost:4600";
}
  
export default BASE_URL_API