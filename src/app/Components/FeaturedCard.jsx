import { Button } from '@heroui/react';
import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Feature from './Feature';

const FeaturedCard = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
  const features = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            Handpicked For You
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-2">
            Featured Study{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Rooms
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-md">
            Browse the full catalog. Filter by amenity, price, or search by
            name.
          </p>
        </div>

        <Link href="/rooms">
          <Button
            variant="bordered"
            className="border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full px-6 font-medium transition-colors flex items-center gap-2"
          >
            View All Rooms
            <FaLongArrowAltRight size={14} />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((room, index) => (
          <Feature key={index} room={room} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCard;