import InputField from "components/InputField";
import { useState } from "react";

export default function PasswordSettings({ user }) {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <div className="md:mt-0 my-16 p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-medium leading-6 text-gray-900">Mật khẩu</h3>
      <p className="mt-1 text-sm text-gray-600">Thay đổi sang mật khẩu mới.</p>

      <InputField
        className="md:w-1/2 w-full mt-6"
        label="Mật khẩu mới"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu mới"
      />
      <InputField
        className="md:w-1/2 w-full mt-6"
        label="Xác nhận mật khẩu"
        type="password"
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className="flex items-center pt-6">
        <div
          className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
          //   onClick={() => handlePasswordUpdate()}
        >
          Lưu
        </div>

        <div
          className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black bg-light px-8 py-3 rounded-xl border-none"
          onClick={() => setPassword("")}
        >
          Hủy
        </div>
      </div>
    </div>
  );
}
