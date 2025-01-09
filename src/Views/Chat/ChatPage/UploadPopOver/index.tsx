import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Upload() {
  return (
    <div className="flex justify-center">
      <Popover __demoMode>
        <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
          <div className="bg-theme-blue rounded-full p-2">
            <Icon icon={"si:add-duotone"} className="w-4 h-4 text-white" />
          </div>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="top start"
          className="divide-y divide-transparent rounded-xl bg-theme-dark-blue text-sm/6 -translate-y-4 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
        >
          <div className="p-3">
            <div className=" rounded-full p-2 flex gap-2 items-center">
              <div className="relative group">
                <input
                  type="file"
                  accept=""
                  //   onChange={handleImageUpload}
                  className="hidden"
                  id="Document-upload"
                />
                <label
                  htmlFor="Document-upload"
                  className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Icon
                    icon={"fluent:document-48-light"}
                    className="w-4 h-6 text-theme-blue"
                  />
                </label>
              </div>
              <div className="text-white">Documents</div>
            </div>
            <div className=" rounded-full p-2 flex gap-2 items-center">
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  //   onChange={handleImageUpload}
                  className="hidden"
                  id="Image-upload"
                />
                <label
                  htmlFor="Image-upload"
                  className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Icon
                    icon={"stash:image-open"}
                    className="w-4 h-4 text-theme-blue"
                  />
                </label>
              </div>
              <div className="text-white">Photos</div>
            </div>
            <div className=" rounded-full p-2 flex gap-2 items-center">
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  //   onChange={handleImageUpload}
                  className="hidden"
                  id="Video-upload"
                />
                <label
                  htmlFor="Video-upload"
                  className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Icon
                    icon={"icon-park-outline:video-two"}
                    className="w-4 h-4 text-theme-blue"
                  />
                </label>
              </div>
              <div className="text-white">Videos</div>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
