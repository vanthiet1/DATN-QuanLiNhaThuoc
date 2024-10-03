import React from 'react';
import { Button } from '../../components/ui/button';
function BrandCard({ brand }) {
  const { _id, name, origin_country, country_made, createdAt, updatedAt } = brand;

  return (
                      <tr key={_id} className='hover:bg-gray-100'>
                    <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>{name}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>{origin_country}</td>
                    <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>{country_made}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm flex '>
                      <Button
                        size='m'
                        rounded='m'
                        addClassNames='bg-blue-600 text-white hover:bg-blue-500 px-3 py-1 rounded-md'
                        onClick={() => handleEdit(_id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='m'
                        rounded='m'
                        addClassNames='bg-red-600 text-white hover:bg-red-500 px-3 py-1 rounded-md ml-2'
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                
        
  );
}

export default BrandCard;

