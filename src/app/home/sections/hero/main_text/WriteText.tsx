// ============================================================
// EXTERNAL DEPENDENCIES
// ============================================================
import { type CSSProperties, useEffect, useRef, useState } from "react";

// ============================================================
// TYPES
// ============================================================
type TypewriterResult = {
  output: string;
  isComplete: boolean; // en modo loop => "terminó la PRIMERA frase"
};

type TypewriterPhase = "idle" | "typing" | "holding" | "deleting";

type UseTypewriterLoopOptions = {
  prefix?: string;
  texts: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  startDelay?: number;
  holdTime?: number;
  firstHoldTime?: number;
};

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

// ============================================================
// CONSTANTS
// ============================================================
const DEFAULT_TYPING_SPEED = 100;
const DEFAULT_DELETE_SPEED = 60;
const DEFAULT_START_DELAY = 1000;
const DEFAULT_HOLD_TIME = 1200;
const DEFAULT_CURSOR_CHAR = "|";

const cursorStyles: CSSProperties = {
  display: "inline-block",
  width: "0.08em",
  animation: "typewriter-blink 1.2s ease-in-out infinite",
};

// ============================================================
// HOOKS - Simple Typewriter
// ============================================================
/**
 * Hook para efecto de escritura simple - escribe un texto una vez
 * @param text - Texto a escribir
 * @param speed - Velocidad de escritura en ms
 * @param delay - Delay inicial antes de empezar
 * @returns output (texto actual) e isComplete (si terminó)
 */
function useTypewriter(
  text: string,
  speed = DEFAULT_TYPING_SPEED,
  delay = DEFAULT_START_DELAY
): TypewriterResult {
  const [output, setOutput] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // Reset when text changes
  useEffect(() => {
    setOutput("");
    setIsComplete(false);
  }, [text]);

  // Typing effect
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

// ============================================================
// HOOKS - Loop Typewriter
// ============================================================
/**
 * Hook para efecto de escritura en loop - escribe, mantiene y borra textos cíclicamente
 * Mantiene un prefix fijo y cambia solo el sufijo
 * @param opts - Opciones de configuración
 * @returns output (texto actual) e isComplete (si terminó la primera frase)
 */
function useTypewriterLoop(opts: UseTypewriterLoopOptions): TypewriterResult {
  const {
    prefix = "",
    texts,
    typingSpeed = DEFAULT_TYPING_SPEED,
    deleteSpeed = DEFAULT_DELETE_SPEED,
    startDelay = DEFAULT_START_DELAY,
    holdTime = DEFAULT_HOLD_TIME,
    firstHoldTime,
  } = opts;

  const [output, setOutput] = useState("");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<TypewriterPhase>("idle");
  const [isFirstComplete, setIsFirstComplete] = useState(false);

  // Reset when prefix or texts change
  useEffect(() => {
    setOutput("");
    setIndex(0);
    setPhase("idle");
    setIsFirstComplete(false);
  }, [prefix, texts]);

  // Initial start delay
  useEffect(() => {
    if (phase !== "idle") return;

    const id = setTimeout(() => {
      setPhase("typing");
    }, startDelay);

    return () => clearTimeout(id);
  }, [phase, startDelay]);

  // Main loop effect
  useEffect(() => {
    const currentText = texts[index] ?? "";
    const full = prefix + currentText;

    // ============================================================
    // PHASE: TYPING - Escribiendo el texto
    // ============================================================
    if (phase === "typing") {
      if (output.length >= full.length) {
        if (!isFirstComplete) {
          setIsFirstComplete(true);
        }
        setPhase("holding");
        return;
      }

      const id = setTimeout(() => {
        setOutput((prev) => full.slice(0, prev.length + 1));
      }, typingSpeed);
      return () => clearTimeout(id);
    }

    // ============================================================
    // PHASE: HOLDING - Manteniendo el texto visible
    // ============================================================
    if (phase === "holding") {
      const isFirstPhrase = index === 0;
      const currentHold =
        isFirstPhrase && firstHoldTime ? firstHoldTime : holdTime;

      const id = setTimeout(() => setPhase("deleting"), currentHold);
      return () => clearTimeout(id);
    }

    // ============================================================
    // PHASE: DELETING - Borrando el sufijo
    // ============================================================
    if (phase === "deleting") {
      // Borramos solo el sufijo; dejamos el prefix intacto
      if (output.length <= prefix.length) {
        // Pasamos al siguiente sufijo
        setIndex((prev) => (prev + 1) % texts.length);
        setPhase("typing");
        return;
      }

      const id = setTimeout(() => {
        setOutput((prev) => prev.slice(0, prev.length - 1));
      }, deleteSpeed);

      return () => clearTimeout(id);
    }
  }, [
    phase,
    output,
    texts,
    index,
    prefix,
    typingSpeed,
    deleteSpeed,
    holdTime,
    firstHoldTime,
    isFirstComplete,
  ]);

  return { output, isComplete: isFirstComplete };
}

// ============================================================
// MAIN COMPONENT - WriteText
// ============================================================
/**
 * Componente de texto con efecto typewriter
 * Soporta dos modos:
 * - SIMPLE: escribe un texto una vez
 * - LOOP: escribe, mantiene y borra múltiples textos cíclicamente
 */
export default function WriteText({
  textToWrite,
  textsToWrite,
  prefix = "",
  className = "",
  classNameText = "",
  typingSpeed = DEFAULT_TYPING_SPEED,
  startDelay = DEFAULT_START_DELAY,
  deleteSpeed = DEFAULT_DELETE_SPEED,
  holdTime = DEFAULT_HOLD_TIME,
  firstHoldTime,
  onComplete,
  showCursor = true,
  cursorChar = DEFAULT_CURSOR_CHAR,
  as = "span",
}: WriteTextProps) {
  // ============================================================
  // STATE & REFS
  // ============================================================
  const hasNotifiedRef = useRef(false);

  // ============================================================
  // COMPUTED VALUES
  // ============================================================
  const isLoopMode = Array.isArray(textsToWrite) && textsToWrite.length > 0;
  
  const { output: typed, isComplete } = isLoopMode
    ? useTypewriterLoop({
        prefix,
        texts: textsToWrite!,
        typingSpeed,
        deleteSpeed,
        startDelay,
        holdTime,
        firstHoldTime,
      })
    : useTypewriter(textToWrite ?? "", typingSpeed, startDelay);

  const Tag = as;
  
  // En modo loop queremos cursor siempre; en modo simple se apaga al terminar
  const shouldRenderCursor = showCursor && (!isComplete || isLoopMode);

  // ============================================================
  // EFFECTS
  // ============================================================
  // Reset notification when text changes
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

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      {/* Cursor blink animation */}
      <style>{`
        @keyframes typewriter-blink {
          0% { opacity: 0.15; }
          45% { opacity: 1; }
          55% { opacity: 0.9; }
          100% { opacity: 0.2; }
        }
      `}</style>

      <Tag className={className}>
        {/* Typed text output */}
        <span className={classNameText}>{typed}</span>
        
        {/* Cursor */}
        {shouldRenderCursor ? (
          <span style={cursorStyles}>{cursorChar}</span>
        ) : null}
      </Tag>
    </>
  );
}
