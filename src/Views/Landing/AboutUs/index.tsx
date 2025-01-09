import Iphone16 from "../../../assets/iPhone.png";
import Dashboard from "../../../assets/Dashboard.png";
import ChatsDoodle from "../../../assets/ChatsDoodle.png";
import HandHeartDoodle from "../../../assets/HandHeartDoodle.png";
import EnvelopeSimpleOpenDoodle from "../../../assets/EnvelopeSimpleOpenDoodle.png";
import WaitList from "../JoinWaitlistModal";

export const AboutUs = () => {
  return (
    <section className="relative overflow-hidden" id="about">
      <div className="container mx-auto px-4 md:px-6 lg:px-20 justify-items-center relative z-30 space-y-8 lg:space-y-16">
        {/* Device Images */}
        <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
          <img
            src={Dashboard}
            alt="Dashboard"
            className="h-48 md:h-64 lg:h-96 object-contain"
          />
          <img
            src={Iphone16}
            alt="Iphone 16"
            className="h-48 md:h-64 lg:h-96 object-contain"
          />
        </div>

        {/* Description */}
        <div className="w-full lg:w-4/5 mx-auto space-y-4 lg:space-y-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-theme-dark-blue">
            Macy is your safe space for emotional support and mental well-being.
          </h2>
          <h2 className="text-base md:text-lg lg:text-lg">
            It's beyond a chatbot—it's your compassionate listener, empowering
            guide, and trusted companion through life's emotional ups and downs.
          </h2>
        </div>

        {/* Waitlist */}
        <div className="bg-[#0C66F1] py-3 px-5 text-lg text-white rounded-lg dark:bg-theme-dark-blue dark:text-theme-blue focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white">
          <WaitList button="JOIN THE WAITLIST" />
        </div>

        {/* Three Steps Section */}
        <div className="rounded-xl text-white justify-items-center space-y-8 pt-8 px-4 lg:px-5 pb-16 lg:pb-24 dark:bg-theme-dark-blue">
          <div className="text-xl lg:text-2xl w-full lg:w-2/5 font-extrabold text-theme-dark-blue dark:text-white text-center">
            Get the most out of Macy from these three steps
          </div>

          <div className="flex flex-col md:flex-row text-start gap-4 lg:gap-2">
            {[
              {
                step: "Step 1",
                title: "Start the conversation",
                description:
                  "Sign up and tell In2macy what's on your mind. It's simple, quick, and tailored to your needs.",
              },
              {
                step: "Step 2",
                title: "Personalized Guidance",
                description:
                  "Receive actionable advice designed to help you understand and navigate your emotions",
              },
              {
                step: "Step 3",
                title: "Achieve your Goals with Macy",
                description:
                  "Build habits, gain clarity, and take meaningful steps toward the life you want—all at your own pace.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border border-theme-blue rounded-xl pt-8 p-4 md:w-1/3 space-y-4"
              >
                <div className="underline underline-offset-8 text-theme-blue font-bold text-xl">
                  {item.step}
                </div>
                <div className="text-xl font-bold text-theme-blue dark:text-white">
                  {item.title}
                </div>
                <div className="text-base text-theme-black mb-5 dark:text-white">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Difference with Macy */}
        <div className="dark:bg-theme-dark-blue p-6 rounded-xl text-start">
          <div className="text-xl lg:text-2xl font-extrabold mb-6 text-center text-theme-dark-blue dark:text-white">
            The Difference with Macy
          </div>

          <div>
            <div className="space-y-4 lg:space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                {[
                  {
                    title: "Empathy Meets Expertise",
                    description:
                      "Built on a foundation of emotional intelligence and grounded in therapeutic methodologies - Macy is your trusted emotional ally.",
                  },
                  {
                    title: "Custom-Tailored to You",
                    description:
                      "Every interaction is personalized to your unique needs, ensuring advice and insights that truly resonate with your situation.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border border-theme-blue rounded-md p-5 pb-10 md:w-1/2"
                  >
                    <div className="text-xl lg:text-2xl font-bold text-theme-blue mb-4 lg:mb-8">
                      {item.title}
                    </div>
                    <div className="dark:text-white">{item.description}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:flex-row gap-4  text-start">
                {[
                  {
                    title: "Safe and Confidential",
                    description:
                      "Your privacy is our priority. All conversations are secure, anonymous, and free of judgment, so you can speak your heart without fear.",
                  },
                  {
                    title: "Holistic Emotional Support",
                    description:
                      "Through reflective listening, habit-building tools, and guided exercises, Macy equips you to handle life's challenges confidently.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border border-theme-blue rounded-md p-5 pb-10 md:w-1/2"
                  >
                    <div className="text-xl lg:text-2xl font-bold text-theme-blue  mb-4 lg:mb-8">
                      {item.title}
                    </div>
                    <div className="dark:text-white">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doodle Images */}
      <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none max-w-screen-lg container">
        <div className="absolute -top-4 md:-top-8 left-8 md:left-14 transform md:translate-y-1/2">
          <img
            src={ChatsDoodle}
            alt="doodle"
            className="animate-pulse w-12 md:w-16"
          />
        </div>

        <div className="absolute top-1/4 left-20 md:left-40 -translate-x-1/2 translate-y-2/3">
          <img
            src={HandHeartDoodle}
            alt="doodle"
            className="animate-pulse w-16 md:w-20 scale-x-[-1]"
          />
        </div>

        <div className="absolute top-1/2 md:top-72 -right-16 md:-right-28 transform md:translate-y-1/2">
          <img
            src={EnvelopeSimpleOpenDoodle}
            alt="doodle"
            className="animate-pulse w-16 md:w-24"
          />
        </div>
      </div>
    </section>
  );
};
