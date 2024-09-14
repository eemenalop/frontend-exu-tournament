/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const matchesTypes = [
    { id: 1, matchType: 'Regular' },
    /*{ id: 2, matchType: 'Semifinal' },
    { id: 3, matchType: 'Final' }*/
]

export default function MatchTypeFilter({setSelectedMatchType }) {
    const [selected, setSelected] = useState(matchesTypes[0])

    const handleChange = (value) => {
        setSelected(value);
        setSelectedMatchType(value.matchType);
    }

    return (
        <Listbox value={selected} onChange={handleChange}>
            <div className="relative inline-block text-left">
                <ListboxButton className="relative w-32 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 sm:text-sm sm:leading-6">
                    <span className="block truncate">{selected.matchType}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {matchesTypes.map((match) => (
                        <ListboxOption
                            key={match.id}
                            value={match}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-red-700 data-[focus]:text-white"
                        >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">{match.matchType}</span>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
