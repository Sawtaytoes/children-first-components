import { Fragment } from 'react'

import GlobalStyles from './GlobalStyles'

export const htmlStyleDecorators = [
  (
    Story,
  ) => (
    <Fragment>
      <GlobalStyles />
      <Story />
    </Fragment>
  ),
]
