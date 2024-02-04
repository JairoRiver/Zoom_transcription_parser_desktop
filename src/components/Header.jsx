import {Logo} from './Logo'

export default function Header() {
    return(
    <header className="px-1 mb-8 flex justify-start items-center">
        <Logo/>
        <h1 className='ml-2 text-2xl text-slate-800'><span className='text-sky-500'>Zoom</span>Transcript Parser</h1>
    </header>
    )
}