import React from "react";
import styled from "styled-components";
import LeftSide from "./LeftSide";

import MainSide from "./MainSide";
import RightSide from "./RightSide";

export default function Home({ postCollection, posts }) {
  // export default function Home() {

  return (
    // <>Hello</>
    <Container>
      <Section>
        <h5>
          <a> Hiring in a hurry?</a>
        </h5>
        <p>
          Find talented pros in a record time eith Upwork and keep bussiness
          moving.
        </p>
      </Section>
      <Layout>
        <LeftSide/>
        <MainSide postCollection={postCollection} posts={posts}/>
        <RightSide/>

      </Layout>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const Section = styled.div`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  align-items: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 2fr) minmax(300px, 1.3fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 25px 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
