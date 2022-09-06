import { render, renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import usePokemon from '../Hooks/usePokemon';


const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: any) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: any) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

const queryClient = new QueryClient();
const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

it('Testing usePokemon', async () => {

  const { result } = await renderHook(() => usePokemon('https://pokeapi.co/api/v2/pokemon-form/2/'), { wrapper });

  expect(result.current.data).toEqual(undefined);

})