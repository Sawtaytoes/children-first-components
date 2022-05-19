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
  VisibilityTarget,
} from './VisibilityTarget'
import {
  VisibilityTrigger,
} from './VisibilityTrigger'

export default {
  args: {
    onVisibilityChange: (
      action(
        'onVisibilityChange'
      )
    ),
    visibility: (
      Visibilities
      .invisible
    ),
  },
  argTypes: {
    translateTargetProps: {
      table: {
        disable: true,
      },
    },
    translateTriggerProps: {
      table: {
        disable: true,
      },
    },
    visibility: {
      control: {
        type: 'radio',
      },
      options: (
        Object
        .values(
          Visibilities
        )
      ),
    },
  },
  component: VisibilityProvider,
  decorators: htmlStyleDecorators,
  title: 'Visibility',
}

export const Standard = ({
  translateTriggerProps,
  translateTargetProps,
  ...visibilityProviderProps
}) => (
  <VisibilityProvider
    {...visibilityProviderProps}
  >
    <VisibilityTrigger
      translateProps={
        translateTriggerProps
      }
    >
      <button>
        click me!
      </button>
    </VisibilityTrigger>

    <VisibilityTarget
      translateProps={
        translateTargetProps
      }
    >
      <div>
        Revealed Content
      </div>
    </VisibilityTarget>
  </VisibilityProvider>
)

Standard
.args = {
  translateTargetProps: ({
    isVisible,
  }) => ({
    hidden: !isVisible,
  }),
  translateTriggerProps: ({
    onClick,
  }) => ({
    onClick,
  }),
}
