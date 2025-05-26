
import Section1 from "./home/components/section1";
import Section2 from "./home/components/section2";
import Section3 from "./home/components/section3";
import Section4 from "./home/components/section4";
import NewsPage from "./home/components/news";
// import Section5 from "./home/components/section5";
export default function Home() {
  return (
    <main className=" md:mt-[164px] mt-[80px] min-h-screen overflow-hidden">
      <Section1 />  
      <Section2 />
      <Section3 />
      <NewsPage />
      <Section4 />
      {/* <Section5 /> */}
    </main>
  )
}