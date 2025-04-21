/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//import {onRequest} from "firebase-functions/v2/https";
//import * as logger from "firebase-functions/logger";
import { onRequest } from 'firebase-functions/v2/https';
import { scrapeJobs } from './scraper';

export const getJobs = onRequest(async (req, res) => {
  const jobTitle = (req.query.title as string) || 'software engineer';
  const location = (req.query.loc as string) || '';

  try {
    const jobs = await scrapeJobs(jobTitle, location);
    res.status(200).json({ jobs });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Scraper error:', err.message);
    res.status(500).json({ error: 'Failed to scrape jobs' });
  }
});
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
