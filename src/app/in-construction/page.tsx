"use client"

import Link from 'next/link'
import { useLang } from "@src/providers/LanguageProvider";
import { getSectionText } from "@src/i18n/pageInfo";
import Image from 'next/image';
import constructionImage from "@public/resources/img/others/programming.gif";

export default function NotFound() {
    const { locale } = useLang();
    const sectionText = getSectionText("in_construction", locale);

    if (!sectionText) return null;

    const { subtitle, content } = sectionText;

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 mb-[20vh] h-[100vh]">
            <div className="relative w-[340px] h-[340px] bg-gray-100 dark:bg-gray-900
             rounded-full p-[6em] flex items-center justify-center
             shadow-lg shadow-gray-500/10">
                <img src={constructionImage.src} alt="In Construction" className=" w-full h-full object-contain" />
            </div>
            <h2 className="text-4xl mt-4 font-semibold text-gray-800 dark:text-gray-200">
                {subtitle || "Page Not Found"}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
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