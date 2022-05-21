import {
  action,
} from '@storybook/addon-actions'
import {
  expect,
} from '@storybook/jest';
import {
  userEvent,
  within,
} from '@storybook/testing-library';

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
  VisibilityControlProvider,
} from './VisibilityControlProvider'
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
  createVisibilityContextKey,
} from './useSharedVisibilityContext'

export default {
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

Standard
.args = {
  onChange: (
    action(
      'onChange'
    )
  ),
  visibility: (
    Visibilities
    .invisible
  ),
}

Standard
.argTypes = {
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
}

Standard
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    .not
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button'
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region'
      )
    )
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button'
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    .not
    ?.toBeVisible?.()
  )
}

export const MultipleTriggers = () => (
  <VisibilityProvider>
    <div>
      <VisibilityTrigger>
        <button>
          Click me to reveal content
        </button>
      </VisibilityTrigger>
    </div>

    <div>
      <VisibilityTrigger>
        <button>
          Click me to reveal the same content
        </button>
      </VisibilityTrigger>
    </div>

    <VisibilityTarget>
      <HtmlContent>
        <div>
          Revealed content
        </div>
      </HtmlContent>
    </VisibilityTarget>
  </VisibilityProvider>
)

MultipleTriggers
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    .not
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: 'Click me to reveal content',
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region'
      )
    )
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: 'Click me to reveal the same content',
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    .not
    ?.toBeVisible?.()
  )
}

export const MultipleTargets = () => (
  <VisibilityProvider>
    <VisibilityTarget>
      <HtmlContent>
        <div>
          Revealed content 1
        </div>
      </HtmlContent>
    </VisibilityTarget>

    <div>
      <VisibilityTrigger>
        <button>
          Click me to reveal content
        </button>
      </VisibilityTrigger>
    </div>

    <VisibilityTarget>
      <HtmlContent>
        <div>
          Revealed content 2
        </div>
      </HtmlContent>
    </VisibilityTarget>
  </VisibilityProvider>
)

MultipleTargets
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    ?.toHaveLength?.(
      2
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button'
      )
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region'
      )
    )
    ?.toHaveLength?.(
      2
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button'
      )
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    ?.toHaveLength?.(
      2
    )
  )
}

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
  <div
    hidden={isInvisible}
    role="region"
  >
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
  onChange: (
    action(
      'onChange'
    )
  ),
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
  visibility: (
    Visibilities
    .invisible
  ),
}

APIIncompliantComponents
.argTypes = {
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
}

APIIncompliantComponents
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          hidden: true,
        }
      )
    )
    .not
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button'
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region'
      )
    )
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button'
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    .not
    ?.toBeVisible?.()
  )
}

export const ShowOnHover = () => (
  <VisibilityProvider>
    <VisibilityTrigger
      translateProps={({
        contentId,
        hideVisibility,
        showVisibility,
        triggerId,
      }) => ({
        'aria-controls': contentId,
        onMouseEnter: showVisibility,
        onMouseLeave: hideVisibility,
        id: triggerId,
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

ShowOnHover
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          hidden: true,
        }
      )
    )
    .not
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .hover(
      canvas
      .getByRole(
        'button'
      )
    )
  )

  // Hack because `.hover` takes too long
  await new Promise(resolve => (
    setTimeout(resolve, 300)
  ))

  await (
    expect(
      canvas
      .getByRole(
        'region'
      )
    )
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .unhover(
      canvas
      .getByRole(
        'button'
      )
    )
  )

  // Hack because `.hover` takes too long
  await new Promise(resolve => (
    setTimeout(resolve, 300)
  ))

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    .not
    ?.toBeVisible?.()
  )
}

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

MutuallyExclusive
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    ?.toHaveLength?.(
      2
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: /1/,
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          name: /1/,
        },
      )
    )
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: /2/,
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          name: /1/,
        },
      )
    )
    ?.toBeVisible?.()
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          name: /2/,
        },
      )
    )
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: /1/,
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
      )
    )
    ?.toHaveLength?.(
      1
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: /2/,
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    ?.toHaveLength?.(
      2
    )
  )
}

export const UnifiedProviders = ({
  contextKey,
}) => (
  <div>
    <div>
      <VisibilityProvider
        contextKey={contextKey}
      >
        <VisibilityTrigger>
          <button>
            Click me to reveal content
          </button>
        </VisibilityTrigger>
      </VisibilityProvider>
    </div>

    <div>
      <VisibilityProvider
        contextKey={contextKey}
      >
        <VisibilityTrigger>
          <button>
            Click me to reveal the same content
          </button>
        </VisibilityTrigger>
      </VisibilityProvider>
    </div>

    <div>
      <VisibilityProvider
        contextKey={contextKey}
      >
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
  contextKey: (
    createVisibilityContextKey()
  ),
}

UnifiedProviders
.argTypes = {
  contextKey: {
    table: {
      disable: true,
    },
  },
}

UnifiedProviders
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: 'Click me to reveal content',
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region'
      )
    )
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: 'Click me to reveal the same content',
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    .not
    ?.toBeVisible?.()
  )
}

export const ControlledProviders = () => (
  <VisibilityControlProvider>
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
  </VisibilityControlProvider>
)

ControlledProviders
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    ?.toHaveLength?.(
      2
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: /1/,
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          name: /1/,
        },
      )
    )
    ?.toBeVisible?.()
  )

  expect(
    canvas
    .getAllByRole(
      'region',
    )
  )
  ?.toHaveLength?.(
    1
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: /2/,
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          name: /2/,
        },
      )
    )
    ?.toBeVisible?.()
  )

  expect(
    canvas
    .getAllByRole(
      'region',
    )
  )
  ?.toHaveLength?.(
    1
  )
}

export const SwitchVisibility = ({
  contextKey,
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
                targetContextKey={
                  contextKey
                }
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
      contextKey={contextKey}
    >
      <VisibilityTrigger>
        <VisibilityTarget>
          <HtmlContent>
            <div>
              Revealed content 2
            </div>
          </HtmlContent>
        </VisibilityTarget>
      </VisibilityTrigger>
    </VisibilityProvider>
  </div>
)

SwitchVisibility
.args = {
  contextKey: (
    createVisibilityContextKey()
  ),
}

SwitchVisibility
.argTypes = {
  contextKey: {
    table: {
      disable: true,
    },
  },
}

SwitchVisibility
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    ?.toHaveLength?.(
      2
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: /1/,
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          name: /1/,
        }
      )
    )
    ?.toBeVisible?.()
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region'
      )
    )
    ?.toHaveLength?.(
      1
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: /2/,
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByText(
        'Revealed content 2',
      )
    )
    ?.toBeVisible?.()
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
      )
    )
    ?.toHaveLength?.(
      1
    )
  )
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

Inception
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    ?.toHaveLength?.(
      2
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: 'Click me to reveal another visibility',
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
      )
    )
    ?.toHaveLength?.(
      1
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: 'Click me to reveal content',
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByRole(
        'region',
        {
          name: 'Click me to reveal content',
        },
      )
    )
    ?.toBeVisible?.()
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: 'Click me to reveal another visibility',
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByText(
        'Revealed content',
      )
    )
    .not
    ?.toBeVisible?.()
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
        {
          hidden: true,
        },
      )
    )
    ?.toHaveLength?.(
      2
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: 'Click me to reveal another visibility',
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByText(
        'Revealed content',
      )
    )
    ?.toBeVisible?.()
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
      )
    )
    ?.toHaveLength?.(
      2
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: 'Click me to reveal content',
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getByText(
        'Revealed content',
      )
    )
    .not
    ?.toBeVisible?.()
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'region',
      )
    )
    ?.toHaveLength?.(
      1
    )
  )

  await (
    userEvent
    .click(
      canvas
      .getByRole(
        'button',
        {
          name: 'Click me to reveal another visibility',
        },
      )
    )
  )

  await (
    expect(
      canvas
      .getAllByRole(
        'button',
      )
    )
    ?.toHaveLength?.(
      1
    )
  )

  await (
    expect(
      canvas
      .getByText(
        'Revealed content',
      )
    )
    .not
    ?.toBeVisible?.()
  )
}

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
