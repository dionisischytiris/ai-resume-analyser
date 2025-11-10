import {Link} from 'react-router';
import {usePuterStore} from "~/lib/puter";

const Navbar = () => {
    const theme = usePuterStore(state => state.theme)
    const toggleTheme = usePuterStore(state => state.toggleTheme);

    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-xl sm:text-2xl font-bold text-gradient">RESUMIND</p>
            </Link>
            <button onClick={toggleTheme}
                    className="theme-toggle px-4 py-2 border rounded transition-colors"
            >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
            <Link to="/upload" className="primary-button w-fit">
                Upload Resume
            </Link>
        </nav>
    )
};

export default Navbar;
