import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Sparkles, Send, Mail } from "lucide-react";
import api from "../api/api";
import { notifySuccess, notifyError } from "../utils/toastHelpers";
import GmailStatusBadge from "../Routes/GmailStatusBadge";
import { useAuth } from "../context/AuthContext";

const AIMailCompose = () => {
  const [prompt, setPrompt] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [aiMessage, setAIMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [gmailLinked, setGmailLinked] = useState(null);
  const [showGmailPrompt, setShowGmailPrompt] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  const { auth } = useAuth();

  useEffect(() => {
    const checkGmail = async () => {
      try {
        const res = await api.get("/email/status", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        setGmailLinked(res.data.gmail_linked);
        if (!res.data.gmail_linked) setShowGmailPrompt(true);
      } catch (e) {
        console.error(e);
        setGmailLinked(false);
        setShowGmailPrompt(true);
        notifyError("Failed to verify Gmail connection.");
      }
    };

    if (auth?.token) {
      checkGmail();
    }
  }, [auth]);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    setAIMessage("");

    try {
      const res = await api.post(
        "/ai/generate",
        { writeup: prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const content = res.data?.content;
      if (!content || content.trim() === "") {
        throw new Error("AI returned an empty message");
      }

      let subject = "";
      let body = content;

      if (content.startsWith("Subject:")) {
        const splitIndex = content.indexOf("\n\n");
        if (splitIndex !== -1) {
          subject = content.slice(8, splitIndex).trim();
          body = content.slice(splitIndex + 2).trim();
        } else {
          subject = content.replace("Subject:", "").trim();
          body = "";
        }
      }

      setSubject(subject);
      setAIMessage(body);
    } catch (err) {
      const message =
        err.response?.data?.detail || err.message || "Failed to generate email";
      setError(message);
      setAIMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!gmailLinked) {
      setShowGmailPrompt(true);
      return;
    }

    try {
      setSending(true);
      setError("");
      setSuccess(false);

      const res = await api.post(
        "/ai-mail/send",
        {
          email: recipient,
          subject: subject,
          content: aiMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPrompt("");
      setRecipient("");
      setSubject("");
      setAIMessage("");
      setSuccess(true);
      notifySuccess("Email sent successfully!");

      setTimeout(() => {
        setSending(false);
      }, 1200);
    } catch (err) {
      console.error("Send Error:", err);
      setSending(false);
      setError("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 text-white shadow-2xl rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-400 via-white to-cyan-400 text-transparent bg-clip-text">
              <Sparkles className="w-7 h-7 text-cyan-400" />
              Compose with AI
            </CardTitle>
            <p className="text-gray-400 mt-3 text-base font-light tracking-wide">
              Tell the AI what kind of email you want to send. Edit the draft,
              specify the recipient, and send!
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-cyan-300">
                Describe your email to the AI
              </label>
              <div className="flex gap-2">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Write a follow-up email about the meeting yesterday"
                  className="flex-1 bg-white/5 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 transition-colors duration-200"
                  disabled={loading || sending}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleGenerate();
                  }}
                />
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || loading || sending}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium transition-colors duration-200 px-6"
                >
                  {loading ? (
                    "Generating..."
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-1" /> Generate
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-cyan-300">
                Subject
              </label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Meeting follow-up"
                className="bg-white/5 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 transition-colors duration-200"
                disabled={loading || sending}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-cyan-300">
                AI-generated message
              </label>
              {loading && (
                <p className="text-sm text-cyan-400 mb-2 animate-pulse">
                  Generating email, please wait...
                </p>
              )}
              <Textarea
                value={aiMessage}
                onChange={(e) => setAIMessage(e.target.value)}
                placeholder="The AI's draft will appear here. You can edit it before sending."
                className="min-h-[180px] bg-white/5 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 transition-colors duration-200 resize-none"
                disabled={sending}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-cyan-300">
                Recipient Email
              </label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="recipient@email.com"
                className="bg-white/5 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 transition-colors duration-200"
                disabled={loading || sending}
                type="email"
              />
            </div>

            <div className="flex flex-col items-center gap-2 mt-4">
              <Button
                onClick={handleSend}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium transition-colors duration-200 flex items-center justify-center gap-2 py-6 text-lg"
              >
                {sending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Send Message
                  </>
                )}
              </Button>

              {/* {success && (
                <div className="flex items-center gap-2 text-green-400 mt-2">
                  <Mail className="w-5 h-5" /> Message sent successfully!
                </div>
              )} */}

              {error && (
                <div className="text-red-400 mt-3 text-center">{error}</div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <GmailStatusBadge />
        </div>
      </motion.div>

      {showGmailPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black p-8 rounded-xl max-w-sm border border-cyan-500/30 text-white text-center space-y-4 shadow-2xl">
            <h2 className="text-xl font-semibold text-cyan-400">
              Connect Gmail
            </h2>
            <p className="text-gray-300">
              You need to connect your Gmail account to send emails. Would you
              like to connect now?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-6"
                onClick={() => {
                  window.location.href =
                    "https://mailto-6rgd.onrender.com/auth/google";
                }}
              >
                Connect
              </Button>
              <Button
                variant="outline"
                className="border-cyan-500/30 hover:bg-cyan-500/10 text-white"
                onClick={() => {
                  setShowGmailPrompt(false);
                  setPopupDismissed(true); // ❌ disables Send
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIMailCompose;
