import Header from './Header.jsx';
import HomePage from './HomePage.jsx';
import Footer from './Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}
