import React, { ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => {
      const flatten = (children: ReactNode): string => {
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) return children.map(flatten).join('');
        if (React.isValidElement(children)) {
          return flatten((children as React.ReactElement<{ children?: ReactNode }>).props.children ?? '');
        }
        return '';
      };
      const id = props.id || flatten(props.children).toLowerCase().replace(/\s+/g, '-');
      return <h1 {...props} id={id} className={"text-4xl font-bold mb-6 mt-8 scroll-mt-28 " + (props.className || "")}/>;
    },
    h2: (props) => {
      const flatten = (children: ReactNode): string => {
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) return children.map(flatten).join('');
        if (React.isValidElement(children)) {
          return flatten((children as React.ReactElement<{ children?: ReactNode }>).props.children ?? '');
        }
        return '';
      };
      const id = props.id || flatten(props.children).toLowerCase().replace(/\s+/g, '-');
      return <h2 {...props} id={id} className={"text-2xl font-semibold mb-4 mt-6 scroll-mt-28 " + (props.className || "")}/>;
    },
    h3: (props) => {
      const flatten = (children: ReactNode): string => {
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) return children.map(flatten).join('');
        if (React.isValidElement(children)) {
          return flatten((children as React.ReactElement<{ children?: ReactNode }>).props.children ?? '');
        }
        return '';
      };
      const id = props.id || flatten(props.children).toLowerCase().replace(/\s+/g, '-');
      return <h3 {...props} id={id} className={"text-xl font-medium mb-2 mt-4 scroll-mt-28 " + (props.className || "")}/>;
    },
    pre: (props) => <pre {...props} className="bg-gray-800 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto font-mono text-sm" />,
    code: (props) => <code {...props} className="bg-gray-900 text-green-300 px-1.5 py-0.5 rounded-md font-mono text-sm" />,
    blockquote: (props) => <blockquote {...props} className="border-l-4 pl-4 italic text-gray-400 my-6" />,
    p: (props) => <p {...props} className="mb-6" />,
    ul: (props) => <ul {...props} className="list-disc ml-6 mb-6" />,
    li: (props) => <li {...props} className="mb-2" />,
    ...components, 
  };
}
