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
    Lock,
    CalendarClock,
    Link2,
    ShieldAlert,
    HelpCircle,
    Mail,
    Locate,
    Copyright,
} from "lucide-react";

interface PasswordResetEmailProps {
    userName: string;
    resetUrl: string;
    requestTime: string;
}

const iconStyle = "inline-block align-middle mr-2 size-4 text-blue-600";

const PasswordResetEmail = ({
    userName,
    resetUrl,
    requestTime,
}: PasswordResetEmailProps) => {
    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Body className="bg-[#f4f7fb] font-sans py-10">
                    <Container className="bg-white max-w-[640px] mx-auto p-10 rounded-2xl shadow-lg border border-gray-200">
                        {/* Header */}
                        <Section className="text-center mb-10">
                            <Text className="text-[28px] font-extrabold text-gray-900 tracking-tight">
                                <Lock className={iconStyle} />
                                Reset Your Password - <span className="text-blue-600">NoteForge</span>
                            </Text>
                            <Text className="text-sm text-gray-500 mt-1">
                                <CalendarClock className={iconStyle} />
                                Request received on {requestTime}
                            </Text>
                        </Section>

                        {/* Greeting */}
                        <Section className="mb-8">
                            <Text className="text-base text-gray-800 mb-4">
                                Hi <strong>{userName}</strong>,
                            </Text>
                            <Text className="text-base text-gray-700 leading-relaxed mb-3">
                                We received a request to reset your password. Click the button below to securely set a new one.
                            </Text>
                            <Text className="text-base text-gray-700 leading-relaxed">
                                For your protection, this link will expire in <strong>1 hour</strong> and can only be used once.
                            </Text>
                        </Section>

                        {/* Button */}
                        <Section className="text-center my-8">
                            <Button
                                href={resetUrl}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-3 rounded-md font-semibold transition-colors duration-200"
                            >
                                Reset My Password
                            </Button>
                        </Section>

                        {/* Link fallback */}
                        <Section className="mb-10">
                            <Text className="text-sm text-gray-600 mb-2">
                                <Link2 className={iconStyle} />
                                If the button doesn’t work, copy and paste this link into your browser:
                            </Text>
                            <Text className="text-sm text-blue-600 break-words">{resetUrl}</Text>
                        </Section>

                        <Hr className="border-gray-200 my-8" />

                        {/* Security Notice */}
                        <Section className="mb-8">
                            <Text className="text-sm text-gray-800 font-semibold mb-2">
                                <ShieldAlert className={iconStyle} />
                                Security Notice:
                            </Text>
                            <Text className="text-sm text-gray-600 leading-relaxed">
                                • Didn’t request this? You can safely ignore this email.<br />
                                • This reset link expires in one hour and can be used only once.<br />
                                • If you're receiving multiple reset emails, please contact support.
                            </Text>
                        </Section>

                        {/* Help Section */}
                        <Section className="bg-gray-50 p-4 rounded-md mb-8 border">
                            <Text className="text-sm text-gray-800 font-semibold mb-1">
                                <HelpCircle className={iconStyle} />
                                Need Help?
                            </Text>
                            <Text className="text-sm text-gray-600 leading-relaxed">
                                Reach us at{" "}
                                <a href="mailto:support@noteforge.in" className="text-blue-600 underline">
                                    <Mail className="inline-block size-4 mr-1" />
                                    support@noteforge.in
                                </a>{" "}
                                or visit our Help Center.
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Section className="border-t border-gray-200 pt-6 text-center">
                            <Text className="text-xs text-gray-500">
                                <Locate className="inline-block size-4 mr-1" />
                                Sent by <strong>NoteForge</strong>
                            </Text>
                            <Text className="text-xs text-gray-500">
                                91Springboard, 7th Block, Koramangala, Bengaluru, Karnataka, India – 560095
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

export default PasswordResetEmail;
