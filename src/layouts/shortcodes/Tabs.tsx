import { marked } from 'marked';
import { useEffect, useRef, useState, type JSX, type KeyboardEvent } from 'react';

interface TabsProps {
  children: {
    props: {
      value: string;
    };
  };
}

interface TabLink {
  name: string;
  children: string;
}

const Tabs = ({ children }: TabsProps): JSX.Element => {
  const [active, setActive] = useState<number>(0);
  const [defaultFocus, setDefaultFocus] = useState<boolean>(false);

  const tabRefs = useRef<Array<HTMLLIElement | null>>([]);
  useEffect(() => {
    if (defaultFocus) {
      tabRefs.current[active]?.focus();
    } else {
      setDefaultFocus(true);
    }
  }, [active]);

  const tabLinks: Array<TabLink> = Array.from(
    children.props.value.matchAll(/<div\s+data-name="([^"]+)"[^>]*>(.*?)<\/div>/gs),
    (match) => ({ name: match[1], children: match[0] })
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>, index: number): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActive(index);
    } else if (event.key === 'ArrowRight') {
      setActive((active + 1) % tabLinks.length);
    } else if (event.key === 'ArrowLeft') {
      setActive((active - 1 + tabLinks.length) % tabLinks.length);
    }
  };

  return (
    <div className="tab">
      <ul className="tab-nav my-0 list-none">
        {tabLinks.map((item, index) => (
          <li
            key={index}
            ref={(ref) => {
              tabRefs.current[index] = ref;
            }}
            className={`tab-nav-item ${index === active && 'active'}`}
            role="tab"
            tabIndex={index === active ? 0 : -1}
            onClick={() => {
              setActive(index);
            }}
            onKeyDown={(event) => {
              handleKeyDown(event, index);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
      {tabLinks.map((item, index) => (
        <div
          key={index}
          dangerouslySetInnerHTML={{
            __html: marked.parse(item.children)
          }}
          className={active === index ? 'tab-content block px-5' : 'hidden'}
        />
      ))}
    </div>
  );
};

export default Tabs;
