import {
  Children,
  cloneElement,
  JSXElementConstructor,
  ReactElement,
  useMemo,
} from 'react'

export const useClonedChild = (
  child: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
  childProps: object,
) => {
  const memoizedChildProps = (
    useMemo(
      () => (
        childProps
      ),
      (
        Object
        .values(
          childProps
        )
      ),
    )
  )

  const clonedChild = (
    useMemo(
      () => (
        cloneElement(
          (
            Children
            .only(
              child
            )
          ),
          memoizedChildProps,
        )
      ),
      [
        child,
        memoizedChildProps,
      ],
    )
  )

  return clonedChild
}
