import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import ReactPlayer from "react-player";

export default function MainSide({ postCollection, posts }) {
  const [showModal, setShowModal] = useState("close");
  const [imageList, setImageList] = useState([]);
  const imgListRef = ref(storage, "images/");
  var i = 0;
  var v = 0;

  const handleClick = (e) => {
    // e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  useEffect(() => {
    listAll(imgListRef).then((response) => {
      response.items.map((item, index) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
// console.log(posts[1].image)
// console.log(imageList[0])

  return (
    <Container>
      <Sharebox>
        <div>
          <img
            src={JSON.parse(window.localStorage.getItem("user")).photoURL}
            alt=""
          />
          <button onClick={handleClick}>Start a post</button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" alt="" />
            <span>Write article</span>
          </button>
        </div>
      </Sharebox>

      <div>
        {
          posts.map((posts, index) => {
            return (
              <div>
                <Article>
                  <SharedActor>
                    <a>
                      <img src="/images/user.svg" alt="" />
                      <div>
                        <span>Title</span>
                        <span>Info</span>
                        <span>Date</span>
                      </div>
                    </a>
                    <button>
                      <img src="/images/ellipsis.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description index={posts.id}>{posts.Description}</Description>
                  <SharedImg>
                    <a>
                      {posts.image ? (
                        // posts.image &&
                        <img src={imageList[i++]} alt="" />
                      ) : (
                        <ReactPlayer width={"100%"} url={posts.video} />
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img
                          src="https://www.clipartmax.com/png/full/298-2983576_why-you-need-positive-reviews-on-facebook-g-linkedin-thumb-up-in.png"
                          alt=""
                        />
                      </button>
                      <button>
                        <img
                          src="https://www.userflow.nl/images/Linkedin-Celebrate-Icon-ClappingHands500.png"
                          alt=""
                        />
                      </button>
                    </li>
                    <li>
                      <a>2 comments</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src="/images/like-icon.svg" alt="" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comment-icon.svg" alt="" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src="/images/share-icon.svg" alt="" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src="/images/send-icon.svg" alt="" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              </div>
            );
          })
          // {localStorage.removeItem("video")}
        }

        <PostModal
          showModal={showModal}
          handleClick={handleClick}
          postCollection={postCollection}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  grid-area: main;
`;

const CommomCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 1px rgb(0 0 0 /20%);
`;

const Sharebox = styled(CommomCard)`
  display: flex;
  flex-direction: column;
  color: #958b75;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;

      img {
        width: 30px;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommomCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.div`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      /* display: flex; */
      padding: 0 2px;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 5px;
    color: #0a66c2;

    img {
      width: 20px;
      height: 20px;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
