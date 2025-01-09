export const FAQs = () => {
  const scrollToTop = () => {
    const section = document.getElementById("home");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="faq" className="container mx-auto px-4 md:px-6 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between gap-6 dark:text-white dark:bg-theme-dark-blue rounded-xl mb-5 p-6 md:p-10 space-y-6 md:space-y-0">
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4 mb-6 md:mb-0">
          <div className="text-xl md:text-2xl font-bold">FAQ about Macy</div>
          <div className="text-base md:text-lg">
            We understand you might have questions about how In2macy works and
            what it can do for you. Below, we've answered some of the most
            common queries to help you get started and make the most out of your
            experience.
          </div>
          <div className="text-base">
            If you don't see your question here, feel free to reach out—we're
            always here to help!
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          {[
            "What is in In2macy and how does it work?",
            "Can in2macy replace traditional therapy?",
            "Is my data safe with In2Macy?",
            "Who can use In2macy?",
          ].map((question, index) => (
            <div key={index} className="space-y-2">
              <div className="font-bold text-base md:text-xl text-center md:text-left">
                {question}
              </div>
              {index < 3 && (
                <hr className="border-t border-gray-300 dark:border-gray-600" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-[#0C66F1] py-3 px-5 text-base md:text-lg text-white rounded-lg dark:text-theme-blue dark:bg-theme-dark-blue hover:bg-opacity-90 transition-colors"
          onClick={scrollToTop}
        >
          BACK TO TOP
        </button>
      </div>
    </section>
  );
};
