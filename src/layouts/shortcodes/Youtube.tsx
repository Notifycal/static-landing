import { useEffect } from 'react';

interface YoutubeProps {
  id: string;
  title: string;
  [key: string]: unknown;
}

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': {
        class?: string;
        videoid: string;
        videotitle: string;
        [key: string]: unknown;
      };
    }
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
const Youtube = ({ id, title, ...rest }: YoutubeProps) => {
  useEffect(() => {
    void import('@justinribeiro/lite-youtube');
  }, []);

  return <lite-youtube class="rounded-md" videoid={id} videotitle={title} {...rest} />;
};

export default Youtube;
