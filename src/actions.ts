"use server"
import { Resend } from "resend";
import { htmlTemplates} from '@/helpers/html-templates'

const EMAIL_FROM = "onboarding@resend.dev";
const EMAIL_TO = "info@utenzia.it";
const RESEND_API_KEY = 're_iSXc4SPS_JqHUWmfKVVJHcRrJWbzyaAc5';

const EMAIL_SUBJECTS = {
    agency: "Nuova registrazione dell'agenzia",
    client: "Registrazione nuovo cliente",
};

export const sendEmail = async ({ data, type, agency }) => {
    try {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject: EMAIL_SUBJECTS[type] || "Nuova registrazione",
            html: htmlTemplates({ data, type, agency }),
        });

        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { error: error.message, success: false };
    }
};
