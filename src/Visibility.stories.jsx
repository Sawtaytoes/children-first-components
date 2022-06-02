import {
  action,
} from '@storybook/addon-actions'
import {
  expect,
} from '@storybook/jest'
import {
  userEvent,
  waitFor,
  within,
} from '@storybook/testing-library'

import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  HideOnEscapeKey,
} from './HideOnEscapeKey'
import {
  HtmlContent,
} from './HtmlContent'
import {
  createVisibilityContextKey,
} from './useSharedVisibilityContext'
import {
  VisibilityConsumer,
} from './VisibilityConsumer'
import {
  VisibilityContent,
} from './VisibilityContent'
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

export const APIIncompliantComponents = ({
  translateTargetProps,
  translateTriggerProps,
  ...visibilityProviderProps
}) => (
  <VisibilityProvider
    {...visibilityProviderProps}
  >
    <VisibilityConsumer
      translateProps={({
        toggle,
      }) => ({
        onSelect: toggle,
      })}
    >
      <Button>
        Click me to reveal content
      </Button>
    </VisibilityConsumer>

    <VisibilityConsumer
      translateProps={({
        isVisible,
      }) => ({
        isHidden: (
          !isVisible
        ),
      })}
    >
      <Content>
        Revealed content
      </Content>
    </VisibilityConsumer>
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

const ModalContent = ({
  'aria-labelledby': ariaLabelledBy,
  children,
  id,
  isVisible,
  onClick,
}) => (
  <div
    aria-labelledby={ariaLabelledBy}
    hidden={!isVisible}
    id={id}
    onClick={onClick}
    role="dialog"
  >
    <div className="modalOverlay">
      <div className="modalContent">
        {children}
      </div>
    </div>
  </div>
)

export const TargetWithTrigger = () => (
  <VisibilityProvider>
    <VisibilityTrigger>
      <button>
        Click me to reveal content
      </button>
    </VisibilityTrigger>

    <VisibilityTrigger>
      <VisibilityTarget>
        <ModalContent>
          Click me to hide content
        </ModalContent>
      </VisibilityTarget>
    </VisibilityTrigger>
  </VisibilityProvider>
)

TargetWithTrigger
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
          'dialog',
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
          'dialog'
        )
      )
      .toBeVisible()
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'dialog'
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'dialog',
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

export const TargetWithTarget = () => (
  <VisibilityProvider>
    <VisibilityTrigger>
      <button>
        Click me to reveal content
      </button>
    </VisibilityTrigger>

      <VisibilityTarget>
        <VisibilityContent>
          <VisibilityTrigger>
            <VisibilityTarget>
              <HtmlContent>
                <div className="overlay">
                  <div modalOlassName="modalContent">
                    Revealed content
                  </div>
                </div>
              </HtmlContent>
            </VisibilityTarget>
          </VisibilityTrigger>
        </VisibilityContent>
      </VisibilityTarget>
  </VisibilityProvider>
)

TargetWithTarget
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
      .toBeInTheDocument()
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

export const SyncedProviders = ({
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

SyncedProviders
.args = {
  contextKey: (
    createVisibilityContextKey()
  ),
}

SyncedProviders
.argTypes = {
  contextKey: {
    table: {
      disable: true,
    },
  },
}

SyncedProviders
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

export const ControlledProviders = ({
  onChange,
}) => (
  <VisibilityControlProvider
    onChange={onChange}
  >
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
.args = {
  onChange: (
    action(
      'control'
    )
  ),
}

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

export const ShowOnHover = () => (
  <VisibilityProvider>
    <VisibilityConsumer
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
    </VisibilityConsumer>

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
                linkedContextKey={
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
        <VisibilityTarget>
          <HtmlContent>
            <div className="overlay">
              <div modalOlassName="modalContent">
                Revealed content
              </div>
            </div>
          </HtmlContent>
        </VisibilityTarget>
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
