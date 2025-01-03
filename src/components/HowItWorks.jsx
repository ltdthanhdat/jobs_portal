import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPeace,
  faSearch,
  faMoneyBillWave,
  faHandsHelping,
  faEnvelopeOpenText,
  faIdCard,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { userType } from "libs/isAuth";

export default function HowItWorks() {
  const type = userType();
  return (
    <div className="bg-white md:pt-32 pt-16">
      {type === "recruiter" ? (
        <>
          <h1 className="md:text-5xl text-4xl font-bold text-center text-gray-900 ">
            <strong>JobPortal</strong> hoạt động thế nào với <strong>Nhà tuyển dụng</strong>
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-14 md:py-40 md:pb-12 py-12   md:text-left text-center md:w-10/12 w-11/12  mx-auto ">
            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6  text-green-500"
                icon={faCopy}
              />

              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Bước 1:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Tạo hồ sơ
              </h1>
              <p className="text-xl font-light">
                Quảng bá công ty của bạn đến cộng đồng.
              </p>
            </div>

            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-indigo-500 "
                icon={faIdCard}
              />

              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Bước 2:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Đăng tin tuyển dụng
              </h1>
              <p className="text-xl font-light">
                Viết mô tả công việc, đặt mức thưởng tuyển dụng và phỏng vấn.
              </p>
            </div>

            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-primary"
                icon={faEnvelopeOpenText}
              />
              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Bước 3:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Ứng viên nộp đơn
              </h1>
              <p className="text-xl font-light">
                JOBPORTAL cho phép người dùng khám phá và ứng tuyển việc làm.
              </p>
            </div>

            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-yellow-400"
                icon={faHandsHelping}
              />
              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Bước 4:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Phỏng vấn và tuyển dụng
              </h1>
              <p className="text-xl font-light">
                Nếu bạn tìm thấy ứng viên phù hợp, bạn có thể phỏng vấn và tuyển dụng họ.
              </p>
            </div>
          </div>
        </>
      ) : type === "applicant" ? (
        <>
          <h1 className="md:text-6xl text-4xl font-bold text-center text-gray-900">
            <strong>JobPortal</strong> hoạt động thế nào với <strong>Ứng viên</strong>
          </h1>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-12 md:py-32 py-12 text-center md:w-10/12 w-11/12 mx-auto">
            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-secondary"
                icon={faSearch}
              />

              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Bước 1:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Tìm việc làm
              </h1>
              <p className="text-xl font-light">
                Tìm kiếm công việc hấp dẫn trên bảng việc làm.
              </p>
            </div>

            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-yellow-400"
                icon={faHandPeace}
              />
              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Bước 2:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Ứng tuyển việc làm
              </h1>
              <p className="text-xl font-light">
                Ứng tuyển vào công việc bạn yêu thích.
              </p>
            </div>

            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-green-500"
                icon={faMoneyBillWave}
              />

              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Bước 3:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Chờ phê duyệt
              </h1>
              <p className="text-xl font-light">
                Chờ đơn ứng tuyển của bạn được nhà tuyển dụng phê duyệt.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="md:text-6xl text-4xl font-bold text-center text-gray-900">
            <strong>JobPortal</strong> hoạt động thế nào
          </h1>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-12 md:py-32 py-12  text-center md:w-10/12 w-11/12  mx-auto ">
            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-secondary"
                icon={faSearch}
              />

              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Bước 1:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Tạo tài khoản
              </h1>
              <p className="text-xl font-light">
                Tạo tài khoản cho ứng viên hoặc nhà tuyển dụng.
              </p>
            </div>

            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-yellow-400"
                icon={faHandPeace}
              />
              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Bước 2:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Đăng nhập
              </h1>
              <p className="text-xl font-light">
                Đăng nhập với tài khoản bạn đã tạo.
              </p>
            </div>

            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-green-500"
                icon={faMoneyBillWave}
              />

              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Bước 3:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Bắt đầu trải nghiệm
              </h1>
              <p className="text-xl font-light">
                Tạo tin tuyển dụng hoặc tìm kiếm công việc bạn mong muốn.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
