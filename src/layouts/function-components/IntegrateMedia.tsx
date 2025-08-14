import { humanize } from '@/lib/utils/textConverter';
import { marked } from 'marked';
import { useState, type JSX } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

import type { CollectionEntry } from 'astro:content';

interface IntegrateMediaProps {
  integrations: Array<CollectionEntry<'integrations'>>;
  categories: Array<string>;
}

const IntegrateMedia = ({ integrations, categories }: IntegrateMediaProps): JSX.Element => {
  const [tab, setTab] = useState<string>('');
  const filterPost = !tab
    ? integrations
    : integrations.filter((post) => post.data.categories && post.data.categories.includes(tab));
  return (
    <section className="section pt-0">
      <div className="container">
        <div className="row justify-center">
          <div className="lg:col-10">
            <ul className="integration-tab filter-list flex flex-wrap items-center justify-center">
              <li>
                <span
                  className={`filter-btn ${!tab ? 'filter-btn-active' : undefined} btn btn-sm cursor-pointer`}
                  onClick={() => {
                    setTab('');
                  }}
                >
                  All Categories
                </span>
              </li>
              {categories.map((category, index) => (
                <li
                  key={`category-${index}`}
                  onClick={() => {
                    setTab(category);
                  }}
                >
                  <span
                    className={`filter-btn ${
                      tab === category ? 'filter-btn-active' : undefined
                    } btn btn-sm cursor-pointer`}
                  >
                    {humanize(category)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="integration-tab-items row mt-10">
          {filterPost.map((item, index) => (
            <div key={index} className="integration-tab-item mb-8 md:col-6 lg:col-4">
              <div className="rounded-xl bg-white px-10 pt-11 pb-8 shadow-lg">
                <div className="integration-card-head flex items-center space-x-4">
                  <img alt={item.data.metaTitle} src={item.data.image} />
                  <div>
                    <h4 className="h4">{humanize(item.data.name!)}</h4>
                    {item.data.categories?.map((category, index) => (
                      <span key={index} className="font-medium">
                        {humanize(category)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-border my-5 border-y py-5">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: marked.parseInline(item.data.excerpt?.slice(0, 80) || '')
                    }}
                  />
                </div>

                <a
                  className="group text-text-dark hover:text-primary inline-flex items-center font-semibold"
                  href={`/integrations/${item.id}`}
                >
                  View integration
                  <AiOutlineArrowRight className="ml-1.5 text-xl font-bold duration-300 group-hover:ml-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrateMedia;
