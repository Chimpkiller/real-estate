import Navbar from "../components/navbar";
import '../app/styles/base.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="root">

        <Navbar/>
        <main id="main-container">
          {children}
        </main>
        </body>
    </html>
  );
}