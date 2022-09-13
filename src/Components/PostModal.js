import React from "react";
import ReactPlayer from "react-player";

import { useState } from "react";
import styled from "styled-components";
import { addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export default function PostModal(props) {
  const [editorText, seteditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setassetArea] = useState("");
  const imgRef = ref(storage, `images/${shareImage.name}`);

  const createPost = async () => {
    if (shareImage) {
      await addDoc(props.postCollection, {
        Description: editorText,
        image: `${shareImage.name}`,
        video: "",
      });

      uploadBytes(imgRef, shareImage).then(() => {
        alert("Image Uploaded");
        window.location.reload();
      });
      return;
    }
    videoLink &&
      (await addDoc(props.postCollection, {
        Description: editorText,
        image: "",
        video: `${videoLink.toString()}`,
      }));
  };

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setassetArea(area);
  };

  const reset = (e) => {
    seteditorText("");
    setShareImage("");
    setVideoLink("");
    setassetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container
          onClick={(event) => {
            props.handleClick(event);
          }}
        >
          <Content>
            <Header>
              <h2>Create a post</h2>

              <button
                onClick={(event) => {
                  reset(event);
                }}
              >
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                <img
                  src={JSON.parse(window.localStorage.getItem("user")).photoURL}
                  alt=""
                />
                <span>
                  {JSON.parse(window.localStorage.getItem("user")).displayName}
                </span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => {
                    seteditorText(e.target.value);
                  }}
                  placeholder="what you want to talk about?"
                  autoFocus={true}
                />

                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/jfif, image/png"
                      name="image"
                      id="file"
                      style={{ display: "block" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file ">Select an Image</label>{" "}
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} alt="" />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <UploadVedio>
                      <input
                        type="text"
                        placeholder="Pleaseinput a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />

                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </UploadVedio>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <AssetButton
                  onClick={() => {
                    switchAssetArea("image");
                  }}
                >
                  <img src="/images/photo-icon.svg" alt="" />
                </AssetButton>
                <AssetButton
                  onClick={() => {
                    switchAssetArea("media");
                  }}
                >
                  <img src="/images/video-icon.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/article-icon.svg" alt="" />
                  Comments
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => {
                  props.handleClick(event);
                  reset(event);
                  createPost();
                }}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.5s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 5px;
  border-radius: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 12px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(0, 0, 0, 0.09);
  button {
    /* height: 20px; */
    width: 20px;
    min-width: 5px;
    display: flex;
    color: rgba(0, 0, 0, 0.15);
    svg,
    img {
      width: 15px;
      transform: translateX(-5px);
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const AssetButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);

  img {
    width: 30px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  text-align: center;
  min-width: 40px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.6)" : "#0a66c2")};
  color: white;
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.6)" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
const UploadVedio = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
