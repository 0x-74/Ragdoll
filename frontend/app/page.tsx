'use client';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { DataCard, DataCardProps } from './components/card';
const Home: React.FC = () => {
  const [data, setData] = useState<DataCardProps[]>([]); 

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/final.csv');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();

        Papa.parse<DataCardProps>(text, {
          header: true,
          complete: (results) => {
            setData(results.data); 
          },
          error: (error: Error) => {
            console.error("Error parsing CSV:", error);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };

    fetchCSV();
  }, []);

  return (
    <div>
      <h3>Data Cards</h3>
      <div className="flex flex-wrap justify-around">
        {data.map((item, index) => (
          <DataCard
            key={index}
            title={item.title}
            description={item.description}
            is_video_or_blog_or_course={item.is_video_or_blog_or_course}
            programming_languages={item.programming_languages}
            framework_used={item.framework_used}
            tags={item.tags}
            url={item.url} index={0}          />
        ))}
      </div>
    </div>
  );
};

export default Home;
