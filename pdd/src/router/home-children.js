import Hot from '../pages/home/Childrens/Hot'
import Clothes from '../pages/home/Childrens/Clothes'
import Baby from '../pages/home/Childrens/Baby'
import Female from '../pages/home/Childrens/Female'
import Foods from '../pages/home/Childrens/Foods'
import Male from '../pages/home/Childrens/Male'
import Shoes from '../pages/home/Childrens/Shoes'
import Shop from '../pages/home/Childrens/Shop'
import Underwear from '../pages/home/Childrens/Underwear'

export default [
    { path: 'hot', component: Hot, meta: {showTabBar: true} },
    { path: 'clothes', component: Clothes },
    { path: 'baby', component: Baby },
    { path: 'female', component: Female },
    { path: 'foods', component: Foods },
    { path: 'male', component: Male },
    { path: 'shoes', component: Shoes },
    { path: 'shop', component: Shop },
    { path: 'underwear', component: Underwear }
]