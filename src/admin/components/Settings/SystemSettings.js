import React, { useState } from "react";
import "./SystemSettings.css";

const SystemSettings = () => {
  const [siteTitle, setSiteTitle] = useState("My Website");
  const [theme, setTheme] = useState("light");
  const [logoUrl, setLogoUrl] = useState("");

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      alert("File size should not exceed 1MB.");
      return;
    }

    // Validate file type (only jpg, jpeg, png)
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, and PNG formats are allowed.");
      return;
    }

    // If valid, set file to state (for preview)
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoUrl(reader.result); // Show preview before upload
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    console.log("Saving settings:", { siteTitle, theme, logoUrl });
  };

  return (
    <div className="system-settings">
      <h2>System Settings</h2>

      <label>Site Title:</label>
      <input
        type="text"
        value={siteTitle}
        onChange={(e) => setSiteTitle(e.target.value)}
      />

      <label>Theme:</label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <label>Logo:</label>
      <input type="file" accept="image/*" onChange={handleLogoUpload} />
      {logoUrl && (
        <img src={logoUrl} alt="Logo Preview" className="preview-logo" />
      )}

      <button onClick={handleSave} className="save-btn">
        Save Changes
      </button>
    </div>
  );
};

export default SystemSettings;
