import {
  action,
} from '@storybook/addon-actions'
import {
  expect,
} from '@storybook/jest';
import {
  userEvent,
  waitFor,
  within,
} from '@storybook/testing-library';

import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
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
  isVisible: false,
  onChange: (
    action(
      'onChange'
    )
  ),
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
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          },
        )
      )
      .not
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button'
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region'
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button'
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          },
        )
      )
      .not
      .toBeVisible()
    })
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
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          },
        )
      )
      .not
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: 'Click me to reveal content',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region'
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: 'Click me to reveal the same content',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          },
        )
      )
      .not
      .toBeVisible()
    })
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
    waitFor(() => {
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
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button'
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .getAllByRole(
          'region'
        )
      )
      ?.toHaveLength?.(
        2
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button'
    )
  )

  await (
    waitFor(() => {
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
    })
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
  isHidden = true,
}) => (
  <div
    hidden={isHidden}
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
  isVisible: false,
  onChange: (
    action(
      'onChange'
    )
  ),
  translateTargetProps: ({
    isVisible,
  }) => ({
    isHidden: (
      !isVisible
    ),
  }),
  translateTriggerProps: ({
    toggleVisibility,
  }) => ({
    onSelect: toggleVisibility,
  }),
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
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          }
        )
      )
      .not
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button'
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region'
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button'
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          },
        )
      )
      .not
      .toBeVisible()
    })
  )
}

export const ShowOnHover = () => (
  <VisibilityProvider>
    <VisibilityTrigger
      translateProps={({
        contentId,
        hide,
        show,
        triggerId,
      }) => ({
        'aria-controls': contentId,
        onMouseEnter: show,
        onMouseLeave: hide,
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
.storyName = 'Show on Hover'

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
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          }
        )
      )
      .not
      .toBeVisible()
    })
  )

  userEvent
  .hover(
    canvas
    .queryByRole(
      'button'
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region'
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .unhover(
    canvas
    .queryByRole(
      'button'
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          },
        )
      )
      .not
      .toBeVisible()
    })
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
    waitFor(() => {
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
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: /1/,
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            name: /1/,
          },
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: /2/,
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            name: /1/,
          },
        )
      )
      .toBeVisible()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            name: /2/,
          },
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: /1/,
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .getAllByRole(
          'region',
        )
      )
      ?.toHaveLength?.(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: /2/,
      },
    )
  )

  await (
    waitFor(() => {
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
    })
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
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          },
        )
      )
      .not
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: 'Click me to reveal content',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region'
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: 'Click me to reveal the same content',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          },
        )
      )
      .not
      .toBeVisible()
    })
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
    waitFor(() => {
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
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: /1/,
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            name: /1/,
          },
        )
      )
      .toBeVisible()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .getAllByRole(
          'region',
        )
      )
      ?.toHaveLength?.(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: /2/,
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            name: /2/,
          },
        )
      )
      .toBeVisible()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .getAllByRole(
          'region',
        )
      )
      ?.toHaveLength?.(
        1
      )
    })
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
    waitFor(() => {
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
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: /1/,
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            name: /1/,
          }
        )
      )
      .toBeVisible()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .getAllByRole(
          'region'
        )
      )
      ?.toHaveLength?.(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: /2/,
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content 2',
        )
      )
      .toBeVisible()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .getAllByRole(
          'region',
        )
      )
      ?.toHaveLength?.(
        1
      )
    })
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
    waitFor(() => {
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
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: 'Click me to reveal another visibility',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .getAllByRole(
          'region',
        )
      )
      ?.toHaveLength?.(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: 'Click me to reveal content',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            name: 'Click me to reveal content',
          },
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: 'Click me to reveal another visibility',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content',
        )
      )
      .not
      .toBeVisible()
    })
  )

  await (
    waitFor(() => {
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
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: 'Click me to reveal another visibility',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content',
        )
      )
      .toBeVisible()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .getAllByRole(
          'region',
        )
      )
      ?.toHaveLength?.(
        2
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: 'Click me to reveal content',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content',
        )
      )
      .not
      .toBeVisible()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .getAllByRole(
          'region',
        )
      )
      ?.toHaveLength?.(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
      {
        name: 'Click me to reveal another visibility',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .getAllByRole(
          'button',
        )
      )
      ?.toHaveLength?.(
        1
      )
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content',
        )
      )
      .not
      .toBeVisible()
    })
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

HideContentWithTrigger
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          },
        )
      )
      .not
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'region',
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'region',
          {
            hidden: true,
          },
        )
      )
      .not
      .toBeVisible()
    })
  )
}

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

HideModalComponentWithTrigger
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content',
        )
      )
      .not
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content',
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByText(
      'Revealed content',
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content',
        )
      )
      .not
      .toBeVisible()
    })
  )
}

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

HideOnEscapeKeyImplementation
.storyName = 'Hide on Escape Key'

HideOnEscapeKeyImplementation
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content',
        )
      )
      .not
      .toBeInTheDocument()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'button',
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content',
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .keyboard(
    '[Escape]'
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByText(
          'Revealed content',
        )
      )
      .not
      .toBeInTheDocument()
    })
  )
}
