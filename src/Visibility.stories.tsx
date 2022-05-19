/* eslint-disable react/prop-types */
import {
  action,
} from '@storybook/addon-actions'

import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  Visibilities,
} from './VisibilityContext'
import {
  VisibilityProvider,
} from './VisibilityProvider'
import {
  VisibilityTrigger,
} from './VisibilityTrigger'

export default {
  decorators: htmlStyleDecorators,
  title: 'Visibility',
}

export const Standard = (
  args,
) => (
  <VisibilityProvider>
    <VisibilityTrigger
      translateProps={
        args
        .translateTriggerProps
      }
    >
      <button>
        click me!
      </button>
    </VisibilityTrigger>
  </VisibilityProvider>
)

Standard
.args = {
  translateTriggerProps: ({
    onClick,
  }) => ({
    onClick,
  })
}
