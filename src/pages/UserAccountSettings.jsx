import React, { useState } from "react";
import { useUserAuthorization } from "../hooks/UserAuthorization.jsx";
import { Input, Button } from "@heroui/react";

const EyeToggle = ({ visible, onClick }) => (
  <button type="button" onClick={onClick} className="text-gray-400 hover:text-gray-600 focus:outline-none">
    {visible ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    )}
  </button>
);

const UserAccountSettings = () => {
  const { user } = useUserAuthorization();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleShow = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const passwordMismatch =
    form.confirmPassword && form.newPassword !== form.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-6">

      <h2 className="text-lg font-semibold text-gray-600">Postavke računa</h2>

      {/* Profile info */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Profil</h3>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-gray-500">
              {user?.email?.[0]?.toUpperCase() ?? "?"}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-gray-700">{user?.email}</span>
            <span className="text-xs text-gray-400">{user?.role ?? "Admin"}</span>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Promjena lozinke</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
          <Input
            type={show.newPassword ? "text" : "password"}
            label="Nova lozinka"
            placeholder="Unesite novu lozinku"
            value={form.newPassword}
            onChange={handleChange("newPassword")}
            variant="bordered"
            size="sm"
            endContent={
              <EyeToggle
                visible={show.newPassword}
                onClick={() => toggleShow("newPassword")}
              />
            }
          />
          <Input
            type={show.confirmPassword ? "text" : "password"}
            label="Potvrdi novu lozinku"
            placeholder="Ponovite novu lozinku"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            variant="bordered"
            size="sm"
            isInvalid={!!passwordMismatch}
            errorMessage={passwordMismatch ? "Lozinke se ne podudaraju" : ""}
            endContent={
              <EyeToggle
                visible={show.confirmPassword}
                onClick={() => toggleShow("confirmPassword")}
              />
            }
          />

          <div className="pt-1">
            <Button
              type="submit"
              color="primary"
              size="sm"
              isDisabled={
                !form.newPassword ||
                !form.confirmPassword ||
                !!passwordMismatch
              }
            >
              Spremi promjene
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default UserAccountSettings;
