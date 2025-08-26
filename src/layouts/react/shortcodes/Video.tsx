import type { JSX } from 'react';

interface VideoProps {
  title: string;
  width?: number | string;
  height?: number | string;
  src: string;
  [key: string]: unknown;
}

const Video = ({ title, width = 500, height = 'auto', src, ...rest }: VideoProps): JSX.Element => {
  return (
    <video controls className="overflow-hidden rounded-md" height={height} width={width} {...rest}>
      <source src={src.match(/^http/) ? src : `/videos/${src}`} type="video/mp4" />
      {title}
    </video>
  );
};

export default Video;
