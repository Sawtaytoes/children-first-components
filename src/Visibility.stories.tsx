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
  HideOnEscapeKey,
} from './HideOnEscapeKey'
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
        Revealed content
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
  isInvisible = true,
}) => (
  <div hidden={isInvisible}>
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
        Revealed content
      </Content>
    </VisibilityTarget>
  </VisibilityProvider>
)

APIIncompliantComponents
.args = {
  translateTargetProps: ({
    visibility,
  }) => ({
    isInvisible: (
      visibility
      === (
        Visibilities
        .invisible
      )
    ),
  }),
  translateTriggerProps: ({
    toggleVisibility,
  }) => ({
    onSelect: toggleVisibility,
  }),
}

export const MutuallyExclusive = (
  visibilityProviderProps,
) => (
  <div>
    <div>
      <VisibilityProvider
        {...visibilityProviderProps}
      >
        <VisibilityTrigger>
          <button>
            Click me to reveal content 1
          </button>
        </VisibilityTrigger>

        <VisibilityTarget>
          <div>
            Revealed content 1
          </div>
        </VisibilityTarget>
      </VisibilityProvider>
    </div>

    <div>
      <VisibilityProvider
        {...visibilityProviderProps}
      >
        <VisibilityTrigger>
          <button>
            Click me to reveal content 2
          </button>
        </VisibilityTrigger>

        <VisibilityTarget>
          <div>
            Revealed content 2
          </div>
        </VisibilityTarget>
      </VisibilityProvider>
    </div>
  </div>
)

export const SwitchVisibility = (
  visibilityProviderProps,
) => (
  <div>
    <VisibilityProvider
      {...visibilityProviderProps}
    >
      <VisibilityTrigger>
        <button>
          Click me to reveal content 1
        </button>
      </VisibilityTrigger>

      <VisibilityTarget>
        <div>
          Revealed content 1

          <VisibilityTrigger
            nextVisibilityProvider="visibility-2"
          >
            <button>
              Click me to reveal content 2
            </button>
          </VisibilityTrigger>
        </div>
      </VisibilityTarget>
    </VisibilityProvider>

    <VisibilityProvider
      name="visibility-2"
      {...visibilityProviderProps}
    >
      <VisibilityTarget>
        <div>
          Revealed content 2
        </div>
      </VisibilityTarget>
    </VisibilityProvider>
  </div>
)

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
              Revealed content
            </div>
          </VisibilityTarget>
        </VisibilityProvider>
      </div>
    </VisibilityTarget>
  </VisibilityProvider>
)

export const HideContentWithTrigger = (
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

    <VisibilityTrigger>
      <VisibilityTarget>
        <div>
          <div className="overlay">
            <div className="content">
              Revealed content
            </div>
          </div>
        </div>
      </VisibilityTarget>
    </VisibilityTrigger>
  </VisibilityProvider>
)

const ModalContent = ({
  children,
  isVisible,
  onClick,
}) => (
  <div
    hidden={!isVisible}
    onClick={onClick}
  >
    <div className="overlay">
      <div className="content">
        {children}
      </div>
    </div>
  </div>
)

export const HideModalComponentWithTrigger = (
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

    <VisibilityTrigger>
      <VisibilityTarget>
        <ModalContent>
          Revealed content
        </ModalContent>
      </VisibilityTarget>
    </VisibilityTrigger>
  </VisibilityProvider>
)

export const HideOnEscapeKeyImplementation = (
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

    <HideOnEscapeKey />

    <VisibilityTarget>
      <VisibilityContent>
        <div className="overlay">
          <div className="content">
            Revealed content
          </div>
        </div>
      </VisibilityContent>
    </VisibilityTarget>
  </VisibilityProvider>
)
