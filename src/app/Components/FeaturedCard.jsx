import { Button } from '@heroui/react';
import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Feature from './Feature';

const FeaturedCard = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
  const features = await res.json();
//   return data || [] ;
  console.log(features);

    return (
         <div className="max-w-7xl mx-auto px-4 py-10">
              <div className='flex items-center justify-between'>
                <div>
                    <h1 className="text-4xl font-semibold text-black mb-3">All Study Rooms</h1>
              <p className="text-muted mb-6">
                Browse the full catalog. Filter by amenity, price, or search by name.</p>
                </div>

                <div>
                    <Link href={'/rooms'}>
                        <Button variant='outline' className='border-2 border-gray-300'>  View All Rooms 
                            <FaLongArrowAltRight />
                        </Button>
                    </Link>
                </div>

              </div>

        
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((room,index) => (
            <Feature key={index} room={room} />
          ))}
        </div>
        
            </div>
          );
        };
   

export default FeaturedCard;






