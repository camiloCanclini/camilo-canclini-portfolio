import { type CSSProperties, useEffect, useRef, useState } from "react";

type TypewriterResult = {
  output: string;
  isComplete: boolean;
};

function useTypewriter(text: string, speed = 100, delay = 1000): TypewriterResult {
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

interface WriteTextProps {
  textToWrite: string;
  className?: string;
  typingSpeed?: number;
  startDelay?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorChar?: string;
  as?: keyof JSX.IntrinsicElements;
}

const cursorStyles: CSSProperties = {
  display: "inline-block",
  width: "0.08em",
  animation: "typewriter-blink 1.2s ease-in-out infinite",
};

export default function WriteText({
  textToWrite,
  className = "",
  typingSpeed = 100,
  startDelay = 1000,
  onComplete,
  showCursor = true,
  cursorChar = "|",
  as = "span",
}: WriteTextProps) {
  const { output: typed, isComplete } = useTypewriter(textToWrite, typingSpeed, startDelay);
  const hasNotifiedRef = useRef(false);
  const Tag = as;

  useEffect(() => {
    hasNotifiedRef.current = false;
  }, [textToWrite]);

  useEffect(() => {
    if (isComplete && !hasNotifiedRef.current) {
      hasNotifiedRef.current = true;
      onComplete?.();
    }
  }, [isComplete, onComplete]);

  const shouldRenderCursor = showCursor && !isComplete;

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
        {typed}
        {shouldRenderCursor ? (
          <span style={cursorStyles}>{cursorChar}</span>
        ) : null}
      </Tag>
    </>
  );
}
