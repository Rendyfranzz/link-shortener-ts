import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from 'next-themes';


export const Header = () => {
    const { theme, setTheme } = useTheme();
    return (
            <div className='border-b-2 rounded-lg text-bold md:text-xl flex flex-row items-center w-screen justify-between fixed top-0 p-2'>
                <div>
                    <p className='h1 text-cyan-400'>Link Shortener</p>
                </div>
                <div>
                <button className='transition-all duration-300 p-2' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme === 'light' ? <FaMoon size={40} /> : <FaSun size={40} />}
                </button>
                </div>
                
            </div>
    )
}
