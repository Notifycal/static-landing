declare module 'unplugin-fonts/astro/component.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server';

  // Este componente no recibe props
  const Component: AstroComponentFactory;
  export default Component;
}
