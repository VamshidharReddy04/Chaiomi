import { ArrowRight, Briefcase, MapPin, Upload } from "lucide-react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { submitApplication } from "../Services/applicationService";
import { openingPositions } from "../data/openingPositions";
import "../StylePages/careers.css";

const emptyApplicationForm = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  previousCtc: "",
  expectedCtc: "",
  noticePeriod: "",
  coverLetter: "",
};

// Careers Page Component
function Careers() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState(emptyApplicationForm);
  const [resumeFile, setResumeFile] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Opens the application form for the selected role and resets any previous status messages.
  const openApplication = (role) => {
    setSelectedRole(role);
    setFormData(emptyApplicationForm);
    setResumeFile(null);
    setStatus({ type: "", message: "" });
  };
  const closeApplication = () => {
    setSelectedRole(null);
  };

  // Handles changes to the application form fields and updates the formData state accordingly.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  // Handles File input changes
  const handleFileChange = (event) => {
    setResumeFile(event.target.files?.[0] ?? null);
  };

  // Handles the submission of the application form, sending the data to the backend and managing success or error states.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!resumeFile) {
      setStatus({
        type: "error",
        message: "Please upload your resume.",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const submission = new FormData();
      submission.append("role", selectedRole.title);
      Object.entries(formData).forEach(([key, value]) => {
        submission.append(key, value);
      });
      submission.append("resume", resumeFile);

      await submitApplication(submission);
      setStatus({
        type: "success",
        message: "Your application has been submitted successfully!",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "We could not submit your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="careers-hero">
          <div className="careers-hero-inner">
            <p className="careers-title">Careers at Chaiomi</p>
            <h1 className="careers-heading">
              Build the future of beverages with us.
            </h1>
            <p className="careers-lead">
              Join a team combining robotics, software, and hospitality to
              create more personal beverage experiences.
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section className="careers-roles">
          <div className="careers-roles-inner">
            <div className="careers-roles-header">
              <h2 className="careers-roles-title">Open positions</h2>
              <p className="careers-roles-text">
                Explore opportunities to help shape the next Chaiomi experience.
              </p>
            </div>

            {/* Application Form with fields for each role */}
            <div className="careers-list">
              {openingPositions.map((role) => (
                <article key={role.title} className="careers-card">
                  <div className="careers-card-row">
                    <div>
                      <div className="careers-card-heading">
                        <Briefcase
                          className="careers-card-icon"
                          aria-hidden="true"
                        />
                        <h3 className="careers-card-title">{role.title}</h3>
                      </div>
                      <div className="careers-card-meta">
                        <span>{role.type}</span>
                        <span className="careers-card-meta-item">
                          <MapPin size={15} aria-hidden="true" />
                          {role.location}
                        </span>
                        <span>{role.experience} experience</span>
                      </div>
                      <p className="careers-card-description">{role.summary}</p>
                    </div>
                    {/* Application Button */}
                    <button
                      type="button"
                      onClick={() => openApplication(role)}
                      className="careers-apply-button"
                    >
                      Apply now
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Application Form Modal */}
      {selectedRole && (
        <div className="careers-modal-overlay" onClick={closeApplication}>
          <div
            className="careers-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="careers-modal-header">
              <div>
                <p className="careers-modal-eyebrow">
                  {selectedRole.type} . {selectedRole.location}
                </p>
                <h2 className="careers-modal-title">{selectedRole.title}</h2>
                <p className="careers-modal-subtitle">
                  {selectedRole.experience} experience
                </p>
              </div>
              <button
                type="button"
                onClick={closeApplication}
                aria-label="Close application form"
                className="careers-modal-close"
              >
                ×
              </button>
            </div>
            <p className="careers-modal-summary">{selectedRole.description}</p>
            <div className="careers-modal-block">
              <h3 className="careers-modal-heading">
                Responsibilities and Skills Required
              </h3>
              <p className="careers-modal-text">
                What you will be doing in this role.
              </p>
              <ul className="careers-skill-list">
                {selectedRole.skills.map((skill) => (
                  <li
                    key={skill}
                    size={16}
                    className="careers-skill-item"
                    aria-hidden="true"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <hr className="careers-divider" />
            <h3 className="careers-form-title">Apply for this role</h3>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="careers-form">
              <div className="careers-form-grid">
                <div className="careers-form-full">
                  <h3 className="careers-form-heading">Personal Information</h3>
                  <p className="careers-form-note">
                    Please provide your details to apply for this position.
                  </p>
                </div>
                <label className="careers-field">
                  <span className="careers-field-label">Full Name</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your Full name"
                    required
                    className="careers-input"
                  />
                </label>

                <label className="careers-field">
                  <span className="careers-field-label">Email Address</span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="careers-input"
                  />
                </label>
                <label className="careers-field">
                  <span className="careers-field-label">Phone Number</span>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                    className="careers-input"
                  />
                </label>
                <label className="careers-field">
                  <span className="careers-field-label">Experience</span>
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Experience (e.g., 2 years)"
                    required
                    className="careers-input"
                  />
                </label>
                <label className="careers-field">
                  <span className="careers-field-label">Previous CTC</span>
                  <input
                    name="previousCtc"
                    value={formData.previousCtc}
                    onChange={handleChange}
                    placeholder="Previous CTC (e.g., 5 LPA)"
                    required
                    className="careers-input"
                  />
                </label>

                <label className="careers-field">
                  <span className="careers-field-label">Expected CTC</span>
                  <input
                    name="expectedCtc"
                    value={formData.expectedCtc}
                    onChange={handleChange}
                    placeholder="Expected CTC (e.g., 7 LPA)"
                    required
                    className="careers-input"
                  />
                </label>
                <label className="careers-field">
                  <span className="careers-field-label">
                    Notice Period in Days
                  </span>
                  <input
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleChange}
                    placeholder="Notice period (e.g., 1 month)"
                    required
                    className="careers-input"
                  />
                </label>
              </div>
              <label className="careers-file-label">
                <Upload size={16} aria-hidden="true" />
                <span className="careers-file-name">
                  {resumeFile
                    ? resumeFile.name
                    : "Upload your resume (PDF, Word or DOCX format)"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="careers-file-input"
                />
              </label>
              <p className="careers-file-hint">
                Accepted formats: PDF, DOC, DOCX. Max file size: 5MB.
              </p>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Cover letter (optional)"
                rows={5}
                className="careers-textarea"
              />
              {status.message && (
                <p
                  role={status.type === "error" ? "alert" : "status"}
                  className={
                    status.type === "error"
                      ? "careers-status careers-status--error"
                      : "careers-status careers-status--success"
                  }
                >
                  {status.message}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="careers-submit"
              >
                {isSubmitting ? "Submitting..." : "Submit application"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Footer */}
      <Footer />
    </>
  );
}
export default Careers;
