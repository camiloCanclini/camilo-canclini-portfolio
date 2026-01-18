// ============================================================
// EXTERNAL DEPENDENCIES
// ============================================================
import * as React from "react";

// ============================================================
// TYPES
// ============================================================
interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

// ============================================================
// MAIN COMPONENT - Email Template
// ============================================================
/**
 * Email template for contact form submissions
 * Maintains portfolio aesthetic with gradient backgrounds and modern styling
 */
export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #222 0%, #000 100%)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(120, 200, 255, 0.2)",
        }}
      >
        {/* Header with gradient */}
        <div
          style={{
            background: "linear-gradient(135deg, #111 0%, #000 100%)",
            padding: "32px 32px 40px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: "bold",
              color: "#fff",
              position: "relative",
              zIndex: 1,
            }}
          >
            ¡Recibiste un nuevo mensaje de contacto desde el portfolio personal web!
          </h1>
          
        </div>

        {/* Content */}
        <div style={{ padding: "22px" }}>
          {/* Name field */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#fff",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Nombre
            </div>
            <div
              style={{
                fontSize: "18px",
                color: "#fff",
                fontWeight: "500",
                padding: "12px 16px",
                backgroundColor: "rgba(120, 200, 255, 0.05)",
                borderLeft: "3px solid #fff",
                borderRadius: "4px",
              }}
            >
              {name}
            </div>
          </div>

          {/* Email field */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#fff",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Email
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#fff",
                padding: "12px 16px",
                backgroundColor: "rgba(120, 200, 255, 0.05)",
                borderLeft: "3px solid #fff",
                borderRadius: "4px",
              }}
            >
              <a
                href={`mailto:${email}`}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                {email}
              </a>
            </div>
          </div>

          {/* Message field */}
          <div style={{ marginBottom: "0" }}>
            <div
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#fff",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Mensaje
            </div>
            <div
              style={{
                fontSize: "15px",
                lineHeight: "1.7",
                color: "#d1d1d1",
                padding: "16px",
                backgroundColor: "rgba(120, 200, 255, 0.05)",
                borderLeft: "3px solid #fff",
                borderRadius: "4px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {message}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "24px 32px",
            borderTop: "1px solid rgba(120, 200, 255, 0.1)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "rgba(255, 255, 255, 0.5)",
              textAlign: "center",
            }}
          >
            Este mensaje fue enviado desde{" "}
            <span style={{ color: "#78c8ff", fontWeight: "500" }}>
              portfolio.camilocanclini.com
            </span>
          </p>
        </div>
      </div>
  );
}