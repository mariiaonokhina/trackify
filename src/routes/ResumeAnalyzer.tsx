import React, { useState, useRef, useEffect } from 'react';
import '../styles/ResumeAnalyzer.css';
import * as pdfjsLib from 'pdfjs-dist';

// Set the workerSrc for pdfjs-dist to a local file
const setupPDFJSWorker = () => {
  // Point to the pdf.worker.js file in the public folder
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
};

const API_KEY = import.meta.env.VITE_GROK_API_KEY;
const API_URL = "https://api.x.ai/v1/chat/completions";
const MODEL = "grok-3-latest";

const ResumeAnalyzer: React.FC = () => {
  const [jobField, setJobField] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize PDF.js worker on component mount
  useEffect(() => {
    setupPDFJSWorker();
  }, []);

  const encodeImage = (fileContent: ArrayBuffer): string => {
    const base64String = btoa(
      new Uint8Array(fileContent).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    return base64String;
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(' ') + '\n';
      }
      return text;
    } catch (e) {
      throw new Error(`Error extracting text from PDF: ${e}. Please ensure the file is a valid PDF and try again. If the issue persists, convert the PDF to an image (PNG/JPEG) and upload again.`);
    }
  };

  const prepareFileData = async (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (['png', 'jpg', 'jpeg'].includes(fileExtension || '')) {
      const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
      const arrayBuffer = await file.arrayBuffer();
      const base64Data = encodeImage(arrayBuffer);
      return {
        type: 'image',
        content: {
          type: 'image_url',
          image_url: { url: `data:${mimeType};base64,${base64Data}` },
        },
      };
    } else if (fileExtension === 'pdf') {
      const pdfText = await extractTextFromPDF(file);
      if (!pdfText) {
        throw new Error('Could not extract text from PDF. Please ensure the file is a valid PDF and try again. If the issue persists, convert the PDF to an image (PNG/JPEG) and upload again.');
      }
      return {
        type: 'text',
        content: { type: 'text', text: pdfText },
      };
    } else {
      throw new Error('Unsupported file format. Please upload a file in PNG, JPEG, or PDF format.');
    }
  };

  const getScoreColorClass = (score: number): string => {
    if (score >= 0 && score <= 29) {
      return 'score-red';
    } else if (score >= 30 && score <= 59) {
      return 'score-orange';
    } else if (score >= 60 && score <= 79) {
      return 'score-yellow';
    } else if (score >= 80 && score <= 100) {
      return 'score-green';
    }
    return '';
  };

  const getScoreColor = (score: number): string => {
    if (score >= 0 && score <= 29) {
      return '#dc3545'; // Red
    } else if (score >= 30 && score <= 59) {
      return '#fd7e14'; // Orange
    } else if (score >= 60 && score <= 79) {
      return '#ffc107'; // Yellow
    } else if (score >= 80 && score <= 100) {
      return '#28a745'; // Green
    }
    return '#ccc'; // Default
  };

  const RingChart: React.FC<{ score: number; label: string }> = ({ score, label }) => {
    const radius = 40;
    const strokeWidth = 8;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="ring-chart">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#e0e0e0"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={getScoreColor(score)}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
          <text
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
            fontSize="16px"
            fill="#333"
          >
            {score}
          </text>
        </svg>
        <div className="ring-label">{label}</div>
      </div>
    );
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a resume.');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);
    setScore(null);

    try {
      const fileData = await prepareFileData(file);
      const prompt = `
        First, determine if the uploaded document is a resume. A resume should have a format that includes sections like education, work experience, skills, or similar career-related categories, typically 1-2 pages long. If the document is clearly not a resume (e.g., an academic paper with citations, a cover page with a title and abstract, a book excerpt, or an image that does not represent a resume), return the following JSON and do not proceed with further analysis:
        {
          "overallScore": 0,
          "kpis": {
            "resumeStructureScore": { "score": 0, "feedback": "Document is not a resume." },
            "jobRelevanceScore": { "score": 0, "feedback": "Document is not a resume." },
            "contentClarityScore": { "score": 0, "feedback": "Document is not a resume." },
            "keywordOptimizationScore": { "score": 0, "feedback": "Document is not a resume." },
            "impactOfAchievementsScore": { "score": 0, "feedback": "Document is not a resume." },
            "professionalPresentationScore": { "score": 0, "feedback": "Document is not a resume." }
          },
          "overallFeedback": "The uploaded document does not appear to be a resume. It looks like an academic paper, cover page, book, or unrelated image. Please upload a resume in PNG, JPEG, or PDF format.",
          "jobRecommendations": [],
          "improvements": ["Upload a resume document with sections like education, work experience, and skills."],
          "lengthTips": ""
        }

        If the document is a resume, proceed with the following analysis and return the results in this structured JSON format:
        {
          "overallScore": <number out of 100>,
          "kpis": {
            "resumeStructureScore": {
              "score": <number out of 100>,
              "feedback": "<detailed feedback on structure>"
            },
            "jobRelevanceScore": {
              "score": <number out of 100>,
              "feedback": "<detailed feedback on job relevance>"
            },
            "contentClarityScore": {
              "score": <number out of 100>,
              "feedback": "<detailed feedback on content clarity>"
            },
            "keywordOptimizationScore": {
              "score": <number out of 100>,
              "feedback": "<detailed feedback on keyword optimization>"
            },
            "impactOfAchievementsScore": {
              "score": <number out of 100>,
              "feedback": "<detailed feedback on achievements>"
            },
            "professionalPresentationScore": {
              "score": <number out of 100>,
              "feedback": "<detailed feedback on professional presentation>"
            }
          },
          "overallFeedback": "<general feedback on structure, content, and effectiveness>",
          "jobRecommendations": ["<job role 1>", "<job role 2>", "..."],
          "improvements": ["<improvement 1>", "<improvement 2>", "..."],
          "lengthTips": "<tips if resume is too long, otherwise empty string>"
        }

        Evaluate the resume based on the following KPIs:
        - Resume Structure Score: Measures organization and formatting (clear section headings, consistent formatting, logical flow, no formatting errors).
        - Job Relevance Score: Evaluates alignment with the job field and description (job-specific keywords, relevant experience, matching skills, tailored achievements).
        - Content Clarity Score: Assesses clarity and conciseness (action-oriented language, no vague terms, appropriate length, quantifiable achievements).
        - Keyword Optimization Score: Measures ATS and recruiter optimization (keyword frequency/placement, ATS compatibility, balanced keywords, relevant skills).
        - Impact of Achievements Score: Evaluates strength of accomplishments (quantifiable metrics, relevance, specificity, distribution across roles).
        - Professional Presentation Score: Assesses visual appeal and professionalism (no spelling/grammar errors, professional tone, visual appeal, consistent style).

        Be harsh in scoring. If the resume is completely unrelated to the job field (when provided), assign a Job Relevance Score below 30. Penalize heavily for lack of relevance, poor structure, missing key details, or generic content. A score above 80 in any KPI should only be given if the resume excels in that area (e.g., highly tailored for Job Relevance, error-free for Professional Presentation).

        The overallScore should be a weighted average of the KPI scores, with Job Relevance Score weighted at 40% and the other five KPIs at 12% each.

        If a job field ("${jobField || 'not provided'}") and/or job description ("${jobDescription || 'not provided'}") are provided, evaluate the resume's relevance specifically against them. If they are not provided, evaluate the resume in general without targeting a specific job, focusing on overall quality across the KPIs.
      `;

      const messages = [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            fileData.content,
          ],
        },
      ];

      const payload = {
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1500,
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to process the file (HTTP ${response.status}). Please ensure the file is a valid PNG, JPEG, or PDF and not corrupted. If the issue persists, try converting the file to a different format and uploading again.`);
      }

      const result = await response.json();
      const content = result.choices?.[0]?.message?.content;

      if (content) {
        try {
          const parsed = JSON.parse(content);
          setScore(parsed.overallScore);
          setResponse(parsed);
        } catch {
          setResponse({ rawContent: content });
        }
      } else {
        setError('No response received from API.');
      }
    } catch (e: any) {
      setError(`An error occurred: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (!['png', 'jpg', 'jpeg', 'pdf'].includes(fileExtension || '')) {
        setError('Unsupported file format. Please upload a file in PNG, JPEG, or PDF format.');
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  return (
    <div className="resume-analyzer">
      <div className="left-panel">
        <h2>Resume Analyzer</h2>
        <div className="form-group">
          <label htmlFor="jobField">Preferred Job Field (Optional)</label>
          <input
            type="text"
            id="jobField"
            value={jobField}
            onChange={(e) => setJobField(e.target.value)}
            placeholder="e.g., Software Engineering"
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description (Optional)</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resumeFile">Upload Resume (PNG, JPEG, PDF)</label>
          <input
            type="file"
            id="resumeFile"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            required
          />
        </div>
        <button className="analyze-resume-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="right-panel">
        {score !== null && (
          <div className={`score ${getScoreColorClass(score)}`}>
            Overall Resume Score: {score}/100
          </div>
        )}
        {response && response.kpis && (
          <div className="kpi-charts">
            <RingChart score={response.kpis.resumeStructureScore.score} label="Structure" />
            <RingChart score={response.kpis.jobRelevanceScore.score} label="Job Relevance" />
            <RingChart score={response.kpis.contentClarityScore.score} label="Content Clarity" />
            <RingChart score={response.kpis.keywordOptimizationScore.score} label="Keyword Optimization" />
            <RingChart score={response.kpis.impactOfAchievementsScore.score} label="Achievements Impact" />
            <RingChart score={response.kpis.professionalPresentationScore.score} label="Professional Presentation" />
          </div>
        )}
        {response && (
          <div className="response">
            <h3>Analysis Result</h3>
            {response.rawContent ? (
              <p className="raw-content">{response.rawContent}</p>
            ) : (
              <>
                {response.kpis && (
                  <>
                    {response.kpis.resumeStructureScore && (
                      <div className="section">
                        <h4>Resume Structure Score: {response.kpis.resumeStructureScore.score}/100</h4>
                        <p>{response.kpis.resumeStructureScore.feedback}</p>
                      </div>
                    )}
                    {response.kpis.jobRelevanceScore && (
                      <div className="section">
                        <h4>Job Relevance Score: {response.kpis.jobRelevanceScore.score}/100</h4>
                        <p>{response.kpis.jobRelevanceScore.feedback}</p>
                      </div>
                    )}
                    {response.kpis.contentClarityScore && (
                      <div className="section">
                        <h4>Content Clarity Score: {response.kpis.contentClarityScore.score}/100</h4>
                        <p>{response.kpis.contentClarityScore.feedback}</p>
                      </div>
                    )}
                    {response.kpis.keywordOptimizationScore && (
                      <div className="section">
                        <h4>Keyword Optimization Score: {response.kpis.keywordOptimizationScore.score}/100</h4>
                        <p>{response.kpis.keywordOptimizationScore.feedback}</p>
                      </div>
                    )}
                    {response.kpis.impactOfAchievementsScore && (
                      <div className="section">
                        <h4>Impact of Achievements Score: {response.kpis.impactOfAchievementsScore.score}/100</h4>
                        <p>{response.kpis.impactOfAchievementsScore.feedback}</p>
                      </div>
                    )}
                    {response.kpis.professionalPresentationScore && (
                      <div className="section">
                        <h4>Professional Presentation Score: {response.kpis.professionalPresentationScore.score}/100</h4>
                        <p>{response.kpis.professionalPresentationScore.feedback}</p>
                      </div>
                    )}
                  </>
                )}
                {response.overallFeedback && (
                  <div className="section">
                    <h4>Overall Feedback</h4>
                    <p>{response.overallFeedback}</p>
                  </div>
                )}
                {response.jobRecommendations && response.jobRecommendations.length > 0 && (
                  <div className="section">
                    <h4>Job Recommendations</h4>
                    <ul>
                      {response.jobRecommendations.map((job: string, index: number) => (
                        <li key={index}>{job}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {response.improvements && response.improvements.length > 0 && (
                  <div className="section">
                    <h4>Suggested Improvements</h4>
                    <ul>
                      {response.improvements.map((improvement: string, index: number) => (
                        <li key={index}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {response.lengthTips && response.lengthTips !== "" && (
                  <div className="section">
                    <h4>Tips to Shorten Resume</h4>
                    <p>{response.lengthTips}</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;