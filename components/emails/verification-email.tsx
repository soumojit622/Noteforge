import * as React from "react";
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Button,
    Hr,
    Tailwind,
} from "@react-email/components";
import {
    Clock,
    Link2,
    ShieldCheck,
    Locate,
    Copyright,
    MailCheck,
} from "lucide-react";

interface VerificationEmailProps {
    userName: string;
    verificationUrl: string;
}

const iconStyle = "inline-block align-middle mr-2 size-4 text-blue-600";

const VerificationEmail = ({
    userName,
    verificationUrl,
}: VerificationEmailProps) => {
    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Body className="bg-[#f4f7fb] font-sans py-10">
                    <Container className="bg-white max-w-[640px] mx-auto p-10 rounded-2xl shadow-xl border border-gray-200">
                        {/* Header */}
                        <Section className="text-center mb-10">
                            <Text className="text-[28px] font-extrabold text-gray-900 tracking-tight">
                                <MailCheck className={iconStyle} />
                                Welcome to <span className="text-blue-600">NoteForge</span>
                            </Text>
                            <Text className="text-sm text-gray-500 mt-1">
                                <Clock className={iconStyle} />
                                This link will expire in 24 hours
                            </Text>
                        </Section>

                        {/* Message */}
                        <Section className="mb-8">
                            <Text className="text-base text-gray-800 leading-relaxed mb-4">
                                Hi <strong>{userName}</strong>,
                            </Text>
                            <Text className="text-base text-gray-700 leading-relaxed mb-4">
                                Thanks for signing up! To activate your account and access your writing dashboard,
                                please verify your email by clicking the button below.
                            </Text>
                            <Text className="text-base text-gray-700 leading-relaxed">
                                Verifying your email ensures a secure experience and enables access to all features
                                of your NoteForge account.
                            </Text>
                        </Section>

                        {/* Call to Action */}
                        <Section className="text-center my-10">
                            <Button
                                href={verificationUrl}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-3 rounded-md font-semibold transition-colors duration-200"
                            >
                                Verify Email Address
                            </Button>
                        </Section>

                        {/* Fallback URL */}
                        <Section className="mb-10">
                            <Text className="text-sm text-gray-600 mb-2">
                                <Link2 className={iconStyle} />
                                If the button doesn&apos;t work, paste this link in your browser:
                            </Text>
                            <Text className="text-sm text-blue-600 break-words">{verificationUrl}</Text>
                        </Section>

                        <Hr className="border-gray-200 my-8" />

                        {/* Security Section */}
                        <Section className="mb-6">
                            <Text className="text-sm text-gray-800 font-semibold mb-2">
                                <ShieldCheck className={iconStyle} />
                                Security Reminder
                            </Text>
                            <Text className="text-sm text-gray-600">
                                If you didn’t request this email, you can safely ignore it. This link will expire
                                automatically and your email won’t be used.
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Section className="border-t border-gray-200 pt-6 text-center mt-10">
                            <Text className="text-xs text-gray-500">
                                <Locate className="inline-block size-4 mr-1" />
                                Sent from <strong>NoteForge</strong>
                            </Text>
                            <Text className="text-xs text-gray-500 mt-1">
                                91Springboard, 7th Block, Koramangala, Bengaluru, Karnataka – 560095, India
                            </Text>
                            <Text className="text-xs text-gray-500 mt-1">
                                <Copyright className="inline-block size-3 mr-1" />
                                {new Date().getFullYear()} NoteForge. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default VerificationEmail;
