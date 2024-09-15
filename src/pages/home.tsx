import HomeImage from "../assets/home-img.png";
export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "rgb(138, 84, 174)",
        backgroundImage:
          "url(https://cdn-static.talent.com/img/home-page/img-bg-3.png)",
        backgroundSize: "1000px",
      }}
      className="py-16 flex flex-col gap-10 text-center justify-center items-center bg-no-repeat bg-left-top"
    >
      <h1 className="text-5xl font-bold text-white">
        Your <span style={{ color: "#E6CCE9" }}>job search</span> starts here.
      </h1>
      <h3 className="text-2xl font-medium text-white">
        Search from over 40 million jobs, save the ones you love,
        <br />
        and apply in seconds.
      </h3>
      <img className="w-[90%] mt-10" src={HomeImage} alt="img-home" />
    </div>
  );
}
