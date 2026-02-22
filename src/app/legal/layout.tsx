import React from "react";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white dark:bg-themedark-bg min-h-screen pb-[15vh]">
            <div className="mx-auto px-8 md:px-20 py-12 pt-[12vh] bg-gray-50 dark:bg-neutral-900/50 dark:shadow-white/5 border border-black/5 dark:border-white/5">
                <article className="legal-content">
                    {children}
                </article>
            </div>
        </div>
    );
}
