export const sidebarLinks = [
    {
        imgURL: '/icons/DashBoardicon.svg',
        route: '/dashboard',
        label: 'Dashboard',
        role: ['Owner'],
    },
    {
        imgURL: '/icons/Ordericon.svg',
        route: '/order',
        label: 'Order',
        role: ['Owner', 'Cashier'],
    },
    {
        imgURL: '/icons/Producticon.svg',
        route: '/product',
        label: 'Product',
        role: ['Owner', 'Admin'],
    },
    {
        imgURL: '/icons/Categoryicon.svg',
        route: '/category',
        label: 'Product Category',
        role: ['Owner', 'Admin'],
    },
    {
        imgURL: '/icons/Transactionicon.svg',
        route: '/transaction',
        label: 'Transaction',
        role: ['Owner', 'Cashier'],
    },
    {
        imgURL: '/icons/Taxicon.svg',
        route: '/tax',
        label: 'Tax',
        role: ['Owner'],
    },
]

export const secondaryLinks = [
    {
        imgURL: '/icons/Usericon.svg',
        route: '/user',
        label: 'User',
        role: ['Owner'],
    },
    {
        imgURL: '/icons/Profileicon.svg',
        route: '/business',
        label: 'Business Profile',
        role: ['Owner'],
    },
]

export const roleArray = [
    'Owner',
    'Cashier',
    'Admin'
]