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
    translateTargetProps: ({
      isVisible,
    }) => ({
      hidden: !isVisible,
    }),
    translateTriggerProps: ({
      toggleVisibility,
    }) => ({
      onClick: toggleVisibility,
    }),
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
        Click me to reveal content
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

export const Inception = ({
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
        Click me to reveal another visibility
      </button>
    </VisibilityTrigger>

    <VisibilityTarget
      translateProps={
        translateTargetProps
      }
    >
      <div>
        <VisibilityProvider
          {...visibilityProviderProps}
        >
          <VisibilityTrigger
            translateProps={
              translateTriggerProps
            }
          >
            <button>
              Click me to reveal content
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
      </div>
    </VisibilityTarget>
  </VisibilityProvider>
)
