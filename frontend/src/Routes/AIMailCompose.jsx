import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Sparkles, Send, Mail } from 'lucide-react';
import api from '../components/api';

const AIMailCompose = () => {
  const [prompt, setPrompt] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [aiMessage, setAIMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Call FastAPI backend to generate AI email
  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    setAIMessage(''); // Clear textarea before generating

    try {
      const res = await api.post(
        '/ai/generate',
        { writeup: prompt },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ AI response:', res.data);

      const content = res.data?.content;
      if (!content || content.trim() === '') {
        throw new Error('AI returned an empty message');
      }

      let subject = '';
      let body = content;

      if (content.startsWith('Subject:')) {
        const splitIndex = content.indexOf('\n\n');
        if (splitIndex !== -1) {
          subject = content.slice(8, splitIndex).trim(); // Remove "Subject:" and extract the line
          body = content.slice(splitIndex + 2).trim(); // The rest is the body
        } else {
          subject = content.replace('Subject:', '').trim(); // fallback
          body = '';
        }
      }

      console.log('📧 Subject:', subject);
      console.log('📝 Body:', body);

      setSubject(subject);
      setAIMessage(body);
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Failed to generate email';
      setError(message);
      setAIMessage('');
    } finally {
      setLoading(false);
    }
  };

  // Placeholder for sending email (replace with real API call)
  const handleSend = async () => {
    try {
      setSending(true);
      setError('');
      setSuccess(false);

      const res = await api.post('/ai-mail/send', {
        email: recipient,
        subject: subject,
        content: aiMessage,
      });

      console.log('Notification:', res.data.detail || res.data);

      // Simulate delay
      setTimeout(() => {
        setSending(false);
        setSuccess(true);
      }, 1200);
    } catch (err) {
      console.error('Send Error:', err);
      setSending(false);
      setError('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              Compose with AI
            </CardTitle>
            <p className="text-gray-300 mt-2 text-base font-normal">
              Tell the AI what kind of email you want to send. Edit the draft, specify the
              recipient, and send!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">
                Describe your email to the AI
              </label>
              <div className="flex gap-2">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Write a follow-up email about the meeting yesterday"
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  disabled={loading || sending}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleGenerate();
                  }}
                />
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || loading || sending}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {loading ? (
                    'Generating...'
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-1" /> Generate
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* AI Message Textarea */}

            {/* Subject Input */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Meeting follow-up"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                disabled={loading || sending}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">
                AI-generated message
              </label>

              {loading && (
                <p className="text-sm text-purple-400 mb-1 animate-pulse">
                  Generating email, please wait...
                </p>
              )}

              <Textarea
                value={aiMessage}
                onChange={(e) => setAIMessage(e.target.value)}
                placeholder="The AI's draft will appear here. You can edit it before sending."
                className="min-h-[140px] bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                disabled={sending}
              />
            </div>
            {/* Recipient Input */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">
                Recipient Email
              </label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="recipient@email.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                disabled={loading || sending}
                type="email"
              />
            </div>
            {/* Send Button & Feedback */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <Button
                onClick={handleSend}
                disabled={!aiMessage.trim() || !recipient.trim() || sending || loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center"
              >
                {sending ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-1" /> Send Message
                  </>
                )}
              </Button>
              {success && (
                <div className="flex items-center gap-2 text-green-400 mt-2">
                  <Mail className="w-5 h-5" /> Message sent successfully!
                </div>
              )}
              {error && <div className="text-red-400 mt-2">{error}</div>}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AIMailCompose;
