import React from "react";
import "./Sekeloton.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const PostModalSekeloton = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={150}
                height={210}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={150}
                height={210}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={150}
                height={210}
              />
            </div>

            <div
              style={{ border: "2px solid #ECEDEE", borderRadius: "5px" }}
              className="mt-2"
            >
              <div className="d-flex align-items-center justify-content-between mt-2">
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={45}
                  height={45}
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={500}
                  height={40}
                />
              </div>
              {/* <Skeleton
              animation="wave"
                className="mt-2"
                variant="rounded"
                width={500}
                height={1}
              /> */}
              <div className="d-flex justify-content-between align-items-center mt-2">
                <Skeleton
                  animation="wave"
                  className="mx-2 mb-2"
                  variant="rounded"
                  width={500}
                  height={40}
                />
                <Skeleton
                  animation="wave"
                  className="mx-2 mb-2"
                  variant="rounded"
                  width={500}
                  height={40}
                />
                <Skeleton
                  animation="wave"
                  className="mx-2 mb-2"
                  variant="rounded"
                  width={500}
                  height={40}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="d-flex align-items-center">
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={45}
                  height={45}
                />
                <div className=" mx-2">
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={150}
                    height={10}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={200}
                    height={10}
                    className="mt-1"
                  />
                </div>
              </div>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={500}
                height={10}
                className="mt-1"
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                width={500}
                height={210}
                className="mt-1"
              />
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
};

export default PostModalSekeloton;
