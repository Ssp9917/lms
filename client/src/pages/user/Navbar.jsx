import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuthContext } from '@/context/AuthContext'
import DarkMode from '@/Darkmode'
import { School } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const {authUser} = useAuthContext()

    console.log(authUser)

    const navigate = useNavigate()

    const logoutHandler = () => {

    }

    return (
        <div className='h-16 bg-background border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            {/* desktop */}
            <div className='max-w-7xl hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <Link to='/'>
                        <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
                    </Link>
                </div>

                {/* User icons and dark mode icon */}
                <div className='flex items-center gap-8'>
                    {
                        authUser? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={authUser?.photoUrl || "https://github.com/shadcn.png"} alt='@shadcn' />
                                        <AvatarFallback />
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link to="my-learning">My learning</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            {" "}
                                            <Link to="profile">Edit Profile</Link>{" "}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={logoutHandler}>
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    {authUser?.role === "instructor" && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="outline" onClick={() => navigate("/login")}>
                                    Login
                                </Button>
                                <Button variant="outline" onClick={() => navigate("/login")}>Signup</Button>
                            </div>
                        )
                    }

                    <DarkMode />

                </div>

            </div>
        </div>
    )
}

export default Navbar