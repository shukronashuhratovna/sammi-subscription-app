import Image from "next/image"
import { AiOutlineUser } from 'react-icons/ai'
import { CiSearch, CiLogout } from 'react-icons/ci'
import { BsBell } from 'react-icons/bs'
import Link from "next/link"
import { useEffect, useState, useContext } from "react"
import { useAuth } from "src/hooks/useAuth"
import NavMenu from "../nav-menu/nav-menu"

const Header = () => {
    const [scrolled, setScrolled] = useState(false)
    const { logout } = useAuth()
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


    return (
        <header className={`${scrolled && 'bg-[#E10856] shadow-lg'}`} >
            <div className="flex items-center space-x-2 md:space-x-16">
                <Image src={'/logo.svg'} width={56} height={56} alt="logo" className="cursor-pointer object-contain" />
                <NavMenu />
                <ul className="space-x-4 md:flex hidden">
                    <li className="navLinks">Home</li>
                    <li className="navLinks">Movies</li>
                    <li className="navLinks">TV Shows</li>
                    <li className="navLinks">New</li>
                    <li className="navLinks">Popular</li>
                </ul>
            </div>
            <div className="flex items-center space-x-4 text-sm font-light">
                <CiSearch className="h-6 w-6 cursor-pointer" />
                <p className="hidden lg:inline">Kids</p>
                <BsBell className="h-6 w-6 cursor-pointer" />
                <Link href={'/account'}>
                    <AiOutlineUser className="h-6 w-6 cursor-pointer" />
                </Link>
                <CiLogout className="h-6 w-6 cursor-pointer" onClick={logout} />
            </div>
        </header >
    )
}

export default Header