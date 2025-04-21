import Image from "next/image";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mainPage   h-screen  w-full  flex flex-col items-center ">
    <div className="min-h-fit w-full bg-black">
         
      <div className="section1 relative z-20  flex flex-col justify-center gap-4 items-center w-full h-[60vh]  text-white ">
        <div className="homeTitle w-full text-5xl font-bold flex items-center justify-center gap-4">
        <span className="animate-fadeIn">Get Me a Chai</span>
          <span>
            <Image
              className="animate-fadeInReverse"
              src="/appLogo.gif" unoptimized
              width={60}
              height={60}
              alt="no"
            />
          </span>
        </div>
        <p className="homeDescription text-[1.1rem]">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start now!{" "}
        </p>
        <div className="buttons flex">
        
        <Link href={"/login"}>
          <button className="relative shadow-2xl shadow-teal-300  inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
             Start Here
            </span>
          </button>
          </Link>
          <Link href={"/about"}>
          <button className="relative shadow-2xl shadow-teal-300  inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Read More..
            </span>
          </button>
          </Link>
           
        </div>
        <div className="line my-4 relative z-20 w-[90vw] h-[1px] bg-gray-300 opacity-50 text-white"></div>
      </div>
      
      <div className="section2 relative z-20 py-8 flex flex-col items-center w-full">
      <h2 className="text-2xl text-white font-semibold">Your Fans Can buy You a Chai</h2>
          
      <div className="text-white flex justify-around w-full">
      <div className="item ">
            <Image className="w-[10rem]" src="/man.gif" unoptimized width={2} height={2} alt="" />
            <h2 className="font-semibold text-xl">Fund Yourself</h2>
            <p>Your Fans are available to Help You!</p>
            

          </div>
          <div className="item ">
            <Image className="w-[10rem]" src="/coin.gif" unoptimized  width={2} height={2} alt="" />
            <h2 className="font-semibold text-xl">Fund Yourself</h2>
            <p>Your Fans are available to Help You!</p>
          </div>
          <div className="item ">
            <Image className="w-[10rem]" src="/group.gif" unoptimized  width={2} height={2}  alt="" />
            <h2 className="font-semibold text-xl">Fund Yourself</h2>
            <p>Your Fans are available to Help You!</p>
          </div>
      </div>
      <div className="line my-4 relative z-20 w-[90vw] h-[1px] bg-gray-300 opacity-50 text-white"></div>

    </div>

      <div className="section2 relative z-20 py-8 flex flex-col items-center w-full">
      <h2 className="text-2xl text-white font-semibold">Your Fans Can buy You a Chai</h2>
          
      <div className="text-white flex justify-around w-full">
      <div className="item ">
            <Image className="w-[10rem]" src="/man.gif" unoptimized width={2} height={2} alt="" />
            <h2 className="font-semibold text-xl">Fund Yourself</h2>
            <p>Your Fans are available to Help You!</p>
            

          </div>
          <div className="item ">
            <Image className="w-[10rem]" src="/coin.gif" unoptimized  width={2} height={2} alt="" />
            <h2 className="font-semibold text-xl">Fund Yourself</h2>
            <p>Your Fans are available to Help You!</p>
          </div>
          <div className="item ">
            <Image className="w-[10rem]" src="/group.gif" unoptimized  width={2} height={2}  alt="" />
            <h2 className="font-semibold text-xl">Fund Yourself</h2>
            <p>Your Fans are available to Help You!</p>
          </div>
      </div>
    </div>
    <Footer />
    </div>

    </div>
  );
}
