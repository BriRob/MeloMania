import linkedIn from "../../images/linkedInIcon.png";
import github from "../../images/githubIcon.svg";

function Footer() {
  return (
    <footer>
      {/* FOOTER */}
      <div>
        <div className="builtWith">
          <span>React</span>
          <span>Redux</span>
          <span>Express</span>
          <span>Javascript</span>
          <span>HTML5</span>
          <span>CSS</span>
          {/* <span>React</span> */}
          <span>PostgresSQL</span>
        </div>
        <hr className="hrForFooter"></hr>
        <div className="me">Briana Robinson</div>
        <div className="iconContainer">
        <a href="https://www.linkedin.com/in/briana-robinson-083355104/">
          <img className="footerIcons" src={linkedIn}></img>
        </a>
        <a href="https://github.com/BriRob">
          <img className="footerIcons" src={github}></img>
        </a>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
