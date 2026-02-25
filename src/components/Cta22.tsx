"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const GOOGLE_PLAY_URL = "#";
const APP_STORE_URL = "#";

const formSchema = z
  .object({
    email: z.string().email("Invalid email address"),
  })
  .required({ email: true });

interface Cta22Props {
  className?: string;
}

const Cta22 = ({ className }: Cta22Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section
      aria-labelledby="cta-heading"
      className={cn("w-full bg-brand-950 py-8 md:py-12 lg:py-16", className)}
    >
      <div className="page-container">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="relative h-[350px] overflow-hidden rounded-xl bg-background text-white md:col-span-2">
            <div className="flex h-full flex-row p-4 sm:p-8 md:p-12">
              <div className="relative z-10 w-full self-center px-2 text-center sm:w-auto sm:flex-1 sm:px-0 md:text-left">
                <h2
                  id="cta-heading"
                  className="font-heading mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-2xl md:text-3xl"
                >
                  Start investing with purpose
                </h2>
                <p className="body-lg mb-6 text-white/90">
                  Join thousands of Pakistanis building wealth the Shariah-compliant
                  way. Download the app and open your account in minutes.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 md:justify-start">
                  <Button asChild className="rounded-xl bg-white text-brand-900 hover:bg-white/90">
                    <Link
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <FaApple className="size-5" />
                      <span>Download for iOS</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl border-2 border-white bg-transparent text-white hover:bg-white/10"
                    asChild
                  >
                    <Link
                      href={GOOGLE_PLAY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <FaGooglePlay className="size-5" />
                      <span>Download for Android</span>
                    </Link>
                  </Button>
                </div>
              </div>
              {/* Phone section */}
              <div className="relative z-10 hidden md:block">
                <div className="absolute left-1/2 top-0 h-[120%] w-[69%] -translate-x-1/2 overflow-hidden rounded-t-[32px]">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-7-tall.svg"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative z-10 h-[350px] overflow-hidden">
                  <img
                    className="h-[600px] w-auto max-w-none"
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-2.png"
                    width={340}
                    height={600}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden h-[350px] items-center justify-center rounded-xl bg-muted p-6 sm:flex sm:p-8 md:p-12">
            <div className="w-full">
              <h2 className="mb-2 font-heading text-xl font-semibold sm:text-2xl">
                Subscribe to our weekly newsletter
              </h2>
              <p className="body-sm mb-6 text-muted-foreground">
                Stay updated with Shariah-compliant investing tips and Mahaana
                news delivered to your inbox.
              </p>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="space-y-4">
                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name} className="sr-only">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your email"
                          className="w-full bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Subscribe <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta22 };
