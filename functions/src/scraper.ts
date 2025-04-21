import axios from 'axios';
import * as cheerio from 'cheerio';

export interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
}

export const scrapeJobs = async (jobTitle: string, location = ''): Promise<Job[]> => {
  const query = encodeURIComponent(jobTitle);
  const loc = encodeURIComponent(location);
  const url = `https://www.indeed.com/jobs?q=${query}&l=${loc}`;

  const { data: html } = await axios.get<string>(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  });

  const $ = cheerio.load(html);
  const jobs: Job[] = [];

  $('.job_seen_beacon').each((_, el) => {
    const title = $(el).find('h2.jobTitle span').text().trim();
    const company = $(el).find('.companyName').text().trim();
    const jobLocation = $(el).find('.companyLocation').text().trim();
    const relativeLink = $(el).find('a').attr('href');
    const link = relativeLink ? `https://www.indeed.com${relativeLink}` : '';

    if (title && company) {
      jobs.push({ title, company, location: jobLocation, link });
    }
  });

  return jobs;
};
