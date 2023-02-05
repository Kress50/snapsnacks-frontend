import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="sticky top-[100vh] w-full border-t p-2 text-sm">
      <div className="mx-auto flex w-full max-w-7xl justify-between">
        <div className="flex gap-2">
          <span>Made by Kress50</span>
          <a href="https://github.com/Kress50" className="link">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
        <span>
          This is a React study project and not a real production site
        </span>
      </div>
    </div>
  );
};

export default Footer;
