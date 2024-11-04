import React from 'react';
import { Card } from 'antd';
import { BookOpenIcon, PlayCircleIcon, QuestionMarkCircleIcon, TvIcon } from '@heroicons/react/16/solid';

export interface DataCardProps {
  title: string;
  description: string;
  is_video_or_blog_or_course: string;
  url: string;
  index: number;
  programming_languages?: string;
  framework_used?: string;
  tags?: string;
}

const categorizeContent = (contentType: string) => {
  const lowerCaseType = String(contentType).toLowerCase(); // Convert to lowercase
  if (lowerCaseType === 'webinar') {
    return 'Video';
  } else if (['blog', 'guide', 'documentation', 'website', 'other', 'resource', 'webpage', 'tutorial'].includes(lowerCaseType)) {
    return 'Blog';
  } else if (['book', 'course', 'tool', 'plugin', 'document', 'web-based tool', 'challenge', 'framework', 'project', 'resource page', 'dataset', 'notebook', 'wiki', 'catalog'].includes(lowerCaseType)) {
    return 'Course';
  }
  return null;
};

const logo = (contentType: string) => {
  const category = categorizeContent(contentType);
  switch (category) {
    case 'Video':
      return <PlayCircleIcon className='w-6 h-6 mr-2' />;
    case 'Blog':
      return <BookOpenIcon className='w-6 h-6 mr-2' />;
    case 'Course':
      return <TvIcon className='w-6 h-6 mr-2' />;
    default:
      return <QuestionMarkCircleIcon className='w-6 h-6 mr-2' />;
  }
};

export const DataCard: React.FC<DataCardProps> = ({
  title,
  description,
  is_video_or_blog_or_course,
  url
}) => (
  <div className="relative w-72 h-48 mb-8"> {/* Set fixed height for the card */}
    <button
      className="bg-indigo-300 flex text-white absolute top-2 left-2 px-2 pt-1 rounded-md"
      style={{ backgroundColor: '#e9f0fd', color: '#216cd4' }}
    >
      <span className='font-bold'>{is_video_or_blog_or_course}</span>
    </button>
    <Card bordered={false} style={{ width: '100%', height: '100%' }}>
      <div className="flex items-center">
        {logo(is_video_or_blog_or_course)}
        <a href={url} className="text-lg font-semibold">
          <h1>{title}</h1>
        </a>
      </div>
      <p className="mt-2">{description}</p>
    </Card>
  </div>
);

export default DataCard;
