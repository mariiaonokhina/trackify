import ApplyResourceSidebar from '../components/ApplyResourceSidebar';
import "../styles/ApplyResourcePage.css";
  
function ApplyResourcePage() {
    return (
        <div className="page-container">
        <ApplyResourceSidebar />
  
            <div className="main-content">
                <section id="apply" className="odd-content-section">
                    <h3 className="section-title">Apply</h3>
                </section>

                <section id="resources" className="even-content-section">
                    <h3 className="section-title">Resources</h3>
                    <ul>
                    <li><h4>Technical Practice:</h4>
                        <ul>
                        <li><button onClick={() => window.open("https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/", "_blank")}>Cracking The Coding Interview</button></li>
                        <li><button onClick={() => window.open("https://medium.freecodecamp.org/10-common-data-structures-explained-with-videos-exercises-aaff6c06fb2b", "_blank")}>Common Data Structures Explained</button></li>
                        <li><button onClick={() => window.open("https://www.bigocheatsheet.com/", "_blank")}>Big-O Cheat Sheet</button></li>
                        <li><button onClick={() => window.open("http://www.leetcode.com", "_blank")}>LeetCode</button></li>
                        <li><button onClick={() => window.open("http://hackerrank.com", "_blank")}>HackerRank</button></li>
                        <li><button onClick={() => window.open("http://codewars.com", "_blank")}>Codewars</button></li>
                        <li><button onClick={() => window.open("http://projecteuler.net", "_blank")}>Project Euler</button></li>
                        </ul>
                    </li>

                    <li><h4>Other Programs:</h4>
                        <ul>
                        <li><button onClick={() => window.open("https://www.breakthroughtech.org/where-we-work/new-york/", "_blank")}>Breakthrough Tech</button></li>
                        <li><button onClick={() => window.open("https://www.codepath.org/courses", "_blank")}>CodePath</button></li>
                        <li><button onClick={() => window.open("https://www.projectbasta.com/fellowship", "_blank")}>Project Basta</button></li>
                        <li><button onClick={() => window.open("http://coopcareers.org/", "_blank")}>COOP Careers</button></li>
                        <li><button onClick={() => window.open("https://www.npower.org/apply/student-faq/", "_blank")}>NPower</button></li>
                        <li><button onClick={() => window.open("http://www.theknowledgehouse.org/", "_blank")}>The Knowledge House</button></li>
                        <li><button onClick={() => window.open("https://www.recurse.com/", "_blank")}>The Recurse Center</button></li>
                        <li><button onClick={() => window.open("https://emergentworks.org/programs", "_blank")}>Emergent Works</button></li>
                        <li><button onClick={() => window.open("https://changefoodforgood.org/program-registration", "_blank")}>Change Food for Good</button></li>
                        <li><button onClick={() => window.open("https://www.bloomtech.com/", "_blank")}>Bloom Institute of Technology</button></li>
                        <li><button onClick={() => window.open("https://nyu-mll.github.io/nyu-ai-school-2024/", "_blank")}>NYU AI School 2024</button></li>
                        <li><button onClick={() => window.open("https://www.builtinnyc.com/articles/where-learn-code-free-nyc", "_blank")}>Where to Learn to Code for Free (NYC)</button></li>
                        </ul>
                    </li>

                    <li><h4>Job Search:</h4>
                        <ul>
                        <li><button onClick={() => window.open("http://linkedin.com/jobs", "_blank")}>LinkedIn</button></li>
                        <li><button onClick={() => window.open("https://www.builtinnyc.com/jobs", "_blank")}>Built In NYC (NYC startups + salaries)</button></li>
                        <li><button onClick={() => window.open("https://www.techjobsforgood.com/", "_blank")}>Tech Jobs for Good (civic tech)</button></li>
                        <li><button onClick={() => window.open("https://www.progressivedatajobs.org/job-postings/", "_blank")}>Progressive Data Jobs (civic tech)</button></li>
                        <li><button onClick={() => window.open("https://www.all-hands.us/", "_blank")}>All Hands (submit resume)</button></li>
                        <li><button onClick={() => window.open("http://Dice.com", "_blank")}>Dice.com</button></li>
                        <li><button onClick={() => window.open("https://www.keyvalues.com/", "_blank")}>Key Values (Find engineering teams that share your values)</button></li>
                        <li><button onClick={() => window.open("https://ripplematch.com/index?r=Adnp2S", "_blank")}>RippleMatch</button></li>
                        <li><button onClick={() => window.open("https://technyc.getro.com/jobs", "_blank")}>Tech NYC</button></li>
                        <li><button onClick={() => window.open("https://www.brittanybennett.com/resources", "_blank")}>Data Resources, Brittany Bennett</button></li>
                        </ul>
                    </li>

                    <li><h4>Tech Events:</h4>
                        <ul>
                        <li><button onClick={() => window.open("https://mlh.io/", "_blank")}>Major League Hacking</button></li>
                        <li><button onClick={() => window.open("https://www.builtinnyc.com/events", "_blank")}>Built in NYC Events</button></li>
                        <li><button onClick={() => window.open("http://Eventbrite.com", "_blank")}>Eventbrite</button></li>
                        </ul>
                    </li>
                    </ul>
                </section>
            </div>
        </div>
    );
  };

export default ApplyResourcePage;