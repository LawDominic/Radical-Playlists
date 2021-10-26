import { React } from 'react'

function SearchBar() {
    return (
        <div className="hidden md:flex md:items-center space-x-8">
                <input className="p-0"
                    type="text"
                    placeholder="Search Playlists"
                />
            <button className="text-white font-semibold hover:text-green-500 transition duration-300 " type="submit">Search</button>
        </div>
    )
}

export default SearchBar