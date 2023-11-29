export const getGridActions = (
  handleAction: Function,
): {
  id: string
  label: string
  onClick: Function
  disabled?: boolean
  buttonType?: 'text' | 'outlined' | 'contained' | undefined
  className?: string
  width?: string
}[] => {
  return [
    {
      id: 'delete',
      label: 'Delete',
      onClick: () => handleAction('delete'),
      buttonType: 'contained',
    },
  ]
}
