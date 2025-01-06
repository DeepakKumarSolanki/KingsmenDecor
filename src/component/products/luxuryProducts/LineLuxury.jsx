import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUpForm from "../../PopUpForm/PopUpForm";

const LineLuxury = () => {
  const NavigateToFirstPage = useNavigate();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handlePopUpToggle = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };
  return (
    <section>
      <article className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* Left Content (Main Section) */}
        <div className="lg:col-span-5">
          <div className="mb-10 border hover:border-neutral-500 p-10">
            <img
            loading="lazy"
              src="/src/assets/nowOne.jpg"
              alt="Post Thumbnail"
              className="w-full h-[25rem] rounded-md"
            />
            <div className="mt-5">
              <div className="flex text-gray-500 text-sm space-x-3 flex-col gap-1  relative">
                <span className="uppercase bg-black hover:bg-gray-200 px-2 py-1 rounded text-white hover:text-black w-20 absolute -top-12">
                  Interior
                </span>
              </div>
              <h2 className="flex items-start text-xl">
                Spa-Inspired Bathrooms: Designer Fixtures and Premium Finishes.
              </h2>
              <div className="flex flex-row">
                <div className="border h-7 w-7 p-6 flex items-center justify-center">
                  <h3 className="text-3xl font-semibold">A</h3>
                </div>
                <p className="text-gray-600 mt-2">
                  spa-inspired bathroom is more than merely an aesthetic appeal;
                  it's an immersive, sensory experience where an ordinary
                  bathroom can transform into a personal sanctuary. Materials
                  are key in reaching this indulgent atmosphere, such as
                  high-quality designer fixtures. A design centered on elements
                  such as rainfall showerheads, freestanding tubs, or sleek,
                  modern faucets makes the design go from just good-looking to
                  extraordinary. These fixtures make the bathroom not only
                  visually beautiful but also functionally and invigoratingly
                  transform everyday routines into a source of relaxation.
                </p>
              </div>
              <p className="flex items-start text-justify">
                For an excellent spa-like atmosphere, the best finishes will
                always come in handy. Italian marble, natural stone, or
                high-gloss ceramics for tiles are great in appearance but also
                strong and not messy. These materials add a luxurious feel, from
                the veining in marble to the smooth surface of polished
                ceramics, to the overall richness of the bathroom. In addition,
                luxurious grout in coordinating shades makes cleaning easy and
                adds to the overall aesthetic quality of the bathroom. Lighting
                is one of the primary elements that set the mood in a
                spa-inspired bathroom. Soft, ambient lighting is the most
                important aspect in creating a relaxing ambiance. Sconces with
                dimmable features, recessed lighting, or ceiling-mounted LED
                panels can create a soft, even glow that closely resembles
                natural light and contributes to relaxation. Warm, soft lighting
                can be used to highlight the beauty of the bathroom, such as a
                great bathtub or mosaic, and transform it into a serene retreat.
                The design requires yet another important aspect concerning a
                storage solution in the context of spa-inspired bathroom
                interior designing-high-end, built-in shelving and mirrored
                cabinets serve functions with style, drawing every clink of
                everyday stuff, resulting in a more serene organized area and
                environment. Often this storage wise has soft-close mechanism
                alongside these stylish handles for comfort touch use. Towels to
                toiletries, and any products from beauty, each goes back at its
                place in time which reduces every untidy mess encouraging every
                owner to relax in peaceful consideration.
              </p>
              <div className="flex  lg:flex-row  items-center justify-center flex-col pt-4 gap-3 font-semibold">
                <button
                  onClick={handlePopUpToggle}
                  className="border-[#104438] border rounded-lg py-2 px-6 hover:bg-[#104438]/30 text-[#104438]"
                >
                  Book Free Consultation
                </button>
                {/* <button
                  onClick={() => NavigateToFirstPage("/homeinterior/bhk")}
                  className="bg-[#104438] lg:px-8 px-16 py-2  text-white rounded-lg"
                >
                  Get Started
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
            {/* Profile Section */}
           <img src="/src/assets/Cards/kingsmenSpecial.jpg" loading="lazy" alt="" />
          </div>
      
      </article>
      {isPopUpOpen && <PopUpForm value={isPopUpOpen} />}
    </section>
  );
};

export default LineLuxury;
