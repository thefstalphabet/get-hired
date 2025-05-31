import { AiFillInstagram } from "react-icons/ai";
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube } from "react-icons/ti";

const footerIconStyles =
  "text-4xl text-white border-[1px] rounded-3xl p-1 cursor-pointer";

export default function Footer() {
  return (
    <div className="py-3 px-32 grid gap-3 bg-[#263238]">
        <div className="grid justify-center gap-2">
          <div className="flex justify-center gap-5 mt-2">
            <TiSocialFacebook className={footerIconStyles} />
            <AiFillInstagram className={footerIconStyles} />
            <TiSocialLinkedin className={footerIconStyles} />
            <TiSocialYoutube className={footerIconStyles} />
            <TiSocialTwitter className={footerIconStyles} />
          </div>
          <p className="text-center text-white text-sm">
            ©Copyright all right reserved.
          </p>
        </div>
      </div>
  )
}
