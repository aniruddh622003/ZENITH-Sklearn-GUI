import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        height: "70px",
        backgroundColor: "green",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="https://github.com/aniruddh622003/major-1" target="_blank" rel="noopener noreferrer" style={{ borderRadius: '50%', backgroundColor: 'white', padding: '0.5rem', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FaGithub size={24} color="green" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
