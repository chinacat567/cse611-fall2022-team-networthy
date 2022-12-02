import React from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WarningIcon from "@mui/icons-material/Warning";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import SelfImg from "../../assets/Images/Seth.png";

import "../../styles/aboutUs.scss";

const About = () => {
  return (
    <div className="aboutUs">
      <div className="aboutUs__one">About us</div>

      <div className="aboutUs__two aboutUs__two--inverse">
        <div className="heading">Services We Provide</div>
        <div className="wrapper">
          <div className="iconWrapper">
            <div className="iconWrapper__text">Individual Coaching</div>
            <PersonIcon className="iconWrapper__icon" />
          </div>
          <div className="iconWrapper">
            <div className="iconWrapper__text">Partner Coaching</div>
            <PeopleIcon className="iconWrapper__icon" />
          </div>
          <div className="iconWrapper">
            <div className="iconWrapper__text">Intimate Group Coaching</div>
            <GroupsIcon className="iconWrapper__icon" />
          </div>
          <div className="iconWrapper">
            <div className="iconWrapper__text">Coaching for Organizations</div>
            <BusinessIcon className="iconWrapper__icon" />
          </div>
        </div>
      </div>

      <div className="aboutUs__plain">
        <div className="heading">What Is a Financial Coach?</div>
        <p>
          A <i>“Financial Coach”</i> refers to a professional who works to
          understand a client’s current situation by:
          <ul>
            <li>
              Conducting empirical analysis of the client’s current finances
            </li>
            <li>Uncovers their goals and needs</li>
            <li>Defines clear objectives for the client</li>
            <li>Prioritize steps</li>
            <li>Provides education, guidance, and accountability</li>
            <li>
              Supports clients in working toward a state of financial wellness
              and security
            </li>
          </ul>
        </p>
        <p>
          Financial coaches don’t have affiliations with investment firms or
          other financial service firms, so they don’t provide biased opinions
          and recommendations. Instead, you’re paying for trusted financial
          support from a Goally coach who has your best interest as their
          priority. Our financial coaches work with clients to develop positive
          habits and behaviors that increase their financial well-being and
          motivate them to improve their finances.
        </p>
      </div>

      <div className="aboutUs__plain aboutUs__plain--inverse">
        <div className="heading">Financial Coaches Are NOT</div>
        <p>
          To best understand the definition of a financial coach, it is equally
          to understand what financial coaches are not.
          <ul>
            <li>
              Coaches are not a therapeutic relationship or crisis management
              service
            </li>
            <li>
              Coaches are not investment advisors and should avoid providing
              investment advice to remain compliant with the SEC’s regulatory
              requirements
            </li>
          </ul>
        </p>
      </div>

      <div className="aboutUs__two">
        <div className="heading">How Do Financial Coaches Support You</div>
        <div className="wrapper">
          <div className="iconWrapper">
            <div className="iconWrapper__text">
              Achieve client-defined goals
            </div>
            <EmojiEventsIcon className="iconWrapper__icon" />
          </div>
          <div className="iconWrapper">
            <div className="iconWrapper__text">Address immediate issues</div>
            <WarningIcon className="iconWrapper__icon" />
          </div>
          <div className="iconWrapper">
            <div className="iconWrapper__text">
              Improve financial situations
            </div>
            <SignalCellularAltIcon className="iconWrapper__icon" />
          </div>
          <div className="iconWrapper">
            <div className="iconWrapper__text">Change financial behaviors</div>
            <ChangeCircleIcon className="iconWrapper__icon" />
          </div>
          <div className="iconWrapper">
            <div className="iconWrapper__text">Facilitate decision-making</div>
            <ManageAccountsIcon className="iconWrapper__icon" />
          </div>
          <div className="iconWrapper">
            <div className="iconWrapper__text">Provide tools and resources</div>
            <LibraryBooksIcon className="iconWrapper__icon" />
          </div>
        </div>
      </div>

      <div className="aboutUs__plain aboutUs__plain--inverse">
        <div className="heading">Who Should Work With Financial Coaches</div>
        <p>
          <i>Anyone!!</i> - because financial coaches can help you in any
          situation.
        </p>
        <br />
        <p>
          Are you on the <i>defensive</i> with your money?
          <ul>
            <li>Struggling to pay your bills</li>
            <li>Living paycheck to paycheck</li>
            <li>Owe too much money in student loans or credit card debt</li>
            <li>Having Money fights with your significant other</li>
            <li>Need a budget that you can stick too</li>
            <li>
              Feel overwhelmed by money and want to stop worrying about your
              financial future
            </li>
          </ul>
        </p>
        <div className="heading" style={{ margin: "20px" }}>
          or
        </div>
        <p>
          Are you on the <i>offensive</i> with your money?
          <ul>
            <li>Earning money but don’t know what to do with it</li>
            <li>Want to begin saving for your dream home</li>
            <li>Want to begin investing for your retirement</li>
            <li>
              Need a personalized plan based on your situation, not a
              cookie-cutter solution
            </li>
            <li>Want to stop working one day but still have money coming in</li>
            <li>
              Eager to learn about personal finance and ready to take action
              into your own hands
            </li>
          </ul>
        </p>
        <p>
          The path to wealth is possible for everyone, but people naturally
          struggle because they don’t have anyone they trust and can turn to for
          support. With your Goally Coach, now you do.
        </p>
      </div>

      <div className="aboutUs__plain">
        <div className="heading">Skills that coaches possess</div>
        <p>
          <ul>
            <li>Coaching & Consultation</li>
            <li>Personal Finance Content</li>
            <li>Financial & Consumer Protection</li>
            <li>Counseling & Psychology</li>
            <li>Behavioral Finance</li>
            <li>Financial Education Methodologies</li>
            <li>Defined Standards & Ethical Responsibilities</li>
            <li>Clear Processes & Practice Standards</li>
          </ul>
        </p>
      </div>

      <div className="aboutUs__plain aboutUs__plain--inverse">
        <div className="heading">Payments</div>
        <p>
          <b>
            <i>How do I pay for a coach if I’m broke?</i>
          </b>
        </p>
        <p>
          The question you should be asking yourself is, Can I afford not to get
          help from a coach? Coaches help you put money back into your pocket,
          not take it out. In addition, working with a financial coach helps you
          develop and maintain healthy money habits. There is no better way to
          permanently establish and improve your financial habits than working
          with a financial coach.
        </p>
        <br />
        <p>
          <b>
            <i>How much does a coach cost?</i>
          </b>
        </p>
        <p>
          Every coach charges a different fee based on their level of
          experience. However, every coach offers a free consultation session.
          In this consultation session, coaches will ask questions to get to
          know you better. In addition, they aim to understand your goals and
          past and current pain points to assess whether you are a good fit for
          them.
        </p>
      </div>

      <div className="aboutUs__plain">
        <div className="heading">
          What is my Why?: We are on a mission to help YOU
        </div>
        <div className="profilePhoto">
          <img src={SelfImg} />
        </div>
        <p>
          My name is Seth Blum, Founder of Goally, and I am passionate about
          personal finance and empowering others. I am a Certified Personal
          Finance Wellness Consultant and have my MBA in Finance and Consulting.
        </p>
        <br />
        <p>
          However, before that, I was in your position with poor financial
          habits, lacking basic financial knowledge, and no access to a trusted
          financial coach that could have supported and guided me in my
          decision-making. I was looking at $100k+ in student loan debt when I
          made my undergraduate college decision based on emotions with no
          understanding of the financial mess I was putting myself in. When I
          learned more about personal finance, I understood the weight of my
          mistake and made it my mission to help others avoid major financial
          mistakes. I am on a mission to educate, support, and empower other
          ambitious people like myself. Together we can embark on our journeys
          toward financial freedom.
        </p>
        <br />
        <p>+1 (716)-481-4091 </p>
        <p>
          <a href="https://www.linkedin.com/in/siblum/">LinkedIn</a>
        </p>
      </div>
    </div>
  );
};

export default About;
