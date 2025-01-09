import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Playstore from "../../../assets/Playstore.png";
import Appstore from "../../../assets/Appstore.png";
import { Icon } from "@iconify/react/dist/iconify.js";

interface WaitlistProp {
  button: string;
}

export default function WaitList(prop: WaitlistProp) {
  const [isOpen, setIsOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Button onClick={open}>{prop.button}</Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-40 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-40 w-full max-w-7xl bg-[#ffffffEA] mx-auto flex flex-col justify-center items-center px-4 py-8 overflow-y-auto">
          <div className="w-full flex justify-center pt-16">
            {joined ? (
              <DialogPanel
                transition
                className="w-full max-w-md rounded-3xl bg-theme-blue dark:bg-theme-dark-blue py-9 px-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <div className="flex flex-col items-center space-y-8 text-center">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-bold text-white dark:text-theme-blue w-full"
                  >
                    You have successfully joined our waitlist
                  </DialogTitle>
                  <div className="bg-theme-dark-blue text-white dark:bg-theme-blue dark:text-theme-dark-blue rounded-full p-4">
                    <Icon
                      icon="qlementine-icons:check-tick-16"
                      className="text-6xl md:text-8xl font-extrabold"
                    />
                  </div>
                </div>
              </DialogPanel>
            ) : (
              <DialogPanel
                transition
                className="w-full max-w-md rounded-3xl bg-theme-blue dark:bg-theme-dark-blue p-6 md:p-9 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <div className="space-y-6">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-white"
                  >
                    Email Address
                  </DialogTitle>
                  <input
                    type="email"
                    placeholder="Enter your email address to join the waitlist"
                    className="rounded-2xl w-full px-3 py-3 text-sm md:text-base"
                  />
                  <div className="text-center">
                    <Button
                      onClick={() => setJoined(true)}
                      className="w-full py-3 px-5 text-lg text-white rounded-lg bg-theme-dark-blue dark:bg-theme-blue data-[hover]:bg-black/30 shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    >
                      JOIN THE WAITLIST
                    </Button>
                  </div>
                </div>
              </DialogPanel>
            )}
          </div>

          <div className="mt-8 w-full flex flex-col items-center">
            <Button className="py-3 px-5 text-lg text-white rounded-lg bg-theme-blue dark:bg-theme-dark-blue mb-4 data-[hover]:bg-black/30 shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700">
              COMING SOON TO
            </Button>

            <div className="flex gap-4 items-baseline justify-center">
              <img
                src={Playstore}
                alt="PlayStore"
                className="w-28 object-contain"
              />
              <img
                src={Appstore}
                alt="AppStore"
                className="w-28 object-contain"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
