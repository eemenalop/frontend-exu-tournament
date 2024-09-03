import { useEffect, useState } from 'react'
import { Disclosure, DisclosureButton, Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { socialNavigation } from '../socialNavigation.jsx'
import { fetchTeamData } from '../teamData.js'

const navigation = [
    { name: 'Inicio', href: '/', current: false },
    { name: 'Equipos', href: '#', current: false, hasSubmenu: true },
    { name: 'Estadisticas', href: '/GeneralStats', current: false },
    { name: 'Historia', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showTeamsSubmenu, setShowTeamsSubmenu] = useState(false);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const loadTeams = async () => {
            const teamsData = await fetchTeamData();
            setTeams(teamsData);
        };
        loadTeams();
    }, []);



    const toggleTeamsSubmenu = () => {
        setShowTeamsSubmenu(!showTeamsSubmenu);
    };

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Botón del menú móvil */}
                            <DisclosureButton
                                onClick={() => setSidebarOpen(true)}
                                className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            >
                                <span className="sr-only">Abrir menú principal</span>
                                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Link to='/'
                                    className='pointer'>
                                    <img
                                        alt="Exuitesa Basketball logo"
                                        src="https://ulznkxovycorqeblrjxk.supabase.co/storage/v1/object/public/team-logos/exuitesa-logo.webp?t=2024-09-02T16%3A10%3A44.000Z"
                                        className="h-10 w-auto"
                                    />
                                </Link>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (item.name === 'Equipos' ? (
                                        <div
                                            key={item.name}
                                            className="relative group"
                                            onMouseEnter={() => setShowTeamsSubmenu(true)}
                                            onMouseLeave={() => setShowTeamsSubmenu(false)}
                                        >
                                            <Link
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium flex items-center'
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                            <div
                                                className={classNames(
                                                    'absolute left-0 w-64 bg-gray-700 text-white rounded-md shadow-lg transition-all duration-500 ease-in-out transform z-50',
                                                    showTeamsSubmenu ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
                                                )}
                                            >
                                                {showTeamsSubmenu && (
                                                    <ul>
                                                        {teams.map((team) => (

                                                            <li key={team.team_id}>
                                                                <Link
                                                                    to={`/team/${team.team_id}`}
                                                                    className="flex items-center p-3 hover:bg-gray-600 rounded-md text-sm"
                                                                >
                                                                    <img src={team.logo_url} alt={team.team_name} className="h-8 w-8 mr-3" />
                                                                    {team.team_name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium flex items-center'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="flex space-x-4">
                                {socialNavigation.map((item) => (
                                    <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure >

            {/* Sidebar para móvil */}
            <Dialog open={sidebarOpen} onClose={() => setSidebarOpen(false)} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <span className="sr-only">Cerrar barra lateral</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    alt="Exuitesa Basketball Logo"
                                    src="https://ulznkxovycorqeblrjxk.supabase.co/storage/v1/object/public/team-logos/exuitesa-logo.webp?t=2024-09-02T16%3A10%3A44.000Z"
                                    className="h-12 w-auto"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            {item.name === 'Equipos' ? (
                                                <>
                                                    <button
                                                        onClick={toggleTeamsSubmenu}
                                                        className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                                    >
                                                        {item.name}
                                                    </button>
                                                    {showTeamsSubmenu && (
                                                        <div className="mt-2 bg-gray-700 text-white rounded-md shadow-lg w-64">
                                                            <ul>
                                                                {teams.map((team) => (
                                                                    <li key={team.team_id}>
                                                                        <Link
                                                                            to={`/team/${team.team_id}`}
                                                                            className="flex items-center p-3 hover:bg-gray-600 rounded-md text-sm"
                                                                        >
                                                                            <img src={team.logo_url} alt={team.team_name} className="h-8 w-8 mr-3" />
                                                                            {team.team_name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <Link
                                                    to={item.href}
                                                    className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                                >
                                                    {item.name}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
