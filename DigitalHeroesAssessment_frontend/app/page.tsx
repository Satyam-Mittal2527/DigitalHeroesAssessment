"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {getFormValue} from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  budget: z.enum(["under-1000", "1000-5000", "5000-15000", "15000-plus"] as const),
  message: z.string().min(10, "Please share a bit more about your project"),
});

type ContactFormValues = z.infer<typeof contactSchema>;


export default function Home() {
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data)
    const response = getFormValue(data);
    console.log(response);
    setSubmittedData(data);
    reset();
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg shadow-slate-200">
        <h1 className="mb-6 text-3xl font-semibold text-slate-900">Contact Us</h1>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="budget" className="block mb-2 text-sm font-medium text-slate-700">
              Budget range
            </label>
            <select
              id="budget"
              {...register("budget")}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Select your budget</option>
              <option value="under-1000">Under $1,000</option>
              <option value="1000-5000">$1,000 - $5,000</option>
              <option value="5000-15000">$5,000 - $15,000</option>
              <option value="15000-plus">$15,000+</option>
            </select>
            {errors.budget && <p className="mt-2 text-sm text-red-600">{errors.budget.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={5}
              placeholder="Tell us more about your project"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
            {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {submittedData ? (
          <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-slate-900">
            <h2 className="mb-2 text-lg font-semibold">Submitted data</h2>
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        ) : null}
      </section>
    </main>
  );
}
