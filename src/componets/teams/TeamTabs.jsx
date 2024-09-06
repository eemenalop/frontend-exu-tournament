import { BuildingOfficeIcon, UserIcon, UsersIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import TeamRoster from './TeamRoster'

const tabs = [
  { name: 'Roster', key: 'roster', icon: UserIcon, current: true },
  { name: 'Estadísticas', key: 'estadisticas', icon: BuildingOfficeIcon, current: false },
  { name: 'Calendario', key: 'calendario', icon: UsersIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// eslint-disable-next-line react/prop-types
export default function TeamTabs({ teamId }) {
  const [selectedTab, setSelectedTab] = useState('roster');

  return (
    <div className='m-10'>
      <div className="bg-zinc-50">
        <div className="border-b border-gray-200">
          <nav
            aria-label="Tabs"
            className="-mb-px flex justify-center space-x-4 sm:space-x-8 flex-wrap"
          > {/* Ajuste flex-wrap para que las pestañas no se salgan en pantallas pequeñas */}
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={classNames(
                  selectedTab === tab.key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-4 py-3 text-xs sm:text-sm font-medium flex-1 sm:flex-grow-0 min-w-[150px]', // Ajuste para que todas tengan el mismo tamaño
                )}
              >
                <tab.icon
                  aria-hidden="true"
                  className={classNames(
                    selectedTab === tab.key
                      ? 'text-indigo-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-4 w-4 sm:h-5 sm:w-5',
                  )}
                />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mt-6">
        {selectedTab === 'roster' && <TeamRoster teamId={teamId} />}
        {selectedTab === 'estadisticas' && <div className='text-slate-200'>Estadísticas</div>}
        {selectedTab === 'calendario' && <div className='text-slate-200'>Calendario</div>}
      </div>
    </div>
  )
}
