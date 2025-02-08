import React from 'react'

const ListofAgentsListed = ({ item }) => {
    return (
        <div className=' w-[70%] flex items-center flex-col justify-center'>
            <li
                key={item._id}
                className="bg-gray-100 p-3 rounded-lg shadow-md flex justify-between cursor-pointer items-center  w-full"
            >
                <span className="font-medium text-gray-800">{item.firstname}</span>
                <span className="text-gray-600">{item.phone}</span>
                <span className="text-gray-600">{item.notes}</span>
            </li>
        </div>
    )
}

export default ListofAgentsListed
