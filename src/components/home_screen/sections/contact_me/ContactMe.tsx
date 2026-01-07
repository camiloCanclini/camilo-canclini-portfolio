import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "../SectionHeading";
import { NeonMailPanel } from "./NeonMailPanel";
import './ContactMe.css';

type ConicBorderBoxProps = {
  size?: number;        // px
  radius?: number;      // px
  border?: number;      // px
  duration?: number;    // seconds
  bg?: string;          // color/gradient base del conic
};

export const ConicBorderBox: React.FC<ConicBorderBoxProps> = ({
  size = 100,
  radius = 12,
  border = 8,      // ~0.5rem
  duration = 2,
  bg = "#6d28d9",  // equivalente a var(--bg)
}) => {
  return (
    <>
      {/* Capa del borde (conic) que rota */}
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

      {/* Centro (padding-box) que tapa y deja el borde visible */}
      <div
        className="absolute inset-1 mx-auto my-auto bg-black"
        style={{
          borderRadius: Math.max(0, radius - border)
        }}
      />    
    </>
  );
};

export const ContactMe: React.FC = () => {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const maxValueLength = 200;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'message' && value.length > maxValueLength) {
      newValue = value.slice(0, maxValueLength);
    }
    setValues({ ...values, [name]: newValue });
    validateField(name, newValue);
  };

  const validateField = (name: string, value: string) => {
    let error = false;
    if (name === 'name') error = value.trim() === '';
    if (name === 'email') error = !/\S+@\S+\.\S+/.test(value);
    if (name === 'message') error = value.trim() === '' || value.length > maxValueLength;
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: values.name.trim() === '',
      email: !/\S+@\S+\.\S+/.test(values.email),
      message: values.message.trim() === '' || values.message.length > maxValueLength
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).some(Boolean)) {
      alert('Mensaje enviado!');
      // Aquí puedes integrar con un backend o servicio de email
    }
  };

  return (
    <>
      <div className="w-full min-h-[100vh] pt-[10vh]">
        <SectionHeading heading="Contact Me!" subheading="Let's get in touch" className="z-[200] relative"/>
        <div className="w-full flex flex-col items-center justify-evenly max-w-3/5 mx-auto pb-[20vh]">
          <div className="form-container relative flex overflow-hidden rounded-lg mx-auto flex min-w-[50vw] min-h-[60vh] bg-gray-800/50 ">
            <ConicBorderBox bg="#3e3d75" duration={2} />
            <div className="image-container grow w-1/2">
              <NeonMailPanel></NeonMailPanel>
            </div>
            <form className="w-1/2 z-20 grow flex flex-col justify-center px-10 bg-gray/10" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder="Name" 
                value={values.name}
                onChange={handleChange}
                className={`contact-input ${errors.name ? 'border-red-500' : values.name && !errors.name ? 'border-green-500' : ''}`}
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={values.email}
                onChange={handleChange}
                className={`contact-input ${errors.email ? 'border-red-500' : values.email && !errors.email ? 'border-green-500' : ''}`}
              />
              <div className="relative">
                <textarea 
                  name="message"
                  placeholder="Message" 
                  value={values.message}
                  onChange={handleChange}
                  className={`contact-textarea ${errors.message ? 'border-red-500' : values.message && !errors.message ? 'border-green-500' : ''}`}
                />
                <span className="absolute bottom-1 right-1 text-xs text-white/50">{values.message.length}/{maxValueLength}</span>
              </div>
              <motion.input 
                type="submit" 
                value="Send Message" 
                className="contact-submit-button cursor-pointer mt-1 px-4 py-2 
              bg-gradient-to-t from-sky-700/40 to-fuchsia-700/20 text-white rounded hover:bg-gradient-to-t 
              hover:from-sky-400/30 hover:to-fuchsia-500/30 transition-all duration-300" 
                whileHover={{ scale: 1.05 }}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}