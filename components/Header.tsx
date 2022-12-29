import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from 'next-themes';


export const Header = () => {
    const { theme, setTheme } = useTheme();
    return (
            <div className='text-bold md:text-xl absolute flex justify-center top-10 right-10 flex-col items-center'>
                <h1>Ganti Tema</h1>
                <button className='transition-all duration-300 p-2' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme === 'light' ? <FaMoon size={40} /> : <FaSun size={40} />}
                </button>
            </div>
    )
}
