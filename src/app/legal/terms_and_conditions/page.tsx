import fs from "fs";
import path from "path";
import { Metadata } from "next";

// 1. Exportás los metadatos aquí
export const metadata: Metadata = {
    title: 'Terms and Conditions',
    description: 'Terms and Conditions of use of this website.',
    openGraph: {
        title: 'Terms and Conditions | Camilo Canclini',
        description: 'Terms and Conditions of use of this website.',
        url: '/legal/terms_and_conditions',
    },
}

export default async function TermsAndConditionsPage() {
    const filePath = path.join(
        process.cwd(),
        "src/app/legal/terms_and_conditions/terms_and_conditions.html"
    );
    const htmlContent = fs.readFileSync(filePath, "utf8");

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}
