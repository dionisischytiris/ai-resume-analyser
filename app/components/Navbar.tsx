import {Link} from 'react-router';
import {usePuterStore} from "~/lib/puter";

const Navbar = () => {
    const {auth} = usePuterStore()
    const theme = usePuterStore(state => state.theme)
    const toggleTheme = usePuterStore(state => state.toggleTheme);

    const handleLogout = async () => {
        await auth.signOut()
    }

    return (
        <section>
            <nav className="navbar">
                <Link to="/"
                      className='ml-10 sm:ml-0 bg-blue-100/10 w-30 xl:w-36 h-10 flex items-center justify-center rounded-full'>
                    <p className="text-md md:text-lg lg:text-xl font-bold text-gradient">FitCheck</p>
                </Link>
                <button onClick={toggleTheme}
                        className="theme-toggle px-4 py-2 border rounded transition-colors hidden md:block"
                >
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
                <button onClick={toggleTheme}
                        className="theme-toggle px-4 py-2  block md:hidden"
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <Link to="/upload" className="primary-button  w-fit mr-6 sm:mr-0">
                    <p className='text-md xl:text-lg'>Upload Resume</p>
                </Link>
            </nav>
            <button onClick={handleLogout}
                    className="absolute top-15 right-10 hidden lg:block">
                <p>LogOut</p>
            </button>

        </section>
    )
};

export default Navbar;
