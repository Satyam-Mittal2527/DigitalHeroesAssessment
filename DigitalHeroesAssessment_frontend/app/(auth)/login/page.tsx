"use client";

import { useState, useEffect } from "react";
import AuthForm from "../AuthPage";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";


export default function login() {
    const router = useRouter();
    const [Login_Form_items, setLogin_Form_items] = useState([{
        name: "email",
        type: "email",
        label: "Email",
    }, {
        name: "password",
        type: "password",
        label: "password",
    },]);
    const [formData, setformData] = useState({
        email: "",
        password: ""
    });

    const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
    const [remaining, setRemaining] = useState<number>(0);
    const [isSending, setIsSending] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        console.log("Form submitted with data:", formData)

        const response = await loginUser(formData.email, formData.password);

        if (response.success) {
            router.push("/admin");
        } else {
            alert(response.message);
        }


    }
    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const name = event.target.name;
        const value = event.target.value;

        setformData((currentFields) => ({
            ...currentFields,
            [name]: value,
        }));
    }
    return (
        <div className="flex flex-col gap-6 text-center">
            <AuthForm
                fields={Login_Form_items}
                handleSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
                SubmitButtonText="Login"
            />
        </div>
    );
}