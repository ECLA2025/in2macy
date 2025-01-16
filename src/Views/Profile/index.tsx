import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import Macy from "../../assets/logoDark.png";
import Zen1 from "../../assets/zen1.png";
import Zen3 from "../../assets/zen3.png";
import { useProfileUpdate } from "../../hooks/useUpdateProfile";
import { useFetchProfile } from "../../hooks/useFetchProfile";
import { Profile } from "../../types/auth.types";
import { toast } from "react-toastify";

interface FormErrors {
  first_name?: string;
  surname?: string;
  gender?: string;
  age?: string;
  bio?: string;
  profile_picture?: string;
}

const ProfileRegistration = () => {
  const [formData, setFormData] = useState<Profile>({
    first_name: "",
    surname: "",
    gender: "",
    age: "",
    bio: "",
    profile_picture: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const { updateProfile } = useProfileUpdate();
  const { fetchProfile } = useFetchProfile();

  // console.log(profile);

  // const details: Profile = {
  //   first_name: profile.first_name,
  //   surname: profile.surname,
  //   gender: profile.gender,
  //   age: profile.age,
  //   bio: profile.bio,
  // };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const Profile = await fetchProfile();
      console.log(Profile);
      setFormData(Profile!);
      if (Profile) {
        console.log("Fetched Profile:", Profile);
      }
    };
    fetchUserProfile();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name!.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.surname!.trim()) {
      newErrors.surname = "Last name is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    if (!formData.age) {
      newErrors.age = "Please select an age range";
    }

    if (!formData.bio!.trim()) {
      newErrors.bio = "Bio is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const profileData = {
        first_name: formData.first_name!,
        surname: formData.surname!,
        gender: formData.gender!,
        age: formData.age!,
        bio: formData.bio!,
        profile_picture: profileImage,
      };

      const result = await updateProfile(profileData);

      if (result.success) {
        // Handle successful update
        // For example, show a success message or redirect
        toast.success("Profile updated successfully");
      } else {
        // Handle error (optional since the hook already manages error state)
        toast.error("Failed to update profile");
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setProfileImage(reader.result as string);
      // };
      // reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-theme-dark-blue text-white">
      {/* Form Section */}
      <div className="w-1/2 h-full px-4 md:px-8 lg:px-16 py-4">
        <div className="flex justify-center mb-4">
          <img src={Macy} alt="in2Macy" className="w-20 md:w-24" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Profile Image Upload */}
          <div className="">
            <div className="flex justify-center gap-4 items-center mb-2">
              <div className="bg-theme-blue rounded-full p-2">
                <Icon icon={"si:add-duotone"} className="w-4 h-4 text-white" />
              </div>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer"
                >
                  {profileImage ? (
                    <img
                      src={formData.profile_picture}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Icon icon={"stash:image-open"} className="w-8 h-8" />
                  )}
                </label>
                <div className="absolute right-2 bottom-0 bg-theme-dark-blue rounded-full border border-theme-blue p-1">
                  <Icon
                    icon={"heroicons:camera-solid"}
                    className="w-2 h-2 text-theme-blue"
                  />
                </div>
              </div>
              <div className="bg-theme-blue rounded-full p-2">
                <Icon icon={"si:add-duotone"} className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-center text-theme-blue font-bold text-xs">
              Add profile Picture
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-2">
            {/* Name Fields */}
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-theme-blue text-xs text-start mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="Type your first name"
                  className={`w-full bg-theme-dark-blue border text-xs rounded-xl ${
                    errors.first_name ? "border-red-500" : "border-theme-blue"
                  } p-2 focus:outline-none focus:border-theme-blue`}
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.first_name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="surname"
                  className="block text-theme-blue text-xs text-start mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="surname"
                  placeholder="Type your last name"
                  className={`w-full bg-theme-dark-blue border text-xs rounded-xl ${
                    errors.surname ? "border-red-500" : "border-theme-blue"
                  } p-2 focus:outline-none focus:border-theme-blue`}
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                />
                {errors.surname && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.surname}
                  </p>
                )}
              </div>
            </div>

            {/* Gender and Age Range */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <label
                  htmlFor="gender"
                  className="block text-theme-blue text-xs text-start mb-1"
                >
                  Gender
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    className={`w-full bg-theme-dark-blue border text-xs rounded-xl appearance-none ${
                      errors.gender ? "border-red-500" : "border-theme-blue"
                    } p-2 focus:outline-none focus:border-theme-blue pr-8`}
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  >
                    <option value="">Select your Gender</option>
                    <option value={"M"}>Male</option>
                    <option value="F">Female</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="bg-theme-blue rounded-md p-1">
                      <Icon
                        icon="heroicons:chevron-down"
                        className="w-2.5 h-2.5 text-theme-dark-blue"
                      />
                    </div>
                  </div>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.gender}</p>
                )}
              </div>

              <div className="relative">
                <label
                  htmlFor="age"
                  className="block text-theme-blue text-xs text-start mb-1"
                >
                  Age Range
                </label>
                <div className="relative">
                  <select
                    id="age"
                    className={`w-full bg-theme-dark-blue border text-xs rounded-xl appearance-none ${
                      errors.age ? "border-red-500" : "border-theme-blue"
                    } p-2 focus:outline-none focus:border-theme-blue pr-8`}
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  >
                    <option value="">Select your Range</option>
                    <option value="24">18-24</option>
                    <option value="34">25-34</option>
                    <option value="44">35-44</option>
                    <option value="54">45-54</option>
                    <option value="64">55-64</option>
                    <option value="64">64+</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="bg-theme-blue rounded-md p-1">
                      <Icon
                        icon="heroicons:chevron-down"
                        className="w-2.5 h-2.5 text-theme-dark-blue"
                      />
                    </div>
                  </div>
                </div>
                {errors.age && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.age}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-theme-blue text-xs text-start mb-1"
              >
                Bio
              </label>
              <textarea
                id="bio"
                placeholder="Describe yourself in a fun way..."
                className={`w-full bg-theme-dark-blue border text-xs rounded-xl ${
                  errors.bio ? "border-red-500" : "border-theme-blue"
                } p-2 focus:outline-none focus:border-theme-blue h-24 resize-none`}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
              {errors.bio && (
                <p className="text-red-500 text-xs mt-0.5">{errors.bio}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-xl py-2.5 font-semibold hover:bg-blue-700 transition-colors text-xs"
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="w-1/2 h-full">
        <div className="bg-[#ffffff1A] text-left px-4 md:px-6 py-2.5">
          <h2 className="text-xl font-extrabold text-white">Profile</h2>
        </div>

        <div className="px-4 md:px-8 lg:px-16 py-8 space-y-5">
          <div className="flex items-center justify-center gap-4">
            <div className="rounded-full">
              <img src={Zen1} alt="DP" className="w-12" />
            </div>
            <div className="justify-items-center">
              <div className="relative group">
                <img
                  src={formData.profile_picture!}
                  alt="DP"
                  className="w-24 rounded-full"
                />
                <div className="absolute right-2 bottom-0 bg-theme-dark-blue rounded-full border border-white p-1">
                  <Icon icon={"et:camera"} className="w-3 h-3" />
                </div>
              </div>
              <div className="text-center text-theme-blue text-xs flex gap-1 justify-center">
                {formData.first_name === "" ? (
                  <div>
                    <h3 className="font-bold text-center"></h3>
                    <p></p>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-center">
                      {formData.first_name + " " + formData.surname}
                    </h3>
                    <p>
                      {formData.age},{" "}
                      {formData.gender == "M" ? "Male" : "Female"}
                    </p>
                  </div>
                )}
                <Icon
                  icon={"material-symbols:verified-outline-rounded"}
                  className="text-green-600 w-5 h-5"
                />
              </div>
            </div>
            <div className="rounded-full">
              <img src={Zen3} alt="DP" className="w-12" />
            </div>
          </div>

          <div className="text-start">
            <h2 className="text-white font-bold text-sm mb-6">Bio</h2>
            <div className="text-xs text-theme-blue">{formData.bio}</div>
          </div>

          <div className="text-start">
            <h2 className="text-white font-bold text-sm mb-6">
              Basic Information
            </h2>
            <div className="space-y-4">
              {[
                { label: "Location", value: "Lagos, Nigeria" },
                { label: "Birthday", value: "December, 1942" },
                { label: "Height", value: "5ft, 4 Inches" },
                { label: "Weight", value: "65 KG" },
                { label: "Language", value: "English, Yoruba, Pidgin" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-xs text-theme-blue flex justify-between"
                >
                  <p>{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileRegistration;
