import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import "../Styles/contact.css"; // Import the Contact.css file for styling
import { sendMessage } from "../Services/contactServices";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await sendMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      setSuccessMessage(
        "Thanks for reaching out! Our team will get back to you soon.",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);

      setErrorMessage(
        error?.response?.data?.message ||
          "We couldn't send your message right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" aria-labelledby="contact-title">
      {/* Background decoration */}
      <div aria-hidden="true" className="contact-decoration-top" />

      <div aria-hidden="true" className=" contact-decoration-bottom" />

      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <div className="contact-badge">
            <Sparkles size={20} className="contact-badge-icon" />
            Start a conversation
          </div>

          <h2 id="contact-title" className="contact-title">
            Have a chai idea?
          </h2>

          <p className="contact-description">
            Tell us what you are building, exploring, or curious about. We will
            help you find the right next step.
          </p>
        </div>

        {/* Main contact area */}
        <div className="contact-grid">
          {/* Left side - CONTACT INFORMATION */}
          <div className="contact-info-card">
            <div className="contact-info-content">
              <p className="contact-info-label">A quick hello</p>

              <h3 className="contact-info-title">
                Let&apos;s make it personal.
              </h3>

              <p className="contact-info-description">
                Ask about OMI, a partnership, a franchise, or simply share your
                feedback. A real member of our team will read your message.
              </p>

              {/* Contact details */}
              <div className="contact-details">
                {/* Location */}
                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <MapPin size={20} className="contact-detail-icon-svg" />
                  </div>

                  <div className="contact-detail-content">
                    <p className="contact-detail-title">
                      Find us at Chaiomi HQ
                    </p>

                    <p className="contact-detail-text">
                      Ayaanz food labs pvt ltd
                      <br /> Plot no :78, Designer Tower 1st floor,
                      <br />
                      silpa Layout, Gachibowli, Hyderabad - 500032
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className=" contact-detail">
                  <div className="contact-detail-icon">
                    <Phone size={20} className="contact-detail-icon-svg" />
                  </div>
                  <div className="contact-detail-content">
                    <p className="contact-detail-title">Call us</p>

                    <a href="tel:+917569297513" className="contact-detail-link">
                      +91 7569297513
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <Mail size={20} className="contact-detail-icon-svg" />
                  </div>

                  <div className="contact-detail-content">
                    <p className="contact-detail-title">Email us</p>

                    <a
                      href="mailto:hr@thechaistories.com"
                      className="contact-detail-link"
                    >
                      hr@thechaistories.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Response note */}
              <div className="contact-response">
                <p className=" contact-response-tex">
                  Prefer a direct conversation?
                </p>

                <p className=" contact-response-description">
                  Call or email us and we will point you in the right direction.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-header">
              <h3 className="contact-form-title">Drop us a note</h3>

              <p className="contact-form-description">
                Keep it short or tell us the whole story—we are listening.
              </p>
            </div>

            {/* Fill in Name, Email */}
            <div className="contact-form-row grid">
              {/* Name */}
              <div className="contact-form-group">
                <label htmlFor="contact-name" className="contact-form-label">
                  Full name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  className="contact-input"
                />
              </div>

              {/* Email */}
              <div className="contact-form-group">
                <label htmlFor="contact-email" className="contact-form-label">
                  Email address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="contact-input"
                />
              </div>
            </div>

            {/* Phone + Subject */}
            <div className=" contact-form-row">
              {/* Phone */}
              <div className="contact-form-group">
                <label htmlFor="contact-phone" className="contact-form-label">
                  Phone number
                </label>

                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  className="contact-input"
                  required
                />
              </div>

              {/* Subject */}
              <div className="contact-form-group">
                <label htmlFor="contact-subject" className="contact-form-label">
                  What can we help with?
                </label>

                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Select an option"
                  required
                  className={`contact-select ${
                    formData.subject ? "has-value" : "placeholder"
                  }`}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="General Inquiry">
                    General Inquiry &nbsp; (Questions, Feedback, Careers,etc.)
                  </option>
                  <option value="Partnership">
                    Partnership &nbsp; (Resellers, Affiliates, Collaborators,
                    Vendors, etc.)
                  </option>
                  <option value="Franchise">
                    Franchise &nbsp; (Interested in opening a Chaiomi
                    franchise?/ Operating a Chaiomi franchise?)
                  </option>
                  <option value="Support">
                    Support &nbsp; (Technical issues, App support, Order issues,
                    etc.)
                  </option>
                  <option value="Careers / Job Applications">
                    Careers / Job Applications &nbsp; (Interested in joining the
                    Chaiomi team?)
                  </option>
                  <option value=" Feedback / Suggestions">
                    Feedback / Suggestions &nbsp; (We value your feedback and
                    suggestions!)
                  </option>
                  <option value="Other">
                    Other &nbsp; (Any other inquiries or topics not listed
                    above.)
                  </option>
                </select>
              </div>
            </div>
            <div className=" contact-form-group contact-message-group">
              <label htmlFor="contact-message" className="contact-form-label">
                Your message
              </label>

              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows={6}
                required
                className="contact-textarea"
              />
            </div>

            {/* Success */}
            <AnimatePresence initail={false} mode="wait">
              {successMessage && (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="contact-form-success"
                  role="status"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CheckCircle2
                    size={20}
                    className="contact-form-success-icon"
                  />

                  <p className="contact-success-message">{successMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  key="error-message"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="contact-form-error"
                  role="alert"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AlertCircle size={20} className="contact-form-error-icon" />

                  <p className=" contact-error-message">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-form-submit"
            >
              {isSubmitting ? (
                <>
                  <span className="contact-form-submit-spinner" />
                  Sending message...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

            <p className="contact-disclaimer">
              By submitting this form, you agree to be contacted regarding your
              inquiry.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
