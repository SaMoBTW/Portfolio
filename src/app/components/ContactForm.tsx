import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("messages").insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        unread: true,
      });

      if (error) throw error;

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message", {
        description: "Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-accent/40 backdrop-blur-sm border border-border rounded-xl shadow-2xl relative overflow-hidden text-left flex flex-col lg:flex-row">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-500 opacity-50 z-10"></div>

      {/* Left Column - Text Content */}
      <div className="p-8 lg:p-12 lg:w-5/12 bg-background/40 border-b lg:border-b-0 lg:border-r border-border/50 flex flex-col justify-center relative">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
          Get In Touch
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          I'm currently looking for new opportunities. Whether you have a
          question or just want to say hi.
        </p>
      </div>

      {/* Right Column - Form */}
      <form onSubmit={handleSubmit} className="p-8 lg:p-12 lg:w-7/12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-primary/80"
            >
              Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              maxLength={100}
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-background border border-border focus:border-primary/50 outline-none rounded-lg transition-colors placeholder:text-muted-foreground/50"
              placeholder="John Doe"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-primary/80"
            >
              Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              maxLength={150}
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-background border border-border focus:border-primary/50 outline-none rounded-lg transition-colors placeholder:text-muted-foreground/50"
              placeholder="john@example.com"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block text-sm font-medium mb-2 text-primary/80"
          >
            Subject <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            maxLength={200}
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-background border border-border focus:border-primary/50 outline-none rounded-lg transition-colors placeholder:text-muted-foreground/50"
            placeholder="New Opportunity"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2 text-primary/80"
          >
            Message <span className="text-destructive">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={2000}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-background border border-border focus:border-primary/50 outline-none rounded-lg resize-none transition-colors placeholder:text-muted-foreground/50"
            placeholder="Hi Samir, I would love to connect..."
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="flex justify-center md:justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-primary hover:text-white font-mono font-bold rounded-lg border border-primary/40 hover:bg-primary/80 disabled:opacity-50 transition-all duration-300 w-full md:w-auto hover:shadow-[0_0_20px_rgba(167,139,250,0.4)] group overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending...
              </>
            ) : (
              <>
                <Send
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
