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
  VisibilityContent,
} from './VisibilityContent'
import {
  VisibilityInteractionHiding,
} from './VisibilityInteractionHiding'
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

export const Standard = (
  visibilityProviderProps,
) => (
  <VisibilityProvider
    {...visibilityProviderProps}
  >
    <VisibilityTrigger>
      <button>
        Click me to reveal content
      </button>
    </VisibilityTrigger>

    <VisibilityTarget>
      <div>
        Revealed Content
      </div>
    </VisibilityTarget>
  </VisibilityProvider>
)

const Button = ({
  children,
  onSelect = () => {},
}) => (
  <button onClick={onSelect}>
    {children}
  </button>
)

const Content = ({
  children,
  isVisible = false,
}) => (
  <div hidden={!isVisible}>
    {children}
  </div>
)

export const APIIncompliantComponents = ({
  translateTargetProps,
  translateTriggerProps,
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
      <Button>
        Click me to reveal content
      </Button>
    </VisibilityTrigger>

    <VisibilityTarget
      translateProps={
        translateTargetProps
      }
    >
      <Content>
        Revealed Content
      </Content>
    </VisibilityTarget>
  </VisibilityProvider>
)

APIIncompliantComponents
.args = {
  translateTargetProps: ({
    visibility,
  }) => ({
    isVisible: (
      visibility
      === (
        Visibilities
        .visible
      )
    ),
  }),
  translateTriggerProps: ({
    toggleVisibility,
  }) => ({
    onSelect: toggleVisibility,
  }),
}

export const Inception = (
  visibilityProviderProps,
) => (
  <VisibilityProvider
    {...visibilityProviderProps}
  >
    <VisibilityTrigger>
      <button>
        Click me to reveal another visibility
      </button>
    </VisibilityTrigger>

    <VisibilityTarget>
      <div>
        <VisibilityProvider
          {...visibilityProviderProps}
        >
          <VisibilityTrigger>
            <button>
              Click me to reveal content
            </button>
          </VisibilityTrigger>

          <VisibilityTarget>
            <div>
              Revealed Content
            </div>
          </VisibilityTarget>
        </VisibilityProvider>
      </div>
    </VisibilityTarget>
  </VisibilityProvider>
)

export const HideOnClick = (
  visibilityProviderProps,
) => (
  <VisibilityProvider
    {...visibilityProviderProps}
  >
    <VisibilityTrigger>
      <button>
        Click me to reveal content
      </button>
    </VisibilityTrigger>

    <VisibilityTarget>
      <VisibilityContent>
        <VisibilityInteractionHiding>
          <div className="overlay">
            <div className="content">
              Revealed Content
            </div>
          </div>
        </VisibilityInteractionHiding>
      </VisibilityContent>
    </VisibilityTarget>
  </VisibilityProvider>
)
