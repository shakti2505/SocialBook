import React, { useContext, useState, useEffect } from "react";
import UserDataContext from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const AddStories = () => {
  const { loggedInUser } = useContext(UserDataContext);
  const [istextStory, setIstextStory] = useState(false);
  const [storytext, setstoryText] = useState("");
  const [storyBgColor, setStoryBgColor] = useState("bg-blue-700");
  const [storyFont, setStroyFont] = useState("");
  const navigate = useNavigate();

  const handleFontChange = (e) => {
    setStroyFont(e.target.value);
  };

  return (
    <>
      <div className="row ">
        <div className="col-3  max-sm:hidden ">
          <div className="flex justify-between items-center mt-2 ml-2">
            {/* <div>
              <button
                onClick={() => navigate("/home")}
                className="rounded-full  bg-gray-200 hover:bg-gray-300 items-center flex justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25"
                  height="25"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>
            </div> */}
            <h5> Your story</h5>
            <button className="rounded-full  bg-gray-200 hover:bg-gray-300 items-center flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="25"
                height="25"
              >
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
              </svg>
            </button>
          </div>
          <div className="flex justify-start items-center ml-2 mt-4">
            <img
              src={loggedInUser.profilePic}
              alt="images"
              className=" object-cover rounded-full h-12 w-12"
            />
            <p className="text-xl ml-2">
              {loggedInUser.firstName + " " + loggedInUser.LastName}{" "}
            </p>
          </div>
          <div className={istextStory ? "mt-4 ml-2" : "hidden"}>
            <Form.Control
              as="textarea"
              placeholder="Start typing here..."
              className={`ring-1 ${storyFont}`}
              onChange={(e) => setstoryText(e.target.value)}
            />
            <Form.Select
              aria-label="Default select example"
              className="mt-3 ring-1"
              onChange={handleFontChange} // Call handleFontChange when the select value changes
              value={storyFont} // Optional: If you want to set a default selected value based on storyFont state
            >
              <option disabled>Select font</option>
              <option value="">
                <b>Aa</b> Simple
              </option>
              <option value="font-serif">
                <b>Aa</b> Casual
              </option>
              <option value="font-mono">
                <b>Aa</b> Fancy
              </option>
              <option value="font-bold">
                <b>Aa</b> Headline
              </option>
            </Form.Select>
          </div>
          <div className="ring-2 ml-2 mt-3 rounded-sm flex flex-col justify-center">
            <b className="ml-6 mt-2">Backgrounds</b>
            <div className="flex items-center justify-around p-2">
              <button
                onClick={() => setStoryBgColor("bg-blue-700")}
                className="rounded-full bg-blue-700 h-8 w-8 shadow-md  focus:ring"
              ></button>
              <button
                onClick={() => setStoryBgColor("bg-orange-700")}
                className="rounded-full bg-orange-700 h-8 w-8 shadow-md  focus:ring "
              ></button>
              <button
                onClick={() => setStoryBgColor("bg-green-700")}
                className="rounded-full bg-green-700 h-8 w-8 shadow-md  focus:ring"
              ></button>
              <button
                onClick={() => setStoryBgColor("bg-cyan-700")}
                className="rounded-full bg-cyan-700 h-8 w-8 shadow-md  focus:ring"
              ></button>
              <button
                onClick={() => setStoryBgColor("bg-pink-700")}
                className="rounded-full bg-pink-700 h-8 w-8 shadow-md   focus:ring "
              ></button>
              <button
                onClick={() => setStoryBgColor("bg-yellow-700")}
                className="rounded-full bg-yellow-700 h-8 w-8 shadow-md  focus:ring"
              ></button>
            </div>
            <div className="flex items-center justify-around p-2">
              <button
                onClick={() => setStoryBgColor("bg-amber-500")}
                className="rounded-full bg-amber-500 h-8 w-8 shadow-md  focus:ring"
              ></button>
              <button
                onClick={() => setStoryBgColor("bg-rose-500	")}
                className="rounded-full bg-rose-500	 h-8 w-8 shadow-md  focus:ring "
              ></button>
              <button
                onClick={() => setStoryBgColor("bg-lime-500")}
                className="rounded-full bg-lime-500	 h-8 w-8 shadow-md  focus:ring"
              ></button>
              <button
                onClick={() => setStoryBgColor("bg-violet-800")}
                className="rounded-full bg-violet-800	 h-8 w-8 shadow-md  focus:ring"
              ></button>
              <button
                onClick={() => setStoryBgColor("bg-sky-900")}
                className="rounded-full bg-sky-900	 h-8 w-8 shadow-md   focus:ring "
              ></button>
              <button
                onClick={() => setStoryBgColor("bg-teal-400")}
                className="rounded-full bg-teal-400	 h-8 w-8 shadow-md  focus:ring"
              ></button>
            </div>
            <div></div>
          </div>
        </div>
        <div className="col-9 flex justify-center items-center">
          <div
            className={
              istextStory
                ? "hidden"
                : "flex flex-wrap w-full justify-evenly mt-24 justify"
            }
          >
            <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[25rem] w-[20rem] rounded-xl flex flex-col justify-center items-center shadow-2xl active:ring-4 hover:ring-2">
              <div className="rounded-full h-32 w-32 bg-white flex justify-center items-center ring-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width=""
                  height="50"
                  className="text-white"
                >
                  <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                </svg>
              </div>
              <h3 className="text-white mt-4 text-center">
                Create a photo story
              </h3>
            </button>

            <button
              className="max-sm:hidden bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-[25rem] w-[20rem] rounded-xl flex flex-col justify-center items-center shadow-2xl active:ring-4 hover:ring-2"
              onClick={() => setIstextStory(!istextStory)}
            >
              <div className="rounded-full h-32 w-32 bg-white flex justify-center items-center ring-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="80"
                  height="80"
                >
                  <path d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z" />
                </svg>
              </div>

              <h3 className="text-white mt-4 text-center">
                Create a text story
              </h3>
            </button>
          </div>
          <div
            className={
              istextStory
                ? "shadow-xl rounded-md ring-slate-300 mt-4 "
                : "hidden"
            }
          >
            <h5 className="p-2">Preview</h5>
            <div
              className={`h-[45rem] w-96 ${storyBgColor} m-2 rounded-md overflow-auto`}
            >
              <p
                className={`text-gray-300 break-words whitespace-pre-wrap p-4 text-center ${storyFont}`}
              >
                {storytext.length !== 0 ? storytext : "Start typing..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStories;
