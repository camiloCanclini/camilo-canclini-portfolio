"use client";

// ============================================================
// IMPORTS - External libraries
// ============================================================
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

/* To ReCaptcha */
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import recaptchaImg from "@public/resources/img/sections/contact_me/recaptcha_logo.png";

// ============================================================
// IMPORTS - Internal components
// ============================================================
import { SectionHeading } from "@ui/barrel_files/components";
import { NeonMailPanel } from "./NeonMailPanel";
import Image from "next/image";
import { useTheme } from "next-themes";

// ============================================================
// LANGUAGE & CONTENT
// ============================================================

import { getSectionText } from "@src/i18n/pageInfo";
import { useLang } from "@src/providers/LanguageProvider";


// ============================================================
// TYPES
// ============================================================
type ConicBorderBoxProps = {
  size?: number;
  radius?: number;
  border?: number;
  duration?: number;
  classnameSupContainer?: string;
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
  classnameSupContainer = "",
}) => {

  // ============================================================
  // THEME ADJUSTMENT
  // ============================================================
  const entryRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // OJO: antes de mounted, no uses theme para decidir estilos
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <>
      <motion.div
        className="absolute w-[100%] h-[100%]"
        style={{
          scale: 120,
          borderRadius: radius,
          background: `conic-gradient(from 0deg, transparent 70%, ${isDark ? "#FFF" : "#000"})`,
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      />
      <div
        className={`absolute inset-1 mx-auto my-auto ${classnameSupContainer}`}
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
  // TEXTS CONTENT (LANG BASED)
  // ============================================================
  const { locale } = useLang();
  const content = getSectionText("contact_me", locale);

  // ============================================================
  // STATE
  // ============================================================
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [showRecaptchaInfo, setShowRecaptchaInfo] = useState(false);

  const MAX_VALUE_LENGTH = 200;
  const TIME_TO_DISMISS_MESSAGE = 5000; // 5 seconds

  // ============================================================
  // GOOGLE RECAPTCHA
  // ============================================================
  const { executeRecaptcha } = useGoogleReCaptcha();


  // ============================================================
  // EFFECTS
  // ============================================================
  /**
   * Auto-dismiss success message after 5 seconds
   */
  useEffect(() => {
    if (status.type === "success") {
      const timer = setTimeout(() => {
        setStatus({ type: "idle" });
      }, TIME_TO_DISMISS_MESSAGE);

      return () => clearTimeout(timer);
    }
  }, [status]);


  // ============================================================
  // HANDLERS
  // ============================================================
  const validateField = (name: string, value: string) => {
    let error = false;
    if (name === "name") error = value.trim() === "";
    if (name === "email") error = !/\S+@\S+\.\S+/.test(value);
    if (name === "message") error = value.trim() === "" || value.length > MAX_VALUE_LENGTH;
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "message" && value.length > MAX_VALUE_LENGTH) {
      newValue = value.slice(0, MAX_VALUE_LENGTH);
    }

    setValues((prev) => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
    setStatus({ type: "idle" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    /* Execute reCAPTCHA */
    if (!executeRecaptcha) return;

    // Validate all fields
    const newErrors = {
      name: values.name.trim() === "",
      email: !/\S+@\S+\.\S+/.test(values.email),
      message: values.message.trim() === "" || values.message.length > MAX_VALUE_LENGTH,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      setStatus({ type: "error", msg: content!.content.messages.error_complete_fields });
      return;
    }

    // Submit form
    try {
      setIsSubmitting(true);
      setStatus({ type: "idle" });

      // Generate reCAPTCHA token with correct action name
      const token = await executeRecaptcha('contact_form_submit');

      // Verify reCAPTCHA token
      const captchaResponse = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email: values.email }),
      });

      if (!captchaResponse.ok) {
        const errorData = await captchaResponse.json().catch(() => ({}));
        setStatus({
          type: "error",
          msg: errorData.message || "Security verification failed. Please try again."
        });
        return;
      }

      // If captcha passes, send the email
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json().catch(() => null);

      console.log("Contact form response:", json);

      if (!res.ok) {
        setStatus({ type: "error", msg: json?.error ?? "Something went wrong." });
        return;
      }

      setStatus({ type: "success", msg: content!.content.messages.success });
      setValues({ name: "", email: "", message: "" });
      setErrors({ name: false, email: false, message: false });
    } catch {
      setStatus({ type: "error", msg: content!.content.messages.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="w-full min-h-[100vh] pt-[10vh]" id="contact_me_section">
      {/* Section heading */}
      <SectionHeading heading={content!.title || "Contact Me!"} subheading={content!.subtitle.toString() || "Let's get in touch"} className="z-[200] relative" />

      <div className="w-full flex flex-col items-center justify-evenly w-full lg:max-w-3/5 max-w-full p-3 lg:mx-auto pb-[40vh]">
        {/* Form container with animated border */}
        <div className="form-container relative flex lg:flex-row flex-col-reverse overflow-hidden rounded-lg w-full lg:w-auto h-[90vh] lg:h-auto lg:mx-auto lg:min-w-[50vw] lg:min-h-[60vh] bg-white/50 dark:bg-gray-800/50">
          <ConicBorderBox classnameSupContainer="dark:bg-black bg-neutral-300" duration={2} />

          {/* Left side: Neon mail illustration */}
          <div className="image-container grow lg:w-1/2 lg:h-auto  h-full h-[45vh] ">
            <NeonMailPanel status={status.type} />
          </div>

          {/* Right side: Contact form */}
          <form className="lg:w-1/2 z-20 grow flex flex-col justify-start lg:py-24 py-14 lg:px-10 px-8 bg-gray/10" onSubmit={handleSubmit}>
            {/* Name input */}
            <input
              type="text"
              name="name"
              placeholder={content!.content.inputName || "Name"}
              value={values.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`p-2 dark:border-b dark:border-0 border border-black/20 rounded bg-white dark:bg-neutral-900 focus:border-black/80 dark:border-white/20 dark:focus:border-white/80 
                focus:outline-none py-2 mb-4 transition-all duration-200 text-theme-primary dark:text-white
                hover:scale-[1.02] hover:cursor-pointer ${errors.name ? "!border-red-500/50" : values.name && !errors.name ? "!border-green-500/50" : ""
                }`}
            />

            {/* Email input */}
            <input
              type="email"
              name="email"
              placeholder={content!.content.inputEmail || "Email"}
              value={values.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`p-2 dark:border-b dark:border-0 border border-black/20 rounded bg-white dark:bg-neutral-900 focus:border-black/80 dark:border-white/20 dark:focus:border-white/80 focus:outline-none py-2 mb-4 transition-all duration-200 text-theme-primary dark:text-white hover:scale-[1.02] hover:cursor-pointer ${errors.email ? "!border-red-500/50" : values.email && !errors.email ? "!border-green-500/50" : ""
                }`}
            />

            {/* Message textarea with character counter */}
            <div className="relative">
              <textarea
                name="message"
                placeholder={content!.content.inputMessage || "Message"}
                value={values.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`p-2 w-full dark:border-b dark:border-0 border rounded bg-white dark:bg-neutral-900 border-black/20 focus:border-black/80 dark:border-white/20 dark:focus:border-white/80 focus:outline-none py-2 mb-4 h-32 resize-none transition-all duration-200 text-theme-primary dark:text-white hover:scale-[1.02] hover:cursor-pointer ${errors.message ? "!border-red-500/50" : values.message && !errors.message ? "!border-green-500/50" : ""
                  }`}
              />
              <span className="absolute bottom-1 right-1 text-xs text-black/50 dark:text-white/50">
                {values.message.length}/{MAX_VALUE_LENGTH}
              </span>
            </div>

            {/* Submit button */}
            <motion.input
              type="submit"
              value={isSubmitting ? "Sending..." : content!.content.button || "Send Message"}
              className="contact-submit-button bg-white dark:bg-neutral-900 cursor-pointer mt-1 px-4 py-2 dark:border-b dark:border-0 border border-black/20 focus:border-white/80
                bg-gradient-to-t from-stone-50/10 to-stone-400/10 dark:text-white text-black rounded 
                hover:bg-gradient-to-t hover:from-stone-50/10 hover:to-stone-400/30 
                transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={isSubmitting ? undefined : { scale: 1.05 }}
              disabled={isSubmitting}
            />

            {/* ReCaptcha Google Advice*/}
            <div className="absolute bottom-2 right-2 ">
              <button
                type="button"
                onClick={() => setShowRecaptchaInfo(!showRecaptchaInfo)}
                className=" rounded p-2 hover:bg-zinc-50/10 transition-colors cursor-pointer dark:invert-0 invert"
                aria-label="Show reCAPTCHA information"
              >
                <Image
                  src={recaptchaImg}
                  className="brightness-0 invert"
                  alt="reCAPTCHA logo"
                  width={40}
                  height={20}
                />
              </button>

              {/* Popup with reCAPTCHA info */}
              <AnimatePresence>
                {showRecaptchaInfo && (
                  <>
                    {/* Backdrop to close popup */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[100]"
                      onClick={() => setShowRecaptchaInfo(false)}
                    />

                    {/* Popup content */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-2 right-0 mr-16 mb-2 bg-white dark:bg-zinc-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 w-64 shadow-xl z-[101]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setShowRecaptchaInfo(false)}
                        className="absolute top-2 right-2 hover:opacity-70 transition-opacity dark:text-white/80 text-black/80"
                        aria-label="Close"
                      >
                        <X size={14} />
                      </button>

                      <p className="text-[10px] text-black/80 dark:text-white/80 leading-relaxed pr-4">
                        This site is protected by reCAPTCHA and the Google{" "}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                          href="https://policies.google.com/terms"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          Terms of Service
                        </a>{" "}
                        apply.
                      </p>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>


            {/* Status message */}
            <AnimatePresence mode="wait">
              {status.type !== "idle" && (
                <motion.div
                  key="status-message"
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    duration: 0.3,
                  }}
                  className={`relative min-h-[24px] mt-[2em] text-sm p-2 px-4 rounded ${status.type === "error"
                    ? "dark:text-red-400 text-red-700 bg-red-400/30 border-red-400/70 border"
                    : "dark:text-green-400 text-green-700 bg-green-400/30 border-green-400/70 border"
                    }`}
                >
                  <p className="pr-8">{status.msg}</p>
                  {(status.type === "error") ?
                    <button
                      type="button"
                      onClick={() => setStatus({ type: "idle" })}
                      className="absolute top-2 right-2 hover:opacity-70 transition-opacity"
                      aria-label="Close message"
                    >
                      <X size={16} />
                    </button> : null}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
};
