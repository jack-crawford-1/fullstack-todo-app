import React from 'react'

interface Props {
  handleOnSubmit: (value: string) => void
}

const TodoForm: React.FC<Props> = ({ handleOnSubmit }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputValue, setinputValue] = React.useState('')

  console.log('input value', inputValue)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleOnSubmit(inputValue)
        setinputValue('')
      }}
    >
      <input
        type="text"
        className="todos"
        value={inputValue}
        placeholder="Add New Todo Item"
        onChange={(e) => setinputValue(e.target.value)}
      />
    </form>
  )
}

export default TodoForm
