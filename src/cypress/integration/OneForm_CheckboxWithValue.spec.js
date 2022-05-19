describe(
  'OneForm CheckboxWithValue',
  () => {
    const storybookPath = 'forms-oneform--checkbox-with-value'

    it(
      'Has no initial value.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByText(
          'The Checkbox Value'
        )
        .should(
          'not.exist',
        )
      },
    )

    it(
      'Sets value when checked.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByLabelText(
          'Checkbox with Value'
        )
        .click()
        .should(
          'be.checked',
        )

        cy
        .findByText(
          'The Checkbox Value'
        )
        .should(
          'exist',
        )

        cy
        .findByLabelText(
          'Checkbox with Value'
        )
        .click()
        .should(
          'not.be.checked',
        )

        cy
        .findByText(
          'The Checkbox Value'
        )
        .should(
          'not.exist',
        )
      },
    )
  }
)
