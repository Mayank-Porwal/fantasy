export const getPopupWidth = (size: string) => {
    let width = '100%'
    switch(size) {
        case 'md':
        width = "50%";
        break;
        case 'sm': 
        width = "25%";
        break;
        default: width = width;
    }
    return width;
}