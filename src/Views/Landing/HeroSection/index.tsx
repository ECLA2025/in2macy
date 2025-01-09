import RoboDoodle from "../../../assets/RoboDoodle.png";
import HandHeartDoodle from "../../../assets/HandHeartDoodle.png";
import ChatDoodle from "../../../assets/chatdoodle.png";
import WaitList from "../JoinWaitlistModal";

export const HeroSection = () => {
  return (
    <section
      className="relative dark:bg-theme-dark-blue overflow-hidden"
      id="home"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 justify-items-center relative z-30 pb-16 pt-24 md:pt-36 lg:pb-28 lg:pt-36 space-y-8">
        {/* Title Container */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-9xl font-extrabold text-theme-dark-blue dark:text-white flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 lg:gap-6">
            <div className="flex items-center justify-center">
              Talk <span className="text-theme-blue ml-2"> freely,</span>
            </div>
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-9xl font-extrabold text-theme-dark-blue dark:text-white flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:pl-40 gap-2 lg:gap-6 mt-2 lg:mt-0">
            <div className="flex items-center justify-center">
              Heal
              <span className="text-theme-blue flex items-center ml-2">
                deeply.
                <span className="text-base lg:text-3xl font-extrabold text-theme-dark-blue dark:text-white ml-1">
                  TM
                </span>
              </span>
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="text-base md:text-lg font-semibold text-center w-full md:w-3/4 lg:w-2/4 mx-auto lg:mb-10 dark:text-white px-4 md:px-0">
          Whether you're struggling with anxiety, loneliness, relationship
          conflicts, or simply seeking clarity, In2macy is here to provide
          comfort and solutions inspired by therapeutic principles.
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="bg-theme-blue py-3 px-6 md:py-4 md:px-7 text-base md:text-lg text-white rounded-xl">
            <WaitList button="CHAT WITH MACY" />
          </button>
        </div>
      </div>

      {/* Doodle Images */}
      <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none max-w-screen-lg container">
        {/* Robo Doodle - Mobile Position Adjusted */}
        <div className="absolute bottom-1/4 left-0 md:bottom-52 md:left-11 transform -translate-y-1/2">
          <img
            src={RoboDoodle}
            alt="doodle"
            className="w-16 md:w-24 motion-safe:animate-pulse"
          />
        </div>

        {/* Hand Heart Doodle - Mobile Position Adjusted */}
        <div className="absolute bottom-1/3 right-0 md:bottom-16 md:right-24 transform md:-translate-x-1/2 md:translate-y-2/3">
          <img
            src={HandHeartDoodle}
            alt="doodle"
            className="w-12 md:w-20 motion-safe:animate-pulse"
          />
        </div>

        {/* Chat Doodle - Mobile Position Adjusted */}
        <div className="absolute top-1/4 -right-20 md:top-10 md:-right-40 transform md:translate-y-1/2">
          <img
            src={ChatDoodle}
            alt="doodle"
            className="w-16 md:w-24 motion-safe:animate-pulse"
          />
        </div>
      </div>
    </section>
  );
};
