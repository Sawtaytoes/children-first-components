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
  HtmlContent,
} from './HtmlContent'
import {
  VisibilityProvider,
} from './VisibilityProvider'
import {
  VisibilityTarget,
} from './VisibilityTarget'
import {
  VisibilityTrigger,
} from './VisibilityTrigger'
import {
  createVisibilityId,
} from './useVisibility'

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
      <HtmlContent>
        <div>
          Revealed content
        </div>
      </HtmlContent>
    </VisibilityTarget>
  </VisibilityProvider>
)

export const MultipleTriggers = () => (
  <VisibilityProvider>
    <VisibilityTrigger>
      <button>
        Click me to reveal content
      </button>
    </VisibilityTrigger>

    <VisibilityTrigger>
      <button>
        Click me to reveal the same content
      </button>
    </VisibilityTrigger>

    <VisibilityTarget>
      <HtmlContent>
        <div>
          Revealed content
        </div>
      </HtmlContent>
    </VisibilityTarget>
  </VisibilityProvider>
)

export const MultipleTargets = () => (
  <VisibilityProvider>
    <VisibilityTarget>
      <HtmlContent>
        <div>
          Revealed content 1
        </div>
      </HtmlContent>
    </VisibilityTarget>

    <VisibilityTrigger>
      <button>
        Click me to reveal content
      </button>
    </VisibilityTrigger>

    <VisibilityTarget>
      <HtmlContent>
        <div>
          Revealed content 2
        </div>
      </HtmlContent>
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

export const ShowOnHover = () => (
  <VisibilityProvider>
    <VisibilityTrigger
      translateProps={({
        showVisibility,
        hideVisibility,
      }) => ({
        onMouseEnter: showVisibility,
        onMouseLeave: hideVisibility,
      })}
    >
      <button>
        Click me to reveal content
      </button>
    </VisibilityTrigger>

    <VisibilityTarget>
      <HtmlContent>
        <div>
          Revealed content
        </div>
      </HtmlContent>
    </VisibilityTarget>
  </VisibilityProvider>
)

export const MutuallyExclusive = () => (
  <div>
    <div>
      <VisibilityProvider>
        <VisibilityTrigger>
          <button>
            Click me to reveal content 1
          </button>
        </VisibilityTrigger>

        <VisibilityTarget>
          <HtmlContent>
            <div>
              Revealed content 1
            </div>
          </HtmlContent>
        </VisibilityTarget>
      </VisibilityProvider>
    </div>

    <div>
      <VisibilityProvider>
        <VisibilityTrigger>
          <button>
            Click me to reveal content 2
          </button>
        </VisibilityTrigger>

        <VisibilityTarget>
          <HtmlContent>
            <div>
              Revealed content 2
            </div>
          </HtmlContent>
        </VisibilityTarget>
      </VisibilityProvider>
    </div>
  </div>
)

export const UnifiedProviders = ({
  id,
}) => (
  <div>
    <div>
      <VisibilityProvider id={id}>
        <VisibilityTrigger>
          <button>
            Click me to reveal content
          </button>
        </VisibilityTrigger>
      </VisibilityProvider>
    </div>

    <div>
      <VisibilityProvider id={id}>
        <VisibilityTrigger>
          <button>
            Click me to reveal the same content
          </button>
        </VisibilityTrigger>
      </VisibilityProvider>
    </div>

    <div>
      <VisibilityProvider id={id}>
        <VisibilityTarget>
          <HtmlContent>
            <div>
              Revealed content
            </div>
          </HtmlContent>
        </VisibilityTarget>
      </VisibilityProvider>
    </div>
  </div>
)

UnifiedProviders
.args = {
  id: (
    createVisibilityId()
  ),
}

export const SwitchVisibility = ({
  id,
}) => (
  <div>
    <VisibilityProvider>
      <VisibilityTrigger>
        <button>
          Click me to reveal content 1
        </button>
      </VisibilityTrigger>

      <VisibilityTarget>
        <HtmlContent>
          <div>
            <div>
              Revealed content 1
            </div>

            <div>
              <VisibilityTrigger
                targetVisibilityId={id}
              >
                <button>
                  Click me to reveal content 2
                </button>
              </VisibilityTrigger>
            </div>
          </div>
        </HtmlContent>
      </VisibilityTarget>
    </VisibilityProvider>

    <VisibilityProvider
      id={id}
    >
      <VisibilityTarget>
        <HtmlContent>
          <div>
            Revealed content 2
          </div>
        </HtmlContent>
      </VisibilityTarget>
    </VisibilityProvider>
  </div>
)

SwitchVisibility
.args = {
  id: (
    createVisibilityId()
  ),
}

export const Inception = () => (
  <VisibilityProvider>
    <VisibilityTrigger>
      <button>
        Click me to reveal another visibility
      </button>
    </VisibilityTrigger>

    <VisibilityTarget>
      <HtmlContent>
        <div>
          <VisibilityProvider>
            <VisibilityTrigger>
              <button>
                Click me to reveal content
              </button>
            </VisibilityTrigger>

            <VisibilityTarget>
              <HtmlContent>
                <div>
                  Revealed content
                </div>
              </HtmlContent>
            </VisibilityTarget>
          </VisibilityProvider>
        </div>
      </HtmlContent>
    </VisibilityTarget>
  </VisibilityProvider>
)

export const HideContentWithTrigger = () => (
  <VisibilityProvider>
    <VisibilityTrigger>
      <button>
        Click me to reveal content
      </button>
    </VisibilityTrigger>

    <VisibilityTrigger>
      <VisibilityTarget>
        <HtmlContent>
          <div>
            <div className="overlay">
              <div className="content">
                Revealed content
              </div>
            </div>
          </div>
        </HtmlContent>
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

export const HideModalComponentWithTrigger = () => (
  <VisibilityProvider>
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

export const HideOnEscapeKeyImplementation = () => (
  <VisibilityProvider>
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
