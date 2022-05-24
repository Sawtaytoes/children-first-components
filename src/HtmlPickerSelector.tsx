import {
  memo,
} from 'react'

import {
  PickerSelector,
  PickerSelectorProps,
} from './PickerSelector'

const translateToHtmlProps: (
  PickerSelectorProps['translateProps']
) = ({
  isSelected,
  ...otherProps
}) => ({
  ...otherProps,
  'data-selected': isSelected,
})

const HtmlPickerSelector = (
  pickerSelectorProps: PickerSelectorProps
) => (
  <PickerSelector
    {...pickerSelectorProps}
    translateProps={translateToHtmlProps}
  />
)

const MemoizedHtmlPickerSelector = (
  memo(
    HtmlPickerSelector
  )
)

export {
  MemoizedHtmlPickerSelector as HtmlPickerSelector
}
