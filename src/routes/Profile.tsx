import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../styles/index.css";
import "../styles/Profile.css";

const MAX_BYTES = 100 * 1024;
const NOTE_TEXT = "PDF • 1 page • ≤ 100 KB";

export default function Profile() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [resumeURL, setResumeURL] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [uploadState, setUploadState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);

  /*  Load resume blob if it exists */
  useEffect(() => {
    if (!user) return;
    const uid = user.uid;
    getDoc(doc(db, "users", uid)).then((snap) => {
      const data = snap.data();
      if (!data?.resumeBlob) return;

      const uint8 = new Uint8Array(Object.values(data.resumeBlob));
      const blob = new Blob([uint8], { type: "application/pdf" });
      setResumeURL(URL.createObjectURL(blob));
    });
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setUploadState({ status: "idle", message: "" });
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    /* Size check */
    if (file.size > MAX_BYTES) {
      setUploadState({
        status: "error",
        message: `File too large (${(file.size / 1024).toFixed(
          0
        )} KB). Max is 100 KB.`,
      });
      return;
    }

    try {
      setUploadState({ status: "loading", message: "Uploading…" });

      const buffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(buffer);

      await setDoc(
        doc(db, "users", user.uid),
        { resumeBlob: Array.from(uint8) },
        { merge: true }
      );

      setResumeURL(URL.createObjectURL(new Blob([uint8], { type: "application/pdf" })));
      setUploadState({ status: "success", message: "Resume uploaded successfully ✔" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setUploadState({
        status: "error",
        message: "Upload failed. Please try again.",
      });
    }
  };

  if (user === undefined) return <div className="profile-container">Loading…</div>;
  if (!user)
    return (
      <div className="profile-container">
        <h2>You are not logged in.</h2>
      </div>
    );

  return (
    <div className="profile-container">
      <h1>Profile</h1>

      {/* basic info */}
      <div className="profile-card">
        <img src="/user-solid.svg" alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.displayName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>

      {/* resume section */}
      <div className="resume-section">
        <h2>Resume</h2>
        <p className="note-text">{NOTE_TEXT}</p>

        {resumeURL ? (
          <p>
            <a href={resumeURL} target="_blank" rel="noopener noreferrer">
              View Uploaded Resume
            </a>
          </p>
        ) : (
          <p>No resume uploaded.</p>
        )}

        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button
          className="button"
          onClick={handleUpload}
          disabled={!file || uploadState.status === "loading"}
        >
          {uploadState.status === "loading" ? "Uploading…" : "Upload Resume"}
        </button>

        {uploadState.status === "success" && (
          <p className="status-success">{uploadState.message}</p>
        )}
        {uploadState.status === "error" && (
          <p className="status-error">{uploadState.message}</p>
        )}
      </div>
    </div>
  );
}
