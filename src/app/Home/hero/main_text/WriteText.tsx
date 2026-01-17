import { type CSSProperties, useEffect, useRef, useState } from "react";

type TypewriterResult = {
  output: string;
  isComplete: boolean; // en modo loop => "terminó la PRIMERA frase"
};

/* 🔹 Hook original: texto único, solo escribe */
function useTypewriter(
  text: string,
  speed = 100,
  delay = 1000
): TypewriterResult {
  const [output, setOutput] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setOutput("");
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (isComplete) return;

    const timeout = setTimeout(() => {
      setOutput((previous) => {
        const nextValue = text.slice(0, previous.length + 1);

        if (nextValue.length === text.length) {
          setIsComplete(true);
        }

        return nextValue;
      });
    }, output.length === 0 ? delay : speed);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, output, isComplete]);

  return { output, isComplete };
}

/* 🔹 NUEVO hook: prefix + array de sufijos, escribe / mantiene / borra en loop */
function useTypewriterLoop(opts: {
  prefix?: string;
  texts: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  startDelay?: number;
  holdTime?: number;
  firstHoldTime?: number;
}): TypewriterResult {

    const {
    prefix = "",
    texts,
    typingSpeed = 100,
    deleteSpeed = 60,
    startDelay = 1000,
    holdTime = 1200,
    firstHoldTime,
  } = opts;


  const [output, setOutput] = useState("");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "holding" | "deleting">(
    "idle"
  );
  const [isFirstComplete, setIsFirstComplete] = useState(false);

  // Reiniciar si cambian prefix o texts
  useEffect(() => {
    setOutput("");
    setIndex(0);
    setPhase("idle");
    setIsFirstComplete(false);
  }, [prefix, texts]);

  // Arranque después de startDelay
  useEffect(() => {
    if (phase !== "idle") return;

    const id = setTimeout(() => {
      setPhase("typing");
    }, startDelay);

    return () => clearTimeout(id);
  }, [phase, startDelay]);

  useEffect(() => {
    const currentText = texts[index] ?? "";
    const full = prefix + currentText;

    if (phase === "typing") {
      if (output.length >= full.length) {
        if (!isFirstComplete) {
          setIsFirstComplete(true); // solo para onComplete externo
        }

        // 👉 Pasamos directo a "holding"
        setPhase("holding");
        return;
      }

      const id = setTimeout(() => {
        setOutput((prev) => full.slice(0, prev.length + 1));
      }, typingSpeed);
      return () => clearTimeout(id);
    }




    if (phase === "holding") {
      const isFirstPhrase = index === 0;

      const currentHold =
        isFirstPhrase && firstHoldTime
          ? firstHoldTime
          : holdTime;

      const id = setTimeout(() => setPhase("deleting"), currentHold);
      return () => clearTimeout(id);
    }




    if (phase === "deleting") {
      // Borramos solo el sufijo; dejamos el prefix intacto
      if (output.length <= prefix.length) {
        // pasamos al siguiente sufijo
        setIndex((prev) => (prev + 1) % texts.length);
        setPhase("typing");
        return;
      }

      const id = setTimeout(() => {
        setOutput((prev) => prev.slice(0, prev.length - 1));
      }, deleteSpeed);

      return () => clearTimeout(id);
    }
  }, [phase, output, texts, index, prefix, typingSpeed, deleteSpeed, holdTime, isFirstComplete]);

  return { output, isComplete: isFirstComplete };
}

interface WriteTextProps {
  /** MODO SIMPLE: un solo texto */
  textToWrite?: string;
  /** MODO LOOP: array de textos que cambian, usando prefix+texto */
  textsToWrite?: string[];
  /** Prefijo que se mantiene fijo en modo loop (ej: "I'm ") */
  prefix?: string;

  className?: string;
  classNameText?: string;
  typingSpeed?: number;
  /** startDelay = delay inicial antes de empezar la PRIMERA escritura */
  startDelay?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorChar?: string;
  as?: keyof JSX.IntrinsicElements;

  /** Solo para modo loop */
  deleteSpeed?: number;
  holdTime?: number;
  firstHoldTime?: number;
}

const cursorStyles: CSSProperties = {
  display: "inline-block",
  width: "0.08em",
  animation: "typewriter-blink 1.2s ease-in-out infinite",
};

export default function WriteText({
  textToWrite,
  textsToWrite,
  prefix = "",
  className = "",
  classNameText = "",
  typingSpeed = 100,
  startDelay = 1000,
  deleteSpeed = 60,
  holdTime = 1200,
  firstHoldTime,
  onComplete,
  showCursor = true,
  cursorChar = "|",
  as = "span",
}: WriteTextProps) {
  const isLoopMode = Array.isArray(textsToWrite) && textsToWrite.length > 0;

      const { output: typed, isComplete } = isLoopMode
      ? useTypewriterLoop({
        prefix,
        texts: textsToWrite!,
        typingSpeed,
        deleteSpeed,
        startDelay,
        holdTime,
        firstHoldTime, // 👈 se lo pasamos al hook
      })
    : useTypewriter(textToWrite ?? "", typingSpeed, startDelay);

  const hasNotifiedRef = useRef(false);
  const Tag = as;

  useEffect(() => {
    hasNotifiedRef.current = false;
  }, [textToWrite, textsToWrite, prefix]);

  // onComplete solo se dispara UNA vez (al terminar la PRIMERA frase)
  useEffect(() => {
    if (isComplete && !hasNotifiedRef.current) {
      hasNotifiedRef.current = true;
      onComplete?.();
    }
  }, [isComplete, onComplete]);

  // En modo loop queremos cursor siempre; en modo simple se apaga al terminar
  const shouldRenderCursor =
    showCursor && (!isComplete || isLoopMode);

  return (
    <>
      <style>{`
        @keyframes typewriter-blink {
          0% { opacity: 0.15; }
          45% { opacity: 1; }
          55% { opacity: 0.9; }
          100% { opacity: 0.2; }
        }
      `}</style>
      <Tag className={className}>
        <span className={classNameText}>{typed}</span>
        {shouldRenderCursor ? (
          <span style={cursorStyles}>{cursorChar}</span>
        ) : null}
      </Tag>
    </>
  );
}
