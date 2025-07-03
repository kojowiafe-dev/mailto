import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted: ', form);
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen bg-black text-white py-24 px-6 md:px-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold"
          >
            Get in <span className="text-indigo-500">Touch</span>
          </motion.h2>

          <div className="grid gap-6">
            <div className="bg-gray-900 p-6 rounded-xl flex items-center gap-4 shadow-md">
              <Phone className="w-10 h-10 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-400">Call Us</p>
                <p className="font-semibold">+1 (800) 123-4567</p>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl flex items-center gap-4 shadow-md">
              <MessageCircle className="w-10 h-10 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-400">Live Chat</p>
                <p className="font-semibold">Chat with an AI Agent</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-700/10 text-green-300 p-6 rounded-xl shadow-md"
            >
              Thanks for reaching out! We’ll get back to you shortly.
            </motion.div>
          ) : (
            // <form onSubmit={handleSubmit} className="space-y-4 text-left">
            //   <div>
            //     <label htmlFor="name" className="block mb-1 text-sm font-medium">
            //       Name
            //     </label>
            //     <Input
            //       id="name"
            //       name="name"
            //       type="text"
            //       required
            //       value={form.name}
            //       onChange={handleChange}
            //       placeholder="Jane Doe"
            //       className="bg-gray-800 text-white"
            //     />
            //   </div>

            //   <div>
            //     <label htmlFor="email" className="block mb-1 text-sm font-medium">
            //       Email
            //     </label>
            //     <Input
            //       id="email"
            //       name="email"
            //       type="email"
            //       required
            //       value={form.email}
            //       onChange={handleChange}
            //       placeholder="jane@example.com"
            //       className="bg-gray-800 text-white"
            //     />
            //   </div>

            //   <div>
            //     <label htmlFor="message" className="block mb-1 text-sm font-medium">
            //       Message
            //     </label>
            //     <Textarea
            //       id="message"
            //       name="message"
            //       rows={4}
            //       required
            //       value={form.message}
            //       onChange={handleChange}
            //       placeholder="Briefly describe your request"
            //       className="bg-gray-800 text-white"
            //     />
            //   </div>

            //   <Button type="submit" size="lg" className="text-lg font-semibold w-full">
            //     Send Message
            //   </Button>
            // </form>

            <Card className="w-full max-w-sm bg-gray-900 text-white">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Enter your email below to contact us</CardDescription>
                <CardAction>
                  <Button variant="link" className="text-white" navigate="/">
                    Back to Home
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="message">Message</Label>
                        {/* <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a> */}
                      </div>
                      <Textarea id="message" rows={4} required />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full border-1 border-white">
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-1 border-black bg-white text-black hover:bg-black hover:text-white hover:border-white"
                >
                  Back to Home
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
