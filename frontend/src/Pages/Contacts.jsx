// CONTACT PAGE
// Company contact page with location details and inquiry form

import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { sendMessage } from "../Services/contactServices";
import { locations } from "../data/locations";
import "../StylePages/contact.css"; // Import CSS for styling the Contact page

const headquartersLocation = locations.find((location) => location.id === 1);
const headquartersMapUrl = headquartersLocation
  ? `https://www.google.com/maps?q=${headquartersLocation.lat},${headquartersLocation.lng}&z=16&output=embed`
  : "https://www.google.com/maps";

function getOfficeStatus() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const isOpen = hour >= 10 && hour < 19;

  return {
    isOpen,
    label: isOpen
      ? "Online — We are accepting inquiries"
      : "Away — We will respond first thing tomorrow",
  };
}

// Full contact page with location details and inquiry form.
function ContactPage() {
  const [officeStatus, setOfficeStatus] = useState(getOfficeStatus);
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

  useEffect(() => {
    const statusTimer = window.setInterval(() => {
      setOfficeStatus(getOfficeStatus());
    }, 60_000);

    return () => window.clearInterval(statusTimer);
  }, []);

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
      await sendMessage(formData);
      setSuccessMessage("Your message has been sent successfully!");

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
          "An error occurred while sending your message. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <div className="contact-page-container">
          <header className="contact-page-header">
            <p className="contact-page-eyebrow">CONNECT WITH THE TEAM</p>

            <h1 className="contact-page-title">
              Let&apos;s build what&apos;s next
            </h1>

            <p className="contact-page-intro">
              From franchise opportunities to technology partnerships, share
              your goals and our team will help you explore the possibilities.
            </p>
          </header>

          {/* Contact info and Form */}
          <div className="contact-page-grid">
            <section className="contact-page-info">
              <p className="contact-page-info-eyebrow">Plan your next step</p>
              <h2 className="contact-page-info-title">
                We&apos;re here to help
              </h2>
              <p className="contact-page-info-text">
                Visit our office, call us, or send a detailed inquiry. Tell us
                what you need and we will connect you with the right person.
              </p>
              <div className="contact-page-info-list">
                <div className="contact-page-info-row-top">
                  <MapPin
                    className="contact-page-info-icon-top"
                    aria-hidden="true"
                  />
                  <p className="contact-page-info-address">
                    Ayaanz food labs pvt ltd
                    <br /> Plot no :78, Designer Tower 1st floor,
                    <br />
                    silpa Layout, Gachibowli, Hyderabad - 500032
                  </p>
                </div>
                {/* Contact Info */}
                <div className="contact-page-info-row">
                  <Phone
                    className="contact-page-info-icon"
                    aria-hidden="true"
                  />
                  <a
                    href="tel:+917569297513"
                    className="contact-page-info-link"
                  >
                    +91 7569297513
                  </a>
                </div>
                <div className="contact-page-info-row">
                  <Mail className="contact-page-info-icon" aria-hidden="true" />
                  <a
                    href="mailto:hr@thechaistories.com"
                    className="contact-page-info-link"
                  >
                    hr@thechaistories.com
                  </a>
                </div>
              </div>
              <div
                className={`contact-page-status ${
                  officeStatus.isOpen ? "contact-page-status-open" : ""
                }`}
                role="status"
                aria-live="polite"
              >
                <div className="contact-page-status-heading">
                  <span
                    className="contact-page-status-dot"
                    aria-hidden="true"
                  />
                  <span>Live work status</span>
                </div>
                <p className="contact-page-status-label">
                  {officeStatus.label}
                </p>
                <p className="contact-page-status-response">
                  Average response time: under 2 hours during business hours.
                </p>
              </div>
            </section>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="contact-page-form">
              <div>
                <h2 className="contact-page-form-title">Tell us more</h2>
                <p className="contact-page-form-text">
                  Share a few details so we can prepare a useful response.
                </p>
              </div>
              <div>
                <label htmlFor="contact-name" className="contact-page-label">
                  Full name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  placeholder="Your name"
                  className="contact-page-input"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="contact-page-label">
                  Work or personal email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="contact-page-input"
                />
              </div>
              <div className="contact-page-form-row">
                <div>
                  <label htmlFor="contact-phone" className="contact-page-label">
                    Phone number{" "}
                    <span className="contact-page-optional">(Optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="contact-page-input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="contact-page-label"
                  >
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`contact-page-select ${formData.subject ? "has-value" : ""}`}
                  >
                    <option value="">Select an option</option>
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
                      Support &nbsp; (Technical issues, App support, Order
                      issues, etc.)
                    </option>
                    <option value="Careers / Job Applications">
                      Careers / Job Applications &nbsp; (Interested in joining
                      the Chaiomi team?)
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
              <div>
                <label htmlFor="contact-message" className="contact-page-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us how we can help..."
                  rows={6}
                  className="contact-page-textarea"
                />
              </div>
              {/* Success and Error Messages */}
              {successMessage && (
                <div
                  className="contact-page-alert contact-page-alert--success"
                  role="status"
                >
                  <CheckCircle2 size={20} className="contact-page-alert-icon" />
                  <p className="contact-page-alert-text">{successMessage}</p>
                </div>
              )}
              {errorMessage && (
                <div
                  className="contact-page-alert contact-page-alert--error"
                  role="alert"
                >
                  <AlertCircle size={20} className="contact-page-alert-icon" />
                  <p className="contact-page-alert-text">{errorMessage}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-page-submit"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information and Map */}
          <section className="contact-page-location">
            <div className="contact-page-location-grid">
              {/* Location Information */}
              <div className="contact-page-location-info">
                <p className="contact-page-location-eyebrow">Find us</p>

                <h2 className="contact-page-location-title">
                  Visit Chaiomi Office
                </h2>

                <p className="contact-page-location-address">
                  Ayaanz food labs pvt ltd ,<br /> Plot no 78, Designer Tower
                  1st floor, <br />
                  silpa Layout,Gachibowli,Hyderabad - 500032
                </p>

                <p className="contact-page-location-hours">
                  Open daily · 10:30 AM – 07:00 PM
                </p>

                <a
                  href={headquartersLocation?.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-page-location-button"
                >
                  Get Directions
                </a>
              </div>

              {/* Map location */}
              <div className="contact-page-map">
                <iframe
                  className="contact-page-map-frame"
                  src={headquartersMapUrl}
                  title="Google Map showing the Chaiomi Office"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;
