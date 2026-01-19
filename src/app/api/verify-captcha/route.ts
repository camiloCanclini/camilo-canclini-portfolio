// ============================================================
// EXTERNAL DEPENDENCIES
// ============================================================
import { NextResponse } from "next/server";

// ============================================================
// TYPES
// ============================================================
interface VerifyCaptchaRequest {
  token: string;
}

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

// ============================================================
// CONSTANTS
// ============================================================
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE_THRESHOLD = 0.5;
const EXPECTED_ACTION = "contact_form_submit";

// ============================================================
// API ROUTE - Verify reCAPTCHA
// ============================================================
/**
 * POST /api/verify-captcha
 * Verifies reCAPTCHA v3 token from contact form
 * 
 * @param req - Request with token and email
 * @returns JSON response with verification result
 */
export async function POST(req: Request) {
  try {
    // ============================================================
    // VALIDATION
    // ============================================================
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not configured");
      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 }
      );
    }

    const body = await req.json() as VerifyCaptchaRequest;
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { message: "reCAPTCHA token is required." },
        { status: 400 }
      );
    }

    // ============================================================
    // RECAPTCHA VERIFICATION
    // ============================================================
    const verificationUrl = `${RECAPTCHA_VERIFY_URL}?secret=${secretKey}&response=${token}`;

    const response = await fetch(verificationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      console.error("reCAPTCHA API request failed:", response.statusText);
      return NextResponse.json(
        { message: "Failed to verify reCAPTCHA." },
        { status: 500 }
      );
    }

    const data = await response.json() as RecaptchaResponse;

    // ============================================================
    // VERIFICATION CHECKS
    // ============================================================
    // Check if verification was successful
    if (!data.success) {
      console.warn("reCAPTCHA verification failed:", data["error-codes"]);
      return NextResponse.json(
        { message: "reCAPTCHA verification failed. Are you a bot? 🤖" },
        { status: 403 }
      );
    }

    // Check score threshold
    if (data.score <= MIN_SCORE_THRESHOLD) {
      console.warn(`Low reCAPTCHA score: ${data.score} for user`);
      return NextResponse.json(
        { message: "Suspicious activity detected. Please try again." },
        { status: 403 }
      );
    }

    // Check action matches expected value
    if (data.action !== EXPECTED_ACTION) {
      console.warn(`Invalid action: ${data.action}, expected: ${EXPECTED_ACTION}`);
      return NextResponse.json(
        { message: "Invalid reCAPTCHA action." },
        { status: 403 }
      );
    }

    // ============================================================
    // SUCCESS RESPONSE
    // ============================================================
    return NextResponse.json({
      message: `Welcome user, you're verified! 🎉`,
      score: data.score,
    });

  } catch (error) {
    // ============================================================
    // ERROR HANDLING
    // ============================================================
    console.error("Error verifying reCAPTCHA:", error);
    return NextResponse.json(
      { message: "Server error verifying reCAPTCHA." },
      { status: 500 }
    );
  }
}
