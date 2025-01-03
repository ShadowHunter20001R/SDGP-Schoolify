"use client";

import React, { useState } from "react";
import { BackgroundLines } from "@/app/components/ui/background-lines";
import { Button, Input, Checkbox, Link, Form, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { AcmeIcon } from "./AcmeIcon";
import NextLink from "next/link";

import {Select, SelectItem} from "@nextui-org/react";
import { useRouter } from "next/navigation";
export const schoolRole = [
    {key: "teacher", label: "Teacher"},
    {key: "student", label: "Student"},
    {key: "parent", label: "Parent"},
];

export default function LoginPage() {
    const [isVisible, setIsVisible] = React.useState(false);

    const [role, setRole] = useState("student"); // Default role
    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Navigate to the main page with the selected role
        router.push(`/main/${role}/dashboard/?role=${role}`);
    };
    console.log(`this is the login ${role}`);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
            {/* Prevent Scrolling */}
            <style jsx global>{`
                body {
                    overflow: hidden;
                }
            `}</style>

            {/* Background Lines */}
            <BackgroundLines className="absolute inset-0 z-0 bg-black" />

            {/* Login Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6 py-8 bg-black border-1 border-gray-600 rounded-lg shadow-lg">
                {/* Welcome Section */}
                <div className="flex flex-col items-center mb-6">
                    <AcmeIcon size={60} />
                    <p className="text-lg sm:text-xl font-medium text-white">Welcome Back</p>
                    <p className="text-sm sm:text-base text-gray-400">
                        Log in to your account to continue
                    </p>
                </div>

                {/* Sign In Card */}
                <div className="w-full">
                    <div className="flex flex-col gap-1 mb-4">
                        <h1 className="text-lg sm:text-xl font-medium text-white">
                            Sign in to your account
                        </h1>
                        <p className="text-sm text-gray-400">to continue to Acme</p>
                    </div>

                    <Form
                        className="flex flex-col gap-3"
                        validationBehavior="native"
                        onSubmit={handleSubmit}
                    >
                        <Select
                            isRequired
                            className="max-w-xs"
                            defaultSelectedKeys={["student"]}
                            label="Your Role"
                            placeholder="Select your role"
                            variant="bordered"
                            fullWidth={true}
                            selectedKeys={new Set([role])} // Pass current role as a Set
                            onSelectionChange={(keys) => {
                                // Extract the first value from the Set
                                const selectedRole = Array.from(keys)[0];
                                setRole(selectedRole); // Update role as a string
                            }}
                            >
                            {schoolRole.map((schoolRole) => (
                                <SelectItem key={schoolRole.key}>{schoolRole.label}</SelectItem>
                            ))}
                        </Select>
                        <Input
                            isRequired
                            label="Email Address"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            variant="bordered"
                        />

                        <Input
                            isRequired
                            endContent={
                                <button type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <Icon
                                            className="pointer-events-none text-2xl text-gray-400"
                                            icon="solar:eye-closed-linear"
                                        />
                                    ) : (
                                        <Icon
                                            className="pointer-events-none text-2xl text-gray-400"
                                            icon="solar:eye-bold"
                                        />
                                    )}
                                </button>
                            }
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            type={isVisible ? "text" : "password"}
                            variant="bordered"
                        />

                        <div className="flex w-full items-center justify-between px-1 py-2">
                            <Checkbox name="remember" size="sm" className="text-gray-400">
                                Remember me
                            </Checkbox>
                            <Link className="text-sm text-gray-400" href="#" size="sm">
                                Forgot password?
                            </Link>
                        </div>
                        <Button
                            className="w-full"
                            color="primary"
                            type="submit"
                        >
                            Sign In
                        </Button>
                    </Form>
                    <div className="flex items-center gap-4 py-2">
                        <Divider className="flex-1" />
                        <p className="shrink-0 text-xs sm:text-sm text-gray-400">OR</p>
                        <Divider className="flex-1" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            startContent={
                                <Icon
                                    icon="flat-color-icons:google"
                                    width={24}
                                />
                            }
                            variant="bordered"
                        >
                            Continue with Google
                        </Button>
                    </div>
                    <p className="text-center text-sm text-gray-400">
                        Need to create an account?&nbsp;
                        <Link href="#" size="sm" className="text-blue-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}