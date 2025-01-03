import { Typography } from "@material-tailwind/react";
import { SetPopupContext } from "App";
import axios from "axios";
import { Modal, Rating } from "flowbite-react";
import apiList from "libs/apiList";
import { server } from "libs/apiList";
import { useContext } from "react";

const ApplicationTile = (props) => {
  const { application, getData } = props;
  const setPopup = useContext(SetPopupContext);

  const appliedOn = new Date(application.dateOfApplication);

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  const getResume = () => {
    if (
      application.jobApplicant.resume &&
      application.jobApplicant.resume !== ""
    ) {
      const address = `${apiList.downloadResume}/${application.jobApplicant._id}`;
      console.log(address);
      axios(address, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `resume-${application.jobApplicant.name}.pdf`
          );
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          setPopup({
            open: true,
            icon: "success",
            message: "Tải file PDF thành công",
          });
        })
        .catch((error) => {
          console.log(error);
          setPopup({
            open: true,
            icon: "error",
            message: "Đã xảy ra lỗi",
          });
        });
    } else {
      setPopup({
        open: true,
        icon: "error",
        message: "Không tìm thấy CV",
      });
    }
  };

  const updateStatus = (status) => {
    console.log(`Update status: ${status}`);
    console.log(`Application status: ${application.status}`);

    const address = `${apiList.applications}/${application._id}`;
    const statusData = {
      status: status,
      dateOfJoining: new Date().toISOString(),
    };
    axios
      .put(address, statusData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Update status successful:", response.data.message);
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  const buttonSet = {
    applied: (
      <div className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col gap-2">
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase font-semibold rounded-md"
            style={{
              background: colorSet["shortlisted"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("shortlisted")}
          >
            Sơ loại
          </button>
        </div>
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase font-semibold rounded-md"
            style={{
              background: colorSet["shortlisted"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("shortlisted")}
          >
            Từ chối
          </button>
        </div>
      </div>
    ),
    shortlisted: (
      <div className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col gap-2">
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase font-semibold rounded-md"
            style={{
              background: colorSet["accepted"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("accepted")}
          >
            Chấp nhận
          </button>
        </div>
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase font-semibold rounded-md"
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("rejected")}
          >
            Từ chối
          </button>
        </div>
      </div>
    ),
    rejected: (
      <div className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col gap-2">
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase font-semibold rounded-md"
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
          >
            Đã từ chối
          </button>
        </div>
      </div>
    ),
    accepted: (
      <div className="w-[9rem] py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center">
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase font-semibold rounded-md px-4 py-2"
            style={{
              background: colorSet["accepted"],
              color: "#ffffff",
            }}
          >
            Đã chấp nhận
          </button>
        </div>
      </div>
    ),
    cancelled: (
      <div className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col gap-2">
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase font-semibold rounded-md"
            style={{
              background: colorSet["cancelled"],
              color: "#ffffff",
            }}
          >
            Đã hủy
          </button>
        </div>
      </div>
    ),
    finished: (
      <div className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col gap-2">
        <button>
          <button
            className="w-full h-full flex items-center justify-center uppercase font-semibold rounded-md"
            style={{
              background: colorSet["finished"],
              color: "#ffffff",
            }}
          >
            Hoàn thành
          </button>
        </button>
      </div>
    ),
  };

  return (
    <tr className="flex items-center">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
        <img
          src={`${application.jobApplicant.profile}`}
          alt={`${application.jobApplicant.name}'s profile`}
          className="w-[10rem] h-[10rem] rounded-xl"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
        <div>
          <Typography variant="h5">{application.jobApplicant.name}</Typography>
        </div>
        <div>
          <Rating
            value={
              application.jobApplicant.rating !== -1
                ? application.jobApplicant.rating
                : null
            }
            readOnly
          />
        </div>
        <div>
          Ngày nộp:{" "}
          <span className="font-semibold">
            {appliedOn.toLocaleDateString()}
          </span>
        </div>
        <div>
          Học vấn:{" "}
          <span className="font-semibold">
            {application.jobApplicant.education
              .map((edu) => {
                return `${edu.institutionName} (${edu.startYear}-${
                  edu.endYear ? edu.endYear : "Đang học"
                })`;
              })
              .join(", ")}
          </span>
        </div>
        <div className="mt-2">
          <td className="text-bold">Kỹ năng:</td>
          <td className="text-right">
            <div className="flex flex-row-reverse gap-1">
              {application.jobApplicant.skills.map((tag, index) => (
                <div
                  key={index}
                  className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                >
                  <span className="">{tag}</span>
                </div>
              ))}
            </div>
          </td>
        </div>
      </td>
      <td className="px-6 py-4 w-[25%] whitespace-nowrap text-sm text-gray-500">
        <div className="flex flex-col items-center justify-center">
          <button
            className="w-[9rem] h-full flex items-center justify-center uppercase bg-gray-400 opacity-80 text-white font-semibold rounded-md px-4 py-2 mb-2"
            onClick={() => getResume()}
          >
            Tải CV
          </button>
          <div className="flex container rounded-md">
            {buttonSet[application.status]}
          </div>
        </div>
      </td>
      {/* <Modal>
        <div className="p-[20px] outline-none flex flex-col justify-center min-w-[30%] items-center">
          <button
            className="p-[10px 50px]"
            onClick={() => {
              console.log("Submit button clicked");
            }}
          >
            Submit
          </button>
        </div>
      </Modal> */}
    </tr>
  );
};

export default ApplicationTile;
