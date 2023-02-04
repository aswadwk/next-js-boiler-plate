import { useState } from 'react'

function useInput (defaultValue = ''): any {
  const [value, setValue] = useState(defaultValue)

  function handleValueChange ({ target }: any): any {
    setValue(target.value)
  }

  return [value, handleValueChange, setValue]
}

export default useInput
