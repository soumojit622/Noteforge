"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { signUpUser } from "@/server/users";
import { KeyRound, Loader2, Lock, Mail, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaGoogle } from 'react-icons/fa';
import { toast } from "sonner";

const formSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    name: z.string().min(1),
});

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);

            if (values.password !== values.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            const response = await signUpUser(
                values.email,
                values.password,
                values.name
            );
            if (response.success) {
                toast.success("Please check your email for verification.");
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const signUp = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col gap-6">
                                {/* Email */}
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Mail className="size-4" />
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="m@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Name */}
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <User className="size-4" />
                                                    Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Password */}
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Lock className="size-4" />
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="password here" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <KeyRound className="size-4" />
                                                    Confirm Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="confirm password " {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Submit + Google */}
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            <>
                                                <UserPlus className="size-4 " />
                                                Sign up
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={signUp}
                                        type="button"
                                    >
                                        <FaGoogle className="size-4" />
                                        Sign up with Google
                                    </Button>
                                </div>

                            </div>

                            {/* Login Link */}
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{' '}
                                <Link href="/login" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}