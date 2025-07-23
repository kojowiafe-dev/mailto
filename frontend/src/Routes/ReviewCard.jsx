import React from 'react';
import { cn } from '@/lib/utils';
import { Marquee } from '@/components/magicui/marquee';

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Jill',
    username: '@jill',
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'John',
    username: '@john',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/john',
  },
  {
    name: 'Jane',
    username: '@jane',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/jane',
  },
  {
    name: 'Jenny',
    username: '@jenny',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/jenny',
  },
  {
    name: 'James',
    username: '@james',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/james',
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = React.memo(({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        'relative h-full w-64 min-w-[14rem] cursor-pointer overflow-hidden rounded-xl border p-3',
        'border-gray-800 bg-gray-900 text-white',
        'hover:bg-gray-800 transition-colors duration-200',
        'shadow-[0_4px_16px_0_rgba(20,20,30,0.7)]'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="24" height="24" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-xs font-medium dark:text-white">{name}</figcaption>
          <p className="text-[10px] font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-1 text-xs">{body}</blockquote>
    </figure>
  );
});

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden overflow-x-hidden bg-black shadow-[0_4px_24px_0_rgba(20,20,30,0.7)] py-4">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-950"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-950"></div>
    </div>
  );
}
