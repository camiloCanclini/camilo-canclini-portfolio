"use client"

import Link from 'next/link'
import { useLang } from "@src/providers/LanguageProvider";
import { getSectionText } from "@src/i18n/pageInfo";

export default function NotFound() {
    const { locale } = useLang();
    const sectionText = getSectionText("not_found", locale);

    if (!sectionText) return null;

    const { title, subtitle, content } = sectionText;

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 h-[100vh]">
            <h1 className="text-9xl font-bold text-theme-primary dark:text-themedark-primary">
                {title || "404"}
            </h1>
            <h2 className="text-2xl mt-4 font-semibold text-gray-800 dark:text-gray-200">
                {subtitle || "Page Not Found"}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
                {content?.description || "Sorry, the page you are looking for does not exist or has been moved."}
            </p>

            <Link
                href="/"
                className="mt-8 px-6 py-3 bg-theme-primary dark:bg-themedark-primary text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform"
            >
                {content?.button || "Back to Home"}
            </Link>
        </div>
    )
}