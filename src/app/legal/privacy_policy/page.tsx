import fs from "fs";
import path from "path";
import { Metadata } from "next";

// 1. Exportás los metadatos aquí
export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy of this website.',
    openGraph: {
        title: 'Privacy Policy | Camilo Canclini',
        description: 'Privacy Policy of this website.',
        url: '/legal/privacy_policy',
    },
}

export default async function PrivacyPolicyPage() {
    const filePath = path.join(
        process.cwd(),
        "src/app/legal/privacy_policy/privacy_policy.html"
    );
    const htmlContent = fs.readFileSync(filePath, "utf8");

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}
