import HomeImage from "../assets/home-img.png";
export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#691F74",
        backgroundImage:
          "url(https://cdn-static.talent.com/img/home-page/img-bg-3.png)",
        backgroundSize: "1000px",
      }}
      className="pt-16 flex flex-col gap-8 text-center justify-center items-center bg-no-repeat bg-left-top"
    >
      <h1 className="text-5xl font-bold text-white">
        Your <span style={{ color: "#E6CCE9" }}>job search</span> starts here.
      </h1>
      <div className="text-2xl font-normal text-white leading-10">
        <p>
          Search from <span className="font-medium">over 40 million jobs</span>,
          save the ones you love,
        </p>
        <p>and apply in seconds.</p>
      </div>
      <img className="w-[85%] mt-10" src={HomeImage} alt="img-home" />
    </div>
  );
}
