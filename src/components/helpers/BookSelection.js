const selectionName = 'current-book-selection'

export const setSelection = (selection) => {
  localStorage.setItem(selectionName, JSON.stringify(selection))
}

export const getSelection = (selection) => {
  return JSON.parse(localStorage.getItem(selectionName))
}

export const removeSelection = (selection) => {
  localStorage.removeItem(selectionName)
}