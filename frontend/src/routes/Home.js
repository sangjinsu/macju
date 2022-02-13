import BestBeer from "components/Main/BestBeer";
import BestPost from "components/Main/BestPost";
import RecommendBeer from "components/Main/RecommendBeer";






function Home() {
  return (
    <>
      <BestBeer />
      <RecommendBeer/>
      <BestPost />
    </>
  )
}

export default Home;