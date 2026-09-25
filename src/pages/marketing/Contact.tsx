import { useState, type FormEvent } from "react";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b border-[#E5E1D8]">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-24 md:pt-24">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              Contact us
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-[#17211D] md:text-7xl">
              Let's talk about
              <span className="block text-[#E4572E]">
                your restaurant.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
              Have a question about RestaurantOS, pricing or getting your
              restaurant set up? Send us a message and we'll get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-[#FCFAF6]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            {/* Contact information */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
                Get in touch
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#17211D]">
                We are here to help.
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                Whether you're setting up your first restaurant or managing
                an established operation, we're happy to help you understand
                how the platform works.
              </p>

              <div className="mt-10 space-y-4">
                <Card className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Email
                  </p>

                  <p className="mt-2 font-semibold text-[#17211D]">
                    hello@restaurantos.com
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Support
                  </p>

                  <p className="mt-2 font-semibold text-[#17211D]">
                    Monday – Friday
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    9:00 AM – 6:00 PM
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Location
                  </p>

                  <p className="mt-2 font-semibold text-[#17211D]">
                    Nepal
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Supporting restaurants across Nepal.
                  </p>
                </Card>
              </div>
            </div>

            {/* Form */}
            <Card className="p-7 md:p-9">
              {submitted ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#176B4D]/10 text-xl font-bold text-[#176B4D]">
                    ✓
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-[#17211D]">
                    Message received.
                  </h2>

                  <p className="mt-3 max-w-md leading-7 text-gray-600">
                    Thanks for reaching out. We'll review your message and
                    get back to you as soon as possible.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 text-sm font-semibold text-[#E4572E] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
                      Send a message
                    </p>

                    <h2 className="mt-3 text-2xl font-bold text-[#17211D]">
                      Tell us how we can help.
                    </h2>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-sm font-semibold text-[#17211D]"
                        >
                          Name
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="text-sm font-semibold text-[#17211D]"
                        >
                          Email
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="restaurant"
                        className="text-sm font-semibold text-[#17211D]"
                      >
                        Restaurant name
                      </label>

                      <input
                        id="restaurant"
                        name="restaurant"
                        type="text"
                        placeholder="Your restaurant"
                        className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="text-sm font-semibold text-[#17211D]"
                      >
                        What can we help with?
                      </label>

                      <select
                        id="subject"
                        name="subject"
                        defaultValue=""
                        className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                      >
                        <option value="" disabled>
                          Select a topic
                        </option>

                        <option value="getting-started">
                          Getting started
                        </option>

                        <option value="pricing">
                          Pricing
                        </option>

                        <option value="payments">
                          Payments
                        </option>

                        <option value="technical">
                          Technical question
                        </option>

                        <option value="other">
                          Other
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="text-sm font-semibold text-[#17211D]"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell us what you need help with..."
                        className="mt-2 w-full resize-none rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>

                    <p className="text-center text-xs leading-5 text-gray-500">
                      We'll only use your information to respond to your
                      enquiry.
                    </p>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="rounded-2xl border border-[#E5E1D8] bg-[#FCFAF6] px-8 py-10 text-center md:px-12">
            <h2 className="text-2xl font-bold text-[#17211D] md:text-3xl">
              Looking for answers?
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
              Check our pricing and feature pages for more information about
              the platform.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="/pricing">
                <Button variant="secondary">
                  View Pricing
                </Button>
              </a>

              <a href="/features">
                <Button>
                  Explore Features
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}