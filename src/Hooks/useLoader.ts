import { useCallback, useRef } from 'react'


const useLoader = (fetchNextPage: () => void, dependencies:{ hasNextPage: boolean; status: string } ) => {

  const observer = useRef<IntersectionObserver | null>(null)
  
  const loaderRef = useCallback(
    (node: any) => {
      if (dependencies.status === 'loading') return
      if (observer.current) observer.current?.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && dependencies.hasNextPage) {
          fetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [dependencies.hasNextPage, dependencies.status, fetchNextPage],
  )
  
  return loaderRef
  
}

export default useLoader
