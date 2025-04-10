const privateUrl='/private/'

export const MenuListado=[
    {
        
        name:'Dashboard',
        subMenu:false,
        url:privateUrl+'home',
        icon:0,
        permiso:[1,2,3],
        submenu:[
            {
                name:'Dashboard',
                subMenu:false,
                url:privateUrl+'home',
                icon:0,
                permiso:[1,2,3],
            }
        ]
        
    },
    {
        name:'Gestión',
        subMenu:true,
        url:privateUrl+'home',
        icon:9,
        permiso:[1,2,3],
        submenu:[
            {
        
                name:'Gestión de Usuarios',
                subMenu:false,
                url:privateUrl+'GestionUsuarios',
                icon:1,
                permiso:[1,2,3]
            },
            {
                
                name:'Gestión de Torres',
                subMenu:false,
                url:privateUrl+'GestionTorres',
                icon:2,
                permiso:[1,3]
            },
            {
                
                name:'Gestión de Apartamentos',
                subMenu:false,
                url:privateUrl+'GestionDepartamentos',
                icon:3,
                permiso:[1,3]
            },
            {
                
                name:'Gestión de Residentes',
                subMenu:false,
                url:privateUrl+'GestionInquilinos',
                icon:4,
                permiso:[1,3]
            },
            {
        
                name:'Parqueaderos',
                subMenu:false,
                url:privateUrl+'GestionParqueaderos',
                icon:6,
                permiso:[1,2,3]
            },
            {
                
                name:'Marca Blanca',
                subMenu:false,
                url:privateUrl+'MarcaBlanca',
                icon:11,
                permiso:[1,3]
            },
            {
                
                name:'Marca Unidad',
                subMenu:false,
                url:privateUrl+'MarcaUnidad',
                icon:11,
                permiso:[1,3]
            },
            {
        
                name:'Gestión de Licencias',
                subMenu:false,
                url:privateUrl+'GestionLicencias',
                icon:1,
                permiso:[1,3]
            },
        ]
    },
    {
        name:'Mi Copropiedad',
        subMenu:true,
        url:privateUrl+'home',
        icon:10,
        permiso:[1,2,3,4],
        submenu:[
            {
        
                name:'Operario',
                subMenu:false,
                url:privateUrl+'Operario',
                icon:7,
                permiso:[1,2,4,3]
                
            },
            {
        
                name:'Torres',
                subMenu:false,
                url:privateUrl+'VGrafica',
                icon:3,
                permiso:[1,2,4,3]
                
            },
            {
                
                name:'Gestión de Vehiculos',
                subMenu:false,
                url:privateUrl+'GestionVehiculos',
                icon:5,
                permiso:[1,2,3]
            },
            {
        
                name:'Informes',
                subMenu:false,
                url:privateUrl+'Informes',
                icon:8,
                permiso:[1,2,3]
                
            },
        ]
    },
    
    
    
    
]