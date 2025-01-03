import React, { useState, useContext } from "react";
import InputField from "components/InputField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SetPopupContext } from "App";
import axios from "axios";
import isAuth from "libs/isAuth";
import apiList from "../../../libs/apiList";
import { MuiChipsInput } from "mui-chips-input";
import { apiUploadImages } from "libs/uploadImage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const [loggedin, setLoggedin] = useState(isAuth());
  const [phone, setPhone] = useState("");

  const [chips, setChips] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChip = (newChips) => {
    setChips(newChips);
  };

  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    name: "",
    education: [],
    skills: [],
    dateOfBirth: new Date(),
    resume: "",
    profile: "",
    news: false,
    bio: "",
    contactNumber: "",
  });

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      type: event.target.value,
    }));
  };

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    education: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    skills: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    bio: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    contactNumber: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
  });

  console.log("inputErrorHandler: ", inputErrorHandler);

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+\d{1,4}\d{6,}$/;

    return phoneRegex.test(phoneNumber);
  };

  let allFieldsCheckedApplicant = false;
  let allFieldsCheckedRecruiter = false;

  if (signupDetails.type === "applicant") {
    allFieldsCheckedApplicant =
      signupDetails.name.trim().length > 0 &&
      signupDetails.email.trim().length > 0 &&
      signupDetails.password.trim().length > 0 &&
      chips.some((item) => item.trim() !== "") &&
      signupDetails.education.every(
        (item) => item.institutionName.trim() !== ""
      ) &&
      signupDetails.profile.trim().length > 0 &&
      typeof signupDetails.news === "boolean";
  } else {
    allFieldsCheckedRecruiter =
      signupDetails.name.trim().length > 0 &&
      signupDetails.email.trim().length > 0 &&
      signupDetails.password.trim().length > 0 &&
      signupDetails.bio.trim().length > 0 &&
      (signupDetails.contactNumber.trim().length === 0 ||
        isValidPhoneNumber(signupDetails.contactNumber)) &&
      signupDetails.profile.trim().length > 0 &&
      typeof signupDetails.news === "boolean";
  }

  const handleInput = (key, value) => {
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
    console.log(`Input ${key} value:`, value);
  };

  const handleLogin = () => {
    // if (signupDetails.name === "") {
    //   setInputErrorHandler((prev) => ({
    //     ...prev,
    //     name: {
    //       message: "name is required",
    //     },
    //   }));
    //   return;
    // } else if (signupDetails.email === "") {
    //   setInputErrorHandler((prev) => ({
    //     ...prev,
    //     email: {
    //       message: "email is required",
    //     },
    //   }));
    //   return;
    // } else if (signupDetails.password === "") {
    //   setInputErrorHandler((prev) => ({
    //     ...prev,
    //     password: {
    //       message: "password is required",
    //     },
    //   }));
    //   return;
    // }
    try {
      const tmpErrorHandler = {};
      Object.keys(inputErrorHandler).forEach((obj) => {
        if (
          inputErrorHandler[obj].required &&
          inputErrorHandler[obj].untouched
        ) {
          tmpErrorHandler[obj] = {
            required: true,
            untouched: false,
            error: true,
            message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
          };
        } else {
          tmpErrorHandler[obj] = inputErrorHandler[obj];
        }
      });

      let updatedDetails = {
        ...signupDetails,
        skills: chips.filter((item) => item.trim() !== ""),
        education: education
          .filter((edu) => edu.institutionName.trim() !== "")
          .map((edu) => ({
            institutionName: edu.institutionName,
            startYear: edu.startYear,
            endYear: edu.endYear,
          })),
      };
      setSignupDetails(updatedDetails);

      const verified = !Object.keys(tmpErrorHandler).some((obj) => {
        return tmpErrorHandler[obj].error;
      });

      if (!verified) {
        axios
          .post(apiList.signup, updatedDetails)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("type", response.data.type);
            localStorage.setItem("id", response.data._id);
            setLoggedin(isAuth());
            setPopup({
              open: true,
              icon: "success",
              message: "Logged in successfully",
            });
            history("/referrals");
            console.log("export" + response);
            console.log(response?.data.type);
          })
          .catch((err) => {
            setPopup({
              open: true,
              icon: "warn",
              message: err.response.data.message,
            });
            console.log(err.response.data.message);
          });
      } else {
        setInputErrorHandler(tmpErrorHandler);
        setPopup({
          open: true,
          icon: "error",
          message: "Incorrect Input",
        });
      }
    } catch (error) {
      setPopup({
        open: true,
        icon: "error",
        message: error.data.message,
      });
    }
  };

  const handleLoginRecruiter = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      type: signupDetails.type,
      email: signupDetails.email,
      password: signupDetails.password,
      bio: signupDetails.bio,
      contactNumber: isValidPhoneNumber(signupDetails.contactNumber)
        ? `+${phone}`
        : "",
      profile: signupDetails.profile,
      news: signupDetails.news,
    };
    if (phone !== "") {
      updatedDetails = {
        ...signupDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...signupDetails,
        contactNumber: "",
      };
    }

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    console.log(updatedDetails);

    if (!verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          localStorage.setItem("id", response.data._id);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            icon: "success",
            message: "Logged in successfully",
          });
          console.log(response);
          history("/admin");
        })
        .catch((err) => {
          setPopup({
            open: true,
            icon: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        icon: "error",
        message: "Incorrect Input",
      });
    }
  };

  const uploadFile = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = "";
    let files = e.target.files;

    if (files && files.length > 0) {
      let formData = new FormData();
      for (let i of files) {
        formData.append("file", i);
        formData.append("upload_preset", "jobportal");
        formData.append("folder", "jobportal");
        let response = await toast.promise(apiUploadImages(formData), {
          pending: "Uploading images...",
          success: "Images uploaded successfully 👌",
          error: "Error uploading images 🤯",
        });
        if (response.status === 200) images = response.data?.secure_url;
        console.log(images);
      }

      setIsLoading(false);
      setImagesPreview(images);
      setSignupDetails((prevDetails) => ({
        ...prevDetails,
        profile: images,
      }));
    }
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8e5d4] md:py-24">
      <div className="bg-white rounded-2xl pt-10 md:px-8 px-6 pb-8 text-left md:w-4/12 w-11/12 mx-auto">
        <h2 className="text-4xl font-semibold text-gray-900 leading-none">
          Chào mừng đến với Job Portal
        </h2>
        <p className="text-md text-gray-600 pb-8">
          Thông tin bạn thêm bên dưới được sử dụng để tạo độ tin cậy cho hồ sơ và có thể chỉnh sửa sau.
        </p>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 bg-white">
            Chọn loại tài khoản
          </label>
          <select
            className="block border border-grey-light w-full p-3 rounded mb-4"
            value={signupDetails.type}
            onChange={handleChange}
          >
            <option value="applicant" className="rounded mb-4 text-gray-950">
              Ứng viên
            </option>
            <option value="recruiter" className="rounded mb-4 text-gray-950">
              Nhà tuyển dụng
            </option>
          </select>
        </div>

        <InputField
          type="text"
          label="Họ tên"
          value={signupDetails.name}
          error={inputErrorHandler.name.message}
          onChange={(e) => handleInput("name", e.target.value)}
          placeholder="Họ và tên"
          onBlur={(e) => {
            if (e.target.value === "") {
              handleInputError("name", true, "Họ tên là bắt buộc!");
            } else {
              handleInputError("name", false, "");
            }
          }}
          className="mb-4"
        />
        <InputField
          type="email"
          label="Email"
          value={signupDetails.email}
          error={inputErrorHandler.email.message}
          onChange={(e) => handleInput("email", e.target.value)}
          placeholder="email@example.com"
          onBlur={(e) => {
            if (e.target.value === "") {
              handleInputError("email", true, "Email là bắt buộc!");
            } else {
              handleInputError("email", false, "");
            }
          }}
          className="mb-4"
        />
        <InputField
          type="password"
          label="Mật khẩu"
          value={signupDetails.password}
          error={inputErrorHandler.password.message}
          onChange={(e) => handleInput("password", e.target.value)}
          placeholder="Mật khẩu của bạn"
          onBlur={(e) => {
            if (e.target.value === "") {
              handleInputError("password", true, "Mật khẩu là bắt buộc!");
            } else {
              handleInputError("password", false, "");
            }
          }}
          className="mb-4"
        />

        {signupDetails.type === "applicant" ? (
          <>
            {education.map((edu, index) => (
              <div
                className="mb-2"
                onBlur={(e) => {
                  if (e.target.value === "") {
                    handleInputError(
                      "education",
                      true,
                      "Thông tin học vấn là bắt buộc!"
                    );
                  } else {
                    handleInputError("education", false, "");
                  }
                }}
              >
                <div className="flex justify-between" key={index}>
                  <InputField
                    type="text"
                    label={`Tên trường ${index + 1}`}
                    value={edu.institutionName}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].institutionName = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="Tên trường"
                    className="mb-1"
                  />
                  <InputField
                    type="number"
                    label={`Năm bắt đầu ${index + 1}`}
                    value={edu.startYear}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].startYear = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="Năm bắt đầu"
                    className="mb-1"
                  />
                  <InputField
                    type="number"
                    label={`Năm kết thúc ${index + 1}`}
                    value={edu.endYear}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].endYear = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="Năm kết thúc"
                    className="mb-1"
                  />
                </div>
                <span className="text-[#ff3131] text-sm font-semibold">
                  {inputErrorHandler.education.message}
                </span>
              </div>
            ))}
            <div>
              <button
                className="block w-full border p-3 rounded mb-4 bg-yellow-300"
                onClick={() =>
                  setEducation([
                    ...education,
                    {
                      institutionName: "",
                      startYear: "",
                      endYear: "",
                    },
                  ])
                }
              >
                Thêm thông tin trường học
              </button>
            </div>

            <MuiChipsInput
              label="Kỹ năng *"
              helperText="Nhấn Enter để thêm kỹ năng"
              value={chips}
              onChange={handleChip}
              className="block border border-grey-light w-full p-3 rounded mb-4"
            />
          </>
        ) : (
          <>
            <InputField
              label="Giới thiệu (tối đa 250 từ)"
              style={{ width: "100%" }}
              value={signupDetails.bio}
              onChange={(e) => {
                if (
                  e.target.value.split(" ").filter(function (n) {
                    return n !== "";
                  }).length <= 250
                ) {
                  handleInput("bio", e.target.value);
                }
              }}
              error={inputErrorHandler.bio.message}
              onBlur={(e) => {
                if (e.target.value === "") {
                  handleInputError("bio", true, "Giới thiệu là bắt buộc!");
                } else {
                  handleInputError("bio", false, "");
                }
              }}
              className="mb-4"
            />
            <div
              onBlur={(e) => {
                if (e.target.value === "") {
                  handleInputError(
                    "contactNumber",
                    true,
                    "Contact Number is required!"
                  );
                } else {
                  handleInputError("contactNumber", false, "");
                }
              }}
            >
              <div>
                <PhoneInput
                  country={"vn"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                />
              </div>
              <span className="text-[#ff3131] text-sm font-semibold">
                {inputErrorHandler.contactNumber.message}
              </span>
            </div>
          </>
        )}

        <div className="w-full mb-6">
          <h2 className="font-semibold text-xl py-4">
            Ảnh đại diện <span className="text-red-500">*</span>
          </h2>
          <div className="w-full">
            <label
              className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md"
              htmlFor="file"
            >
              <div className="flex flex-col items-center justify-center">
                Tải ảnh lên
              </div>
            </label>
            <input
              onChange={uploadFile}
              hidden
              type="file"
              id="file"
              multiple
            />
            <div className="w-full">
              <h3 className="font-medium py-4">Chọn ảnh</h3>
              <div className="flex gap-4 items-center">
                {signupDetails.profile ? (
                  <div className="relative w-1/3 h-1/3">
                    <img
                      src={
                        Array.isArray(signupDetails.profile)
                          ? signupDetails.profile[0]
                          : signupDetails.profile
                      }
                      alt="preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <p>Chưa có ảnh nào được chọn</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <label className="block text-black text-sm font-medium mt-8 focus:outline-none outline-none">
          <input
            className="mr-2 leading-tight text-primary"
            type="checkbox"
            checked={signupDetails.news}
            onChange={() =>
              setSignupDetails((prevDetails) => ({
                ...prevDetails,
                news: !prevDetails.news,
              }))
            }
          />
          <span className="text-sm">
            Cập nhật thông tin mới về Job Portal và việc làm mới! Bạn có thể hủy đăng ký bất cứ lúc nào.
          </span>
        </label>

        <button
          className={`mt-2 w-full font-semibold px-4 py-3 rounded-lg text-sm ${
            (signupDetails.type === "applicant" && allFieldsCheckedApplicant) ||
            (signupDetails.type === "recruiter" && allFieldsCheckedRecruiter)
              ? "bg-primary text-gray-500 hover:bg-[#F2994A] hover:text-black border-yellow-100 cursor-pointer"
              : "bg-yellow-100 text-yellow-800 cursor-not-allowed border-yellow-100"
          }`}
          onClick={() => {
            signupDetails.type === "applicant"
              ? handleLogin()
              : handleLoginRecruiter();
          }}
          disabled={
            (signupDetails.type === "applicant" &&
              !allFieldsCheckedApplicant) ||
            (signupDetails.type === "recruiter" && !allFieldsCheckedRecruiter)
          }
        >
          Tạo tài khoản
        </button>

        <p className="text-xs text-center mt-6">
          Bằng việc tạo tài khoản, bạn đồng ý với Điều khoản và Điều kiện của Job Portal.
        </p>
      </div>
    </div>
  );
}
