// const Footer = () => {
//   return (
//     <footer style={{ height: '60px', backgroundColor: 'green', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
//         Copyright 2023
//     </footer>
//   )
// }

// export default Footer

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ height: '70px', backgroundColor: 'green', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ borderRadius: '50%', backgroundColor: 'white', padding: '0.5rem', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FaFacebook size={24} color="green" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ borderRadius: '50%', backgroundColor: 'white', padding: '0.5rem', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FaTwitter size={24} color="green" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ borderRadius: '50%', backgroundColor: 'white', padding: '0.5rem', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FaInstagram size={24} color="green" />
        </a>
      </div>
    </footer>
  )
}

export default Footer