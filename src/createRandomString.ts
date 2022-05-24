export const createRandomString = (
  {
    generateRandomNumber = (
      Math
      .random
    ),
  } = {}
) => (
  generateRandomNumber()
  .toString(
    36
  )
  .slice(
    -8
  )
)
