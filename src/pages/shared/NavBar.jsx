import React, { useState } from "react";

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        closeMobileMenu();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        closeMobileMenu();
    };

    return (
        <div className=" bg-gray-300">
            <div className="navbar max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8 relative">
                {/* Left - Logo + Mobile Menu */}
                <div className="navbar-start">

                    {/* Modern Mobile Menu Button */}
                    <button
                        className="btn btn-ghost btn-circle lg:hidden"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <a className="text-xl font-bold ml-2 lg:ml-0">
                        <p className="text-2xl font-serif font-bold text-white tracking-wide">
                            Ziaul<span className="text-yellow-500">.dev</span>
                        </p>
                    </a>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-medium">
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                        <li><a>Contact</a></li>
                        <li><a>Dashboard</a></li>
                    </ul>
                </div>

                {/* Right - Always visible on all devices */}
                <div className="navbar-end gap-2">

                    {/* Desktop Search */}
                    <div className="hidden lg:block">
                        <input type="text" placeholder="Search..."
                            className="input input-bordered input-sm w-40" />
                    </div>

                    {/* If NOT Logged-In - Always visible on navbar */}
                    {!isLoggedIn && (
                        <>
                            <button className="btn btn-outline btn-sm">Sign In</button>
                            <button className="btn btn-primary btn-sm">Register</button>
                        </>
                    )}

                    {/* If Logged-In - Profile picture always visible on navbar */}
                    {isLoggedIn && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User Profile"
                                        src="https://i.pravatar.cc/150?img=3"
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 mt-3 p-2 shadow z-50">
                                <li><a>Profile</a></li>
                                <li><a>Settings</a></li>
                                <li><a onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Modern Mobile Sidebar Overlay */}
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <div
                            className="fixed inset-0 bg-gray-400/80 bg-opacity-50 z-40 lg:hidden"
                            onClick={closeMobileMenu}
                        ></div>

                        {/* Sidebar */}
                        <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden">

                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <p className="text-2xl font-serif font-bold text-gray-600">
                                    Ziaul<span className="text-yellow-500">.dev</span>
                                </p>
                                <button
                                    onClick={closeMobileMenu}
                                    className="btn btn-ghost btn-circle btn-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="p-4 space-y-2">
                                <a className="block py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium">Home</a>
                                <a className="block py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium">About</a>
                                <a className="block py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium">Contact</a>
                                <a className="block py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium">Dashboard</a>
                            </div>

                            {/* Search Bar */}
                            <div className="p-4 border-t">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* User Info Section in Sidebar */}
                            {isLoggedIn && (
                                <div className="p-4 border-t">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img
                                                alt="User Profile"
                                                src="https://i.pravatar.cc/150?img=3"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold">John Doe</p>
                                            <p className="text-sm text-gray-600">john@example.com</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <a className="block py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">Profile</a>
                                        <a className="block py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">Settings</a>
                                        <a
                                            className="block py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors text-red-600"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t text-center text-sm text-gray-500">
                                <p>© {new Date().getFullYear()} - All right reserved by Ziaul.Dev</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default NavBar;