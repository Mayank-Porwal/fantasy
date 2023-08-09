export const getDropdownCss = (colors: any) => {
    return {
        root: {
          '& .MuiOutlinedInput-input': {
            color: `${colors.primary[100]}`
          },
          '& .MuiInputLabel-root': {
            color: `${colors.primary[100]}`
          },
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            color: `${colors.primary[100]}`
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
            color: `${colors.primary[100]}`
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: `${colors.primary[100]}`
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: `${colors.greenAccent[500]}`,
          },
        },
      }
}