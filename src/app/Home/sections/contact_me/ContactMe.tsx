"use client";

// ============================================================
// IMPORTS - External libraries
// ============================================================
import { motion } from "framer-motion";
import { useState } from "react";

// ============================================================
// IMPORTS - Internal components
// ============================================================
import { SectionHeading } from "@ui/barrel_files/components";
import { NeonMailPanel } from "./NeonMailPanel";

// ============================================================
// TYPES
// ============================================================
type ConicBorderBoxProps = {
  size?: number;
  radius?: number;
  border?: number;
  duration?: number;
  bg?: string;
};

type Status =
  | { type: "idle" }
  | { type: "success"; msg: string }
  | { type: "error"; msg: string };

// ============================================================
// SUB-COMPONENT - Conic Border Animation
// ============================================================
export const ConicBorderBox: React.FC<ConicBorderBoxProps> = ({
  size = 100,
  radius = 12,
  border = 8,
  duration = 2,
  bg = "#6d28d9",
}) => {
  return (
    <>
      <motion.div
        className="absolute w-[100%] h-[100%]"
        style={{
          scale: 120,
          borderRadius: radius,
          background: `conic-gradient(from 0deg, transparent 70%, #fff)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      />
      <div
        className="absolute inset-1 mx-auto my-auto bg-black"
        style={{ borderRadius: Math.max(0, radius - border) }}
      />
    </>
  );
};

// ============================================================
// MAIN COMPONENT - Contact Me Section
// ============================================================
export const ContactMe: React.FC = () => {
  // ============================================================
  // STATE
  // ============================================================
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const maxValueLength = 200;

  // ============================================================
  // HANDLERS
  // ============================================================
  const validateField = (name: string, value: string) => {
    let error = false;
    if (name === "name") error = value.trim() === "";
    if (name === "email") error = !/\S+@\S+\.\S+/.test(value);
    if (name === "message") error = value.trim() === "" || value.length > maxValueLength;
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "message" && value.length > maxValueLength) {
      newValue = value.slice(0, maxValueLength);
    }

    setValues((prev) => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
    setStatus({ type: "idle" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all fields
    const newErrors = {
      name: values.name.trim() === "",
      email: !/\S+@\S+\.\S+/.test(values.email),
      message: values.message.trim() === "" || values.message.length > maxValueLength,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      setStatus({ type: "error", msg: "Fix the highlighted fields." });
      return;
    }

    // Submit form
    try {
      setIsSubmitting(true);
      setStatus({ type: "idle" });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus({ type: "error", msg: json?.error ?? "Something went wrong." });
        return;
      }

      setStatus({ type: "success", msg: "Message sent!" });
      setValues({ name: "", email: "", message: "" });
      setErrors({ name: false, email: false, message: false });
    } catch {
      setStatus({ type: "error", msg: "Network error. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="w-full min-h-[100vh] pt-[10vh]">
      {/* Section heading */}
      <SectionHeading heading="Contact Me!" subheading="Let's get in touch" className="z-[200] relative" />

      <div className="w-full flex flex-col items-center justify-evenly max-w-3/5 mx-auto pb-[40vh]">
        {/* Form container with animated border */}
        <div className="form-container relative flex overflow-hidden rounded-lg mx-auto min-w-[50vw] min-h-[60vh] bg-gray-800/50">
          <ConicBorderBox bg="#3e3d75" duration={2} />

          {/* Left side: Neon mail illustration */}
          <div className="image-container grow w-1/2">
            <NeonMailPanel />
          </div>

          {/* Right side: Contact form */}
          <form className="w-1/2 z-20 grow flex flex-col justify-center px-10 bg-gray/10" onSubmit={handleSubmit}>
            {/* Name input */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`p-2 border-b rounded border-white/20 focus:border-white/80 focus:outline-none py-2 mb-4 transition-all duration-200 text-white hover:scale-[1.02] hover:cursor-pointer ${
                errors.name ? "border-red-500" : values.name && !errors.name ? "border-green-500" : ""
              }`}
              style={{ backgroundColor: "#ffffff11" }}
            />

            {/* Email input */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`p-2 border-b rounded border-white/20 focus:border-white/80 focus:outline-none py-2 mb-4 transition-all duration-200 text-white hover:scale-[1.02] hover:cursor-pointer ${
                errors.email ? "border-red-500" : values.email && !errors.email ? "border-green-500" : ""
              }`}
              style={{ backgroundColor: "#ffffff11" }}
            />

            {/* Message textarea with character counter */}
            <div className="relative">
              <textarea
                name="message"
                placeholder="Message"
                value={values.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`p-2 w-full border-b rounded border-white/20 focus:border-white/80 focus:outline-none py-2 mb-4 h-32 resize-none transition-all duration-200 text-white hover:scale-[1.02] hover:cursor-pointer ${
                  errors.message ? "border-red-500" : values.message && !errors.message ? "border-green-500" : ""
                }`}
                style={{ backgroundColor: "#FFF1" }}
              />
              <span className="absolute bottom-1 right-1 text-xs text-white/50">
                {values.message.length}/{maxValueLength}
              </span>
            </div>

            {/* Submit button */}
            <motion.input
              type="submit"
              value={isSubmitting ? "Sending..." : "Send Message"}
              className="contact-submit-button cursor-pointer mt-1 px-4 py-2 
                bg-gradient-to-t from-sky-700/40 to-fuchsia-700/20 text-white rounded 
                hover:bg-gradient-to-t hover:from-sky-400/30 hover:to-fuchsia-500/30 
                transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={isSubmitting ? undefined : { scale: 1.05 }}
              disabled={isSubmitting}
            />

            {/* Status message */}
            <div className="min-h-[24px] mt-2 text-sm">
              {status.type === "success" && <p className="text-green-400">{status.msg}</p>}
              {status.type === "error" && <p className="text-red-400">{status.msg}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
